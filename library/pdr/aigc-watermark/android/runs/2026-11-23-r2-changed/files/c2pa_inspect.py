#!/usr/bin/env python3
"""Minimal C2PA reader (stand-in while c2patool is not installed): finds the JUMBF manifest store in a JPEG (APP11)
or ISO BMFF (top-level uuid box), lists every manifest with its signer certificate (openssl), claim generator,
actions, ingredients, checks each assertion's hashed URI and the COSE_Sign1 ES256/384 signature over the claim.
It does NOT check the hard binding (data/bmff hash over the asset) or certificate trust."""
import hashlib, json, struct, subprocess, sys, tempfile, os

def cbor(b, i=0):
    ib = b[i]; mt, ai = ib >> 5, ib & 31; i += 1
    def arg(ai, i):
        if ai < 24: return ai, i
        n = {24: 1, 25: 2, 26: 4, 27: 8}[ai]; return int.from_bytes(b[i:i+n], 'big'), i + n
    if mt == 7:
        if ai == 20: return False, i
        if ai == 21: return True, i
        if ai in (22, 23): return None, i
        if ai == 25: return struct.unpack('>e', b[i:i+2])[0], i + 2
        if ai == 26: return struct.unpack('>f', b[i:i+4])[0], i + 4
        if ai == 27: return struct.unpack('>d', b[i:i+8])[0], i + 8
        return ai, i
    if ai == 31:  # indefinite
        out = [] if mt in (2, 3, 4) else {}
        while b[i] != 0xff:
            if mt == 5:
                k, i = cbor(b, i); v, i = cbor(b, i); out[k] = v
            else:
                v, i = cbor(b, i); out.append(v)
        i += 1
        if mt == 2: out = b''.join(out)
        if mt == 3: out = ''.join(out)
        return out, i
    n, i = arg(ai, i)
    if mt == 0: return n, i
    if mt == 1: return -1 - n, i
    if mt == 2: return bytes(b[i:i+n]), i + n
    if mt == 3: return b[i:i+n].decode('utf8', 'replace'), i + n
    if mt == 4:
        out = []
        for _ in range(n): v, i = cbor(b, i); out.append(v)
        return out, i
    if mt == 5:
        out = {}
        for _ in range(n):
            k, i = cbor(b, i); v, i = cbor(b, i)
            out[k if not isinstance(k, (list, dict)) else str(k)] = v
        return out, i
    if mt == 6:
        v, i = cbor(b, i); return {'_tag': n, 'v': v}, i

def enc_head(mt, n):
    if n < 24: return bytes([mt << 5 | n])
    for ai, size in ((24, 1), (25, 2), (26, 4), (27, 8)):
        if n < 1 << (8 * size): return bytes([mt << 5 | ai]) + n.to_bytes(size, 'big')

def boxes(b, start=0, end=None):
    end = len(b) if end is None else end; i = start
    while i + 8 <= end:
        size = int.from_bytes(b[i:i+4], 'big'); typ = b[i+4:i+8].decode('latin1'); hdr = 8
        if size == 1: size = int.from_bytes(b[i+8:i+16], 'big'); hdr = 16
        if size == 0: size = end - i
        yield typ, i, i + hdr, i + size
        i += size

def parse_jumb(b, s, e):
    """returns dict(label, content: [ (type, bytes) or child dict ], raw=(s,e))"""
    node = {'label': None, 'children': [], 'content': []}
    for typ, bs, cs, be in boxes(b, s, e):
        if typ == 'jumd':
            toggles = b[cs+16]; j = cs + 17
            if toggles & 2:
                z = b.index(0, j); node['label'] = b[j:z].decode(); j = z + 1
        elif typ == 'jumb':
            ch = parse_jumb(b, cs, be); ch['box'] = (bs, be); node['children'].append(ch)
        else:
            node['content'].append((typ, b[cs:be]))
    return node

