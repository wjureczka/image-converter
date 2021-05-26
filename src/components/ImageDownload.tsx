import React, { useContext, useState } from "react";
import { ImagesContext, ImageType } from "../context/ImagesContext";
import SettingsIcon from "@material-ui/icons/Settings";
import styled from "@emotion/styled";

const createDownloadAnchor = (dataURL: string, extension: string) => {
  const anchor = document.createElement("a");
  anchor.href = dataURL;
  anchor.style.display = "none";
  anchor.download = `converted.${extension}`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

const ImageDownloadSection = styled.section`
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const ImageDownloadHeader = styled.h2`
  font-size: var(--font-size-h2);
  color: var(--font-white);
`;

const AvailableConversionOptions = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: var(--margin-m);
  margin-top: var(--margin-m);
`;

const ConversionOption = styled.li<{ loading: boolean }>`
  cursor: ${({ loading }) => (loading ? "progress" : "pointer")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fill-white);
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: var(--font-size-h3);
  transition: all 225ms;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  text-transform: uppercase;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    transform: scale(1.02) translateZ(0);
  }
`;

const ConversionButton = styled.button`
  background-color: var(--interactive-silent);
  border: none;
  border-radius: 8px;
  padding: 16px;
  text-transform: uppercase;
  color: var(--font-color-primary);
  font-weight: 800;
`;

const convertBaseImageType = (
  file: File,
  mimetype: string,
  newFilename: string,
) => {
  const reader = new FileReader();
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0);

    const dataURL = canvas.toDataURL(mimetype, 1);

    const anchor = document.createElement("a");
    anchor.href = dataURL;
    anchor.style.display = "none";
    anchor.download = newFilename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  reader.onload = () => {
    image.src = reader.result as string;
  };

  reader.readAsDataURL(file);
};

const ImageDownload = () => {
  const [loading, setLoading] = useState(false);
  const { image, removeImage } = useContext(ImagesContext);

  const imagesConversionStrategies = {
    [ImageType.BMP]: (image: File) => {
      setLoading(() => true);
      convertBaseImageType(image, "image/bmp", "converted.bmp");
      setLoading(() => false);
    },
    [ImageType.PNG]: (image: File) => {
      setLoading(() => true);
      convertBaseImageType(image, "image/png", "converted.png");
      setLoading(() => false);
    },
    [ImageType.JPEG]: (image: File) => {
      setLoading(() => true);
      convertBaseImageType(image, "image/jpeg", "converted.jpeg");
      setLoading(() => false);
    },
    [ImageType.WEBP]: (file: File) => {
      const reader = new FileReader();
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0);

        const imageData = ctx?.getImageData(0, 0, image.width, image.height);

        const pointer = window.WEBP_INSTANCE.create_buffer(
          image.width,
          image.height,
        );
        window.WEBP_INSTANCE.HEAP8.set(imageData!.data, pointer);

        window.WEBP_INSTANCE.encode(
          pointer,
          imageData!.width,
          imageData!.height,
          100,
        );
        const resultPointer = window.WEBP_INSTANCE.get_result_pointer();
        const resultSize = window.WEBP_INSTANCE.get_result_size();
        const resultView = new Uint8Array(
          window.WEBP_INSTANCE.HEAP8.buffer,
          resultPointer,
          resultSize,
        );
        const result = new Uint8Array(resultView);
        window.WEBP_INSTANCE.free_result(resultPointer);
        window.WEBP_INSTANCE.destroy_buffer(pointer);

        const blob = new Blob([result], { type: "image/webp" });
        const blobURL = URL.createObjectURL(blob);
        createDownloadAnchor(blobURL, "webp");
      };

      reader.onload = () => {
        image.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    },
    [ImageType.PDF]: (file: File) => {
      const reader = new FileReader();
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0);

        canvas.toBlob(
          async (blob) => {
            const outputPdfFilename = "converted.pdf";
            const imageFilename = "conversion-image-progress.jpeg";
            const data = new Uint8Array(await blob!.arrayBuffer());

            let stream = window.PDF_INSTANCE.FS.open(imageFilename, "w+");
            window.PDF_INSTANCE.FS.write(stream, data, 0, data.length, 0);
            window.PDF_INSTANCE.FS.close(stream);

            window.PDF_INSTANCE.create_pdf_image(
              imageFilename,
              image.width,
              image.height,
              outputPdfFilename,
            );

            const blobToDownload = new Blob(
              [window.PDF_INSTANCE.FS.readFile(outputPdfFilename)],
              {
                type: "application/octet-stream",
              },
            );
            const blobURL = URL.createObjectURL(blobToDownload);
            createDownloadAnchor(blobURL, "pdf");
            // pdf.destroy_image_buffer(p);
          },
          "image/jpeg",
          1,
        );
      };

      reader.onload = () => {
        image.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    },
  };

  return (
    <ImageDownloadSection>
      <ImageDownloadHeader>
        {!!image
          ? "Download your image\u00A0below"
          : "Choose your photo to discover available formats"}
      </ImageDownloadHeader>

      {!!image && (
        <AvailableConversionOptions>
          {Object.entries(imagesConversionStrategies).map(
            ([type, callback]) => (
              <ConversionOption key={type} loading={loading}>
                {type}
                <ConversionButton
                  onClick={() => callback(image)}
                  disabled={loading}
                >
                  Convert
                </ConversionButton>
              </ConversionOption>
            ),
          )}
        </AvailableConversionOptions>
      )}

      {loading && (
        <div>
          <SettingsIcon />
        </div>
      )}
    </ImageDownloadSection>
  );
};

export default ImageDownload;
