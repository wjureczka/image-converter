import React, { useContext } from "react";
import { Image as UserImage, ImagesContext } from "../context/ImagesContext";
import SaveIcon from "@material-ui/icons/Save";

const ImageDownload = () => {
  const { images, removeImage } = useContext(ImagesContext);

  const handleImageDownload = (image: UserImage) => {
    const img = new Image();

    img.onload = () => {
      new Promise(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/bmp", 1);

        const anchor = document.createElement("a");
        anchor.href = dataURL;
        anchor.style.display = "none";
        anchor.download = "newone.bmp";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      });
    };

    img.src = image.src;
  };

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={image.src.slice(0, 20) + image.type}>
            <img src={image.src} />

            <button onClick={() => handleImageDownload(image)}>
              <SaveIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageDownload;