def find_store(data):
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        stores = []; i = 8
        while i + 8 <= len(data):
            n = int.from_bytes(data[i:i+4], 'big'); t = data[i+4:i+8]
            if t == b'caBX': stores.append(data[i+8:i+8+n])
            i += 12 + n
        return stores
    if data[:2] == b'\xff\xd8':
        parts = {}; i = 2
        while i < len(data) - 4 and data[i] == 0xff:
            m = data[i+1]
            if m in (0xd8, 0x01) or 0xd0 <= m <= 0xd7: i += 2; continue
            if m == 0xda: break
            ln = int.from_bytes(data[i+2:i+4], 'big'); seg = data[i+4:i+2+ln]
            if m == 0xeb and seg[:2] == b'JP':
                en = seg[2:4]; z = int.from_bytes(seg[4:8], 'big'); payload = seg[8:]
                if en in parts: payload = payload[8:]
                parts.setdefault(en, []).append((z, payload))
            i += 2 + ln
        stores = []
        for en, ps in parts.items():
            blob = b''.join(p for _, p in sorted(ps))
            if blob[4:8] == b'jumb': stores.append(blob)
        return stores
    stores = []
    for typ, bs, cs, be in boxes(data):
        if typ == 'uuid' and data[cs:cs+16].hex() == 'd8fec3d61b0e483c92975828877ec481':
            j = cs + 16 + 4; z = data.index(0, j); purpose = data[j:z].decode(); j = z + 1
            if purpose == 'manifest': j += 8
            if purpose in ('manifest',): stores.append(data[j:be])
    return stores

def cert_info(der):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.der') as f: f.write(der)
    try:
        out = subprocess.run(['openssl', 'x509', '-inform', 'DER', '-noout', '-subject', '-issuer', '-enddate'], capture_output=True, text=True, input='', args=None) if False else \
            subprocess.run(['openssl', 'x509', '-inform', 'DER', '-in', f.name, '-noout', '-subject', '-issuer', '-enddate'], capture_output=True, text=True).stdout.strip()
        pem = subprocess.run(['openssl', 'x509', '-inform', 'DER', '-in', f.name, '-pubkey', '-noout'], capture_output=True, text=True).stdout
        return out, pem
    finally: os.unlink(f.name)

