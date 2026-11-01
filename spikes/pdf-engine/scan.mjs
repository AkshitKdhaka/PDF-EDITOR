// Scan reconstruction probe: explicitly approximate, restricted to a known plain background.
export function imagePdf(e, image, widthPt, heightPt) {
  const a = e.api, doc = a.FPDF_CreateNewDocument(), page = a.FPDFPage_New(doc, 0, widthPt, heightPt);
  const bitmap = a.FPDFBitmap_Create(image.width, image.height, 1);
  try {
    const ptr = a.FPDFBitmap_GetBuffer(bitmap), stride = a.FPDFBitmap_GetStride(bitmap);
    for (let y=0;y<image.height;y++) for(let x=0;x<image.width;x++) {
      const s=(y*image.width+x)*4,d=ptr+y*stride+x*4;
      e.mem.HEAPU8[d]=image.data[s+2];e.mem.HEAPU8[d+1]=image.data[s+1];e.mem.HEAPU8[d+2]=image.data[s];e.mem.HEAPU8[d+3]=image.data[s+3];
    }
    const obj=a.FPDFPageObj_NewImageObj(doc);
    if(!a.FPDFImageObj_SetBitmap(0,0,obj,bitmap))throw Error('Bitmap import failed');
    a.FPDFImageObj_SetMatrix(obj,widthPt,0,0,heightPt,0,0);a.FPDFPage_InsertObject(page,obj);
    if(!a.FPDFPage_GenerateContent(page))throw Error('Image serialization failed');
    return e.save({doc});
  } finally {a.FPDFBitmap_Destroy(bitmap);a.FPDF_ClosePage(page);a.FPDF_CloseDocument(doc);}
}

export function patchPlainRegion(original, replacement, box) {
  if(original.width!==replacement.width||original.height!==replacement.height)throw Error('Dimensions differ');
  const data=original.data.slice(),[left,top,right,bottom]=box;
  if(!box.every(Number.isInteger)||left<0||top<0||right>original.width||bottom>original.height||right<=left||bottom<=top)throw Error('Invalid region');
  for(let y=top;y<bottom;y++)data.set(replacement.data.subarray((y*original.width+left)*4,(y*original.width+right)*4),(y*original.width+left)*4);
  return {...original,data};
}
