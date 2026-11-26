# Design — Video · 編輯模式: Recent task unselect / select / select all (context: cards drawn before the model tag)

Source: Design Figma https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3217 · board `d-recent-edit` · node 1794:3217 · box x=-1655 y=-7258 w=1925 h=2340 (absolute Figma canvas points)
Figma text layer (inventory read 2026-11-23, figma-design / qa-dm); no PDF export exists, so no OCR. Columns: y, x (offset from the board's top-left, Figma points), text; [phone] = inside a phone mockup.

```
    88     78  Video · 編輯模式
   112    574  點擊 Select 進入編輯狀態
   252     78  Dark
   323     95  Unselect
   323    570  Select
   323   1045  Select all
   441    132  [phone] Cinematic Reel Creator 
   441    607  [phone] Cinematic Reel Creator 
   441   1082  [phone] Cinematic Reel Creator 
   486    301  [phone] Select All
   486    391  [phone] Cancel
   486    776  [phone] Select All
   486    866  [phone] Cancel
   486   1234  [phone] Deselect All
   486   1341  [phone] Cancel
   536    216  [phone] 2026/08/16 · 0:12
   536    691  [phone] 2026/08/16 · 0:12
   536   1166  [phone] 2026/08/16 · 0:12
   554    216  [phone] Template name 0816
   554    691  [phone] Template name 0816
   554   1166  [phone] Template name 0816
   609    379  [phone] View
   609    854  [phone] View
   609   1329  [phone] View
   668    216  [phone] 2026/08/13 · 0:12
   668    691  [phone] 2026/08/13 · 0:12
   668   1166  [phone] 2026/08/13 · 0:12
   686    216  [phone] Template name 0813
   686    691  [phone] Template name 0813
   686   1166  [phone] Template name 0813
   741    379  [phone] View
   741    854  [phone] View
   741   1329  [phone] View
   800    216  [phone] 2026/08/12 · 0:12
   800    691  [phone] 2026/08/12 · 0:12
   800   1166  [phone] 2026/08/12 · 0:12
   818    216  [phone] Template name 0812
   818    691  [phone] Template name 0812
   818   1166  [phone] Template name 0812
   873    379  [phone] View
   873    854  [phone] View
   873   1329  [phone] View
   932    216  [phone] 2026/08/11 · 0:12
   932    691  [phone] 2026/08/11 · 0:12
   932   1166  [phone] 2026/08/11 · 0:12
   950    216  [phone] Template name 0811
   950    691  [phone] Template name 0811
   950   1166  [phone] Template name 0811
  1005    379  [phone] View
  1005    854  [phone] View
  1005   1329  [phone] View
  1064    216  [phone] 2026/08/09 · 0:12
  1064    691  [phone] 2026/08/09 · 0:12
  1064   1166  [phone] 2026/08/09 · 0:12
  1082    216  [phone] Template name 0809
  1082    691  [phone] Template name 0809
  1082   1166  [phone] Template name 0809
  1137    379  [phone] View
  1137    854  [phone] View
  1137   1329  [phone] View
  1142    234  [phone] Delete
  1142    709  [phone] Delete
  1142   1184  [phone] Delete
  1335     80  Light
  1485    132  [phone] Cinematic Reel Creator 
  1485    607  [phone] Cinematic Reel Creator 
  1485   1082  [phone] Cinematic Reel Creator 
  1530    301  [phone] Select All
  1530    391  [phone] Cancel
  1530    776  [phone] Select All
  1530    866  [phone] Cancel
  1530   1234  [phone] Deselect All
  1530   1341  [phone] Cancel
  1580    216  [phone] 2026/08/16 · 00:12
  1580    691  [phone] 2026/08/16 · 00:12
  1580   1166  [phone] 2026/08/16 · 00:12
  1598    216  [phone] Template name 0816
  1598    691  [phone] Template name 0816
  1598   1166  [phone] Template name 0816
  1653    379  [phone] View
  1653    854  [phone] View
  1653   1329  [phone] View
  1712    216  [phone] 2026/08/13 · 00:12
  1712    691  [phone] 2026/08/13 · 00:12
  1712   1166  [phone] 2026/08/13 · 00:12
  1730    216  [phone] Template name 0813
  1730    691  [phone] Template name 0813
  1730   1166  [phone] Template name 0813
  1785    379  [phone] View
  1785    854  [phone] View
  1785   1329  [phone] View
  1844    216  [phone] 2026/08/12 · 00:12
  1844    691  [phone] 2026/08/12 · 00:12
  1844   1166  [phone] 2026/08/12 · 00:12
  1862    216  [phone] Template name 0812
  1862    691  [phone] Template name 0812
  1862   1166  [phone] Template name 0812
  1917    379  [phone] View
  1917    854  [phone] View
  1917   1329  [phone] View
  1976    216  [phone] 2026/08/11 · 00:12
  1976    691  [phone] 2026/08/11 · 00:12
  1976   1166  [phone] 2026/08/11 · 00:12
  1994    216  [phone] Template name 0811
  1994    691  [phone] Template name 0811
  1994   1166  [phone] Template name 0811
  2049    379  [phone] View
  2049    854  [phone] View
  2049   1329  [phone] View
  2108    216  [phone] 2026/08/09 · 00:12
  2108    691  [phone] 2026/08/09 · 00:12
  2108   1166  [phone] 2026/08/09 · 00:12
  2126    216  [phone] Template name 0809
  2126    691  [phone] Template name 0809
  2126   1166  [phone] Template name 0809
  2181    379  [phone] View
  2181    854  [phone] View
  2181   1329  [phone] View
  2186    234  [phone] Delete
  2186    709  [phone] Delete
  2186   1184  [phone] Delete
```
