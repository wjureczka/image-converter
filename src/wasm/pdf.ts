declare global {
  interface Window {
    PDF: () => Promise<any>;
    PDF_INSTANCE: {
      create_pdf_image: (
        filename: string,
        width: number,
        height: number,
        outputFilename: string,
      ) => void;
      FS: {
        open: (filename: string, mode: string) => Buffer;
        readFile: (filename: string) => Blob;
        write: (
          stream: Buffer,
          data: Uint8Array,
          start: number,
          length: number,
          end: number,
        ) => void;
        close: (stream: ArrayBuffer) => void;
      };
    };
  }
}

(function () {
  window.PDF().then((mod) => {
    window.PDF_INSTANCE = {
      ...mod,
      create_pdf_image: mod.cwrap("create_pdf_image", "", [
        "string",
        "number",
        "number",
        "string",
      ]),
    };
  });
})();

export {};
