import React, { ReactNode, useState } from "react";

export enum ImageType {
  JPEG = "JPEG",
  PNG = "PNG",
  BMP = "BMP",
  WEBP = "WEBP",
  GIF = "GIF",
  PDF = "PDF",
}

export interface Image {
  src: string;
  type: ImageType;
}

export interface ImagesContextInterface {
  images: Image[];
  addImage: (image: Image) => void;
  removeImage: (image: Image) => void;
}

export const ImagesContext = React.createContext<ImagesContextInterface>({
  images: [],
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
  const [images, setImages] = useState<Image[]>([]);

  const addImage = (image: Image) => {
    setImages((previousImages) => [...previousImages, image]);
  };

  const removeImage = (imageToRemove: Image) => {
    setImages((previousImages) =>
      previousImages.filter(
        (image) =>
          imageToRemove.src !== image.src && imageToRemove.type !== image.type,
      ),
    );
  };

  const context = {
    images,
    addImage,
    removeImage,
  };

  return (
    <ImagesContext.Provider value={context}>{children}</ImagesContext.Provider>
  );
};