def verify_sig(pem, alg, msg, sig):
    n = len(sig) // 2; r, s = int.from_bytes(sig[:n], 'big'), int.from_bytes(sig[n:], 'big')
    def derint(x):
        bb = x.to_bytes((x.bit_length() + 8) // 8 or 1, 'big'); return b'\x02' + bytes([len(bb)]) + bb
    body = derint(r) + derint(s); der = b'\x30' + (bytes([len(body)]) if len(body) < 128 else b'\x81' + bytes([len(body)])) + body
    d = {-7: 'sha256', -35: 'sha384', -36: 'sha512'}.get(alg)
    if not d: return f'alg {alg} not checked'
    with tempfile.TemporaryDirectory() as t:
        open(f'{t}/k.pem', 'w').write(pem); open(f'{t}/m', 'wb').write(msg); open(f'{t}/s', 'wb').write(der)
        r = subprocess.run(['openssl', 'dgst', '-' + d, '-verify', f'{t}/k.pem', '-signature', f'{t}/s', f'{t}/m'], capture_output=True, text=True)
        return r.stdout.strip() or r.stderr.strip()

def main(path):
    data = open(path, 'rb').read(); stores = find_store(data)
    rep = {'file': os.path.basename(path), 'bytes': len(data), 'stores': len(stores), 'manifests': []}
    for st in stores:
        top = None
        for typ, bs, cs, be in boxes(st):
            if typ == 'jumb': top = parse_jumb(st, cs, be)
        if not top: continue
        rep['store_label'] = top['label']
        for m in top['children']:
            mi = {'label': m['label'], 'assertions': [], 'actions': [], 'ingredients': 0}
            assertion_boxes = {}
            claim_bytes = None; sig = None
            for ch in m['children']:
                if ch['label'] == 'c2pa.assertions':
                    for a in ch['children']:
                        mi['assertions'].append(a['label']); assertion_boxes[a['label']] = a
                        if a['label'].startswith('c2pa.ingredient'): mi['ingredients'] += 1
                        if a['label'] == 'c2pa.hash.data':
                            for t, c in a['content']:
                                if t == 'cbor':
                                    v, _ = cbor(c); keep = bytearray(); pos = 0
                                    for ex in sorted(v.get('exclusions') or [], key=lambda x: x['start']):
                                        keep += data[pos:ex['start']]; pos = ex['start'] + ex['length']
                                    keep += data[pos:]
                                    h = hashlib.new((v.get('alg') or 'sha256').replace('-', ''), bytes(keep)).digest()
                                    mi['data_hash'] = 'match' if h == v.get('hash') else 'MISMATCH'
                        if a['label'].startswith('c2pa.hash.bmff'):
                            # top-level exclusions only (non-fragmented files): sha over (u64 BE offset + box bytes)
                            # of every box not excluded; checked against a v3 file whose hash it reproduced.
                            for t, c in a['content']:
                                if t != 'cbor': continue
                                v, _ = cbor(c)
                                if v.get('merkle'): mi['data_hash'] = 'bmff merkle not checked'; continue
                                exl = v.get('exclusions') or []
                                def excluded(typ, bs, be):
                                    for ex in exl:
                                        if ex.get('xpath') != '/' + typ: continue
                                        ok = all(data[bs + dm['offset']: bs + dm['offset'] + len(dm['value'])] == dm['value'] for dm in (ex.get('data') or []))
                                        if ok: return True
                                    return False
                                h = hashlib.new((v.get('alg') or 'sha256').replace('-', ''))
                                for typ, bs, cs, be in boxes(data):
                                    if not excluded(typ, bs, be): h.update(bs.to_bytes(8, 'big')); h.update(data[bs:be])
                                mi['data_hash'] = ('match' if h.digest() == v.get('hash') else 'MISMATCH') + f" ({a['label']})"
                        if a['label'].startswith('c2pa.actions'):
                            for t, c in a['content']:
                                if t == 'cbor':
                                    v, _ = cbor(c)
                                    for ac in v.get('actions', []):
                                        mi['actions'].append({'action': ac.get('action'), 'digitalSourceType': str(ac.get('digitalSourceType', '')).split('/')[-1], 'description': ac.get('description'), 'softwareAgent': ac.get('softwareAgent')})
                elif ch['label'] and ch['label'].startswith('c2pa.claim'):
                    claim_bytes = ch['content'][0][1]; mi['claim_label'] = ch['label']
                elif ch['label'] == 'c2pa.signature':
                    sig = ch['content'][0][1]
            if claim_bytes:
                claim, _ = cbor(claim_bytes)
                cg = claim.get('claim_generator') or claim.get('claim_generator_info')
                mi['claim_generator'] = cg if isinstance(cg, str) else json.dumps(cg, default=str)[:300]
                mi['title'] = claim.get('dc:title') or claim.get('title')
                mi['alg'] = claim.get('alg')
                # assertion hash check
                bad = []
                refs = (claim.get('assertions') or []) + (claim.get('created_assertions') or []) + (claim.get('gathered_assertions') or [])
                for ref in refs:
                    url = ref.get('url', ''); lab = url.split('/')[-1]; a = assertion_boxes.get(lab)
                    if not a: bad.append(f'missing {lab}'); continue
                    bs, be = a['box']; whole = None
                    # hash = sha256 over the assertion's jumb box contents (jumd + content boxes) i.e. superbox minus its 8-byte header
                    alg = ref.get('alg') or claim.get('alg') or 'sha256'
                    h = hashlib.new(alg.replace('-', ''), st[bs+8:be]).digest()
                    if h != ref.get('hash'): bad.append(f'hash mismatch {lab}')
                mi['assertion_refs'] = len(refs); mi['assertion_hash_problems'] = bad
            if sig:
                v, _ = cbor(sig); v = v['v'] if isinstance(v, dict) and '_tag' in v else v
                prot, unprot, payload, signature = v
                ph, _ = cbor(prot) if prot else ({}, 0)
                x5 = ph.get(33) or (unprot or {}).get(33) or ph.get('x5chain') or (unprot or {}).get('x5chain')
                certs = x5 if isinstance(x5, list) else [x5]
                info, pem = cert_info(certs[0]) if certs and certs[0] else ('no cert', '')
                mi['signer'] = info
                msg = enc_head(4, 4) + enc_head(3, 10) + b'Signature1' + enc_head(2, len(prot)) + prot + enc_head(2, 0) + enc_head(2, len(claim_bytes)) + claim_bytes
                mi['signature_check'] = verify_sig(pem, ph.get(1), msg, signature) if pem else 'no key'
            rep['manifests'].append(mi)
    rep['active_manifest'] = rep['manifests'][-1]['label'] if rep['manifests'] else None
    print(json.dumps(rep, indent=1, default=str))

if __name__ == '__main__':
    for p in sys.argv[1:]: main(p)
