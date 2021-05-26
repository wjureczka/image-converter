import React, { ReactNode, useState } from "react";

export enum ImageType {
  JPEG = "jpeg",
  PNG = "png",
  BMP = "bmp",
  WEBP = "webp",
  GIF = "gif",
  PDF = "pdf",
}

export interface ImagesContextInterface {
  image: File | null;
  addImage: (image: File) => void;
  removeImage: () => void;
}

export const ImagesContext = React.createContext<ImagesContextInterface>({
  image: null,
  addImage: () => {
    console.error("Method not initialized");
  },
  removeImage: () => {
    console.error("Method not initialized");
  },
});

interface ImagesContextProviderProps {
  children: ReactNode;
}

export const ImagesContextProvider = ({
  children,
}: ImagesContextProviderProps) => {
  const [image, setImage] = useState<ImagesContextInterface["image"]>(null);

  const addImage = (image: ImagesContextInterface["image"]) => {
    setImage(image);
  };

  const removeImage = () => {
    setImage(null);
  };

  const context = {
    image,
    addImage,
    removeImage,
  };

  return (
    <ImagesContext.Provider value={context}>{children}</ImagesContext.Provider>
  );
};
