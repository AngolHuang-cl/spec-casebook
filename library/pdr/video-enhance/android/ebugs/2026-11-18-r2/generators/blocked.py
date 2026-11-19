"""Group the R2 Blocked cases by what would unblock them (used by review.py and the run's report.md)."""
import re


def group(r):
    n, a = r["Needs"], r["Actual"]
    if "low-balance" in n:
        return "low balance (the run does not spend the account down)"
    if "server-failure" in n or "fault switch" in a:
        return "failure in the background (no fault switch on Android)"
    if re.search(r"Turn on notifications", a):
        return "upstream: TC-118 dialog never appears (ISS-VEA-38)"
    if re.search(r"2 days|≥ 2 days", a):
        return "task 2 days old"
    return "other"
