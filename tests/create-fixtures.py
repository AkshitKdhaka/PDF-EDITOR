from pathlib import Path
from pypdf import PdfReader,PdfWriter
p=Path('tmp/viewer-fixtures');p.mkdir(exist_ok=True)
n=PdfReader('tmp/engine-spike/native-original.pdf');s=PdfReader('tmp/engine-spike/scan-original.pdf')
w=PdfWriter();w.add_page(n.pages[0]);w.add_page(s.pages[0]);w.write(p/'two-pages.pdf')
w=PdfWriter();w.add_page(n.pages[0]);w.encrypt('local-test-password');w.write(p/'locked.pdf')
w=PdfWriter();w.add_page(s.pages[0]);w.pages[0].merge_page(n.pages[0]);w.write(p/'mixed.pdf')
w=PdfWriter();w.add_blank_page(width=420,height=220);w.write(p/'blank.pdf')
w=PdfWriter()
for i in range(201):w.add_blank_page(width=10,height=10)
w.write(p/'too-many.pdf')
print('Synthetic viewer fixtures ready')
