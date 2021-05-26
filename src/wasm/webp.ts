declare global {
  interface Window {
    WEBP: () => Promise<any>;
    WEBP_INSTANCE: {
      create_buffer: (width: number, height: number) => number;
      encode: (
        pointer: number,
        width: number,
        height: number,
        quality: number,
      ) => void;
      get_result_pointer: () => number;
      get_result_size: () => number;
      free_result: (pointer: number) => void;
      destroy_buffer: (pointer: number) => void;
      HEAP8: {
        set: (data: Uint8ClampedArray, pointer: number) => void;
        buffer: ArrayBuffer;
      };
    };
  }
}

(function () {
  window.WEBP().then((mod) => {
    window.WEBP_INSTANCE = {
      ...mod,
      // @ts-ignore
      create_buffer: mod.cwrap("create_buffer", "number", ["number", "number"]),
      // @ts-ignore
      destroy_buffer: mod.cwrap("destroy_buffer", "", ["number"]),
      // @ts-ignore
      encode: mod.cwrap("encode", "number", [
        "number",
        "number",
        "number",
        "number",
      ]),
      // @ts-ignore
      get_result_pointer: mod.cwrap("get_result_pointer", "number", []),
      // @ts-ignore
      get_result_size: mod.cwrap("get_result_size", "number", []),
      // @ts-ignore
      free_result: mod.cwrap("free_result", "", ["number"]),
    };
  });
})();

export {};
