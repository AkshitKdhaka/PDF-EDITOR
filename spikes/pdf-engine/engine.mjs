// Experimental PDFium adapter. No network, UI, or account dependencies.
export class PdfEngine {
  constructor(api) { this.api = api; this.mem = api.pdfium; api.PDFiumExt_Init(); }
  alloc(bytes) { const p = this.mem.wasmExports.malloc(bytes.length); if (!p) throw Error('Allocation failed'); this.mem.HEAPU8.set(bytes, p); return p; }
  free(p) { this.mem.wasmExports.free(p); }
  utf16(text) { const bytes = new Uint8Array((text.length + 1) * 2); const v = new DataView(bytes.buffer); for (let i = 0; i < text.length; i++) v.setUint16(i * 2, text.charCodeAt(i), true); return this.alloc(bytes); }
  open(bytes) {
    if (bytes.length > 50 * 1024 * 1024) throw Error('Input exceeds spike limit');
    const ptr = this.alloc(bytes), doc = this.api.FPDF_LoadMemDocument(ptr, bytes.length, '');
    if (!doc) { this.free(ptr); throw Error('Cannot open PDF (invalid, unsupported, or password required)'); }
    return { doc, ptr };
  }
  close(handle) { this.api.FPDF_CloseDocument(handle.doc); if (handle.ptr) this.free(handle.ptr); }
  page(handle, index = 0) { const page = this.api.FPDF_LoadPage(handle.doc, index); if (!page) throw Error('Page unavailable'); return page; }
  text(page) {
    const a = this.api, tp = a.FPDFText_LoadPage(page);
    try { const n = a.FPDFText_CountChars(tp), ptr = this.alloc(new Uint8Array((n + 1) * 2)); try { a.FPDFText_GetText(tp, 0, n, ptr); return this.mem.UTF16ToString(ptr); } finally { this.free(ptr); } }
    finally { a.FPDFText_ClosePage(tp); }
  }
  runs(page) {
    const a = this.api, tp = a.FPDFText_LoadPage(page), result = [];
    try {
      for (let index = 0; index < a.FPDFPage_CountObjects(page); index++) {
        const obj = a.FPDFPage_GetObject(page, index);
        if (a.FPDFPageObj_GetType(obj) !== 1) continue;
        const size = a.FPDFTextObj_GetText(obj, tp, 0, 0), ptr = this.alloc(new Uint8Array(Math.max(4, size)));
        try { a.FPDFTextObj_GetText(obj, tp, ptr, size); result.push({ index, obj, text: this.mem.UTF16ToString(ptr), ...this.style(obj) }); } finally { this.free(ptr); }
      }
    } finally { a.FPDFText_ClosePage(tp); }
    return result;
  }
  style(obj) {
    const a = this.api, p = this.alloc(new Uint8Array(64));
    try {
      a.FPDFTextObj_GetFontSize(obj, p); const fontSize = this.mem.HEAPF32[p / 4];
      a.FPDFPageObj_GetBounds(obj, p + 4, p + 8, p + 12, p + 16);
      const bounds = Array.from(this.mem.HEAPF32.slice(p / 4 + 1, p / 4 + 5));
      a.FPDFPageObj_GetMatrix(obj, p + 20); const matrix = Array.from(this.mem.HEAPF32.slice(p / 4 + 5, p / 4 + 11));
      a.FPDFPageObj_GetFillColor(obj, p, p + 4, p + 8, p + 12); const color = Array.from(this.mem.HEAPU32.slice(p / 4, p / 4 + 4));
      return { fontSize, bounds, matrix, color };
    } finally { this.free(p); }
  }
  replace(page, index, text) {
    // Low-level probe only: callers must validate glyphs, shaping and overflow.
    if (typeof text !== 'string' || text.length > 10000 || text.includes('\0')) throw Error('Invalid replacement');
    const a = this.api, obj = a.FPDFPage_GetObject(page, index);
    if (!obj || a.FPDFPageObj_GetType(obj) !== 1) throw Error('Only top-level text objects supported');
    const ptr = this.utf16(text);
    try { if (!a.FPDFText_SetText(obj, ptr)) throw Error('Text change rejected'); } finally { this.free(ptr); }
    if (!a.FPDFPage_GenerateContent(page)) throw Error('Content serialization failed');
  }
  save(handle) {
    const a = this.api, writer = a.PDFiumExt_OpenFileWriter();
    try {
      if (!a.FPDF_SaveAsCopy(handle.doc, writer, 2)) throw Error('Save failed');
      const size = a.PDFiumExt_GetFileWriterSize(writer), ptr = this.alloc(new Uint8Array(size));
      try { a.PDFiumExt_GetFileWriterData(writer, ptr, size); return this.mem.HEAPU8.slice(ptr, ptr + size); } finally { this.free(ptr); }
    } finally { a.PDFiumExt_CloseFileWriter(writer); }
  }
  render(page, scale = 2) {
    const a = this.api, width = Math.ceil(a.FPDF_GetPageWidth(page) * scale), height = Math.ceil(a.FPDF_GetPageHeight(page) * scale);
    if (width * height > 25e6) throw Error('Pixel limit exceeded');
    const bitmap = a.FPDFBitmap_Create(width, height, 1);
    try {
      a.FPDFBitmap_FillRect(bitmap, 0, 0, width, height, 0xffffffff);
      a.FPDF_RenderPageBitmap(bitmap, page, 0, 0, width, height, 0, 0);
      const ptr = a.FPDFBitmap_GetBuffer(bitmap), stride = a.FPDFBitmap_GetStride(bitmap), data = new Uint8Array(width * height * 4);
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) { const s = ptr + y * stride + x * 4, d = (y * width + x) * 4; data[d] = this.mem.HEAPU8[s + 2]; data[d + 1] = this.mem.HEAPU8[s + 1]; data[d + 2] = this.mem.HEAPU8[s]; data[d + 3] = this.mem.HEAPU8[s + 3]; }
      return { width, height, data };
    } finally { a.FPDFBitmap_Destroy(bitmap); }
  }
}
