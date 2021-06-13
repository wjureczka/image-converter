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
      create_buffer: mod.cwrap("create_buffer", "number", ["number", "number"]),
      destroy_buffer: mod.cwrap("destroy_buffer", "", ["number"]),
      encode: mod.cwrap("encode", "number", [
        "number",
        "number",
        "number",
        "number",
      ]),
      get_result_pointer: mod.cwrap("get_result_pointer", "number", []),
      get_result_size: mod.cwrap("get_result_size", "number", []),
      free_result: mod.cwrap("free_result", "", ["number"]),
    };
  });
})();

export {};
