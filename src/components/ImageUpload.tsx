import React, { ChangeEvent, useContext, useRef, useState } from "react";
import styled from "@emotion/styled";
import PublishIcon from "@material-ui/icons/Publish";
import { ImagesContext, ImageType } from "../context/ImagesContext";

const ImageUploadContainer = styled.section`
  display: flex;
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageInputLabel = styled.label<{ hasImage: boolean }>`
  overflow: hidden;
  position: relative;
  color: var(--interactive-loud);
  font-weight: 800;
  cursor: pointer;
  width: 100%;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ hasImage }) => (hasImage ? "none" : "var(--shadow)")};
  border: ${({ hasImage }) =>
    hasImage ? "none" : "2px dashed var(--interactive-loud)"};
  border-radius: 16px;
  transition: all 225ms;

  svg {
    font-size: 50px;
    transition: all 225ms;
  }

  path {
    fill: var(--interactive-loud);
  }

  &:hover {
    box-shadow: ${({ hasImage }) =>
      hasImage ? "none" : "0 5px 7px rgba(0, 0, 0, 0.5)"};

    svg {
      transform: scale(1.2);
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const SelectedImageContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectedImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageUpload = () => {
  const { image, addImage } = useContext(ImagesContext);
  const imageInputReference = useRef<HTMLInputElement | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleOnImageChange = () => {
    const files = imageInputReference.current?.files || [];

    if (files[0]) {
      const newImageUrl = URL.createObjectURL(files[0]);
      setSelectedImageUrl(newImageUrl);
      addImage(files[0]);
    }
  };

  return (
    <ImageUploadContainer>
      <ImageInputLabel hasImage={!!image}>
        {!image && (
          <>
            <PublishIcon />
            <div>Click to upload</div>
          </>
        )}

        <ImageInput
          ref={imageInputReference}
          onChange={handleOnImageChange}
          name="image-input"
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
        />

        <SelectedImageContainer>
          <SelectedImage src={selectedImageUrl || ""} />
        </SelectedImageContainer>
      </ImageInputLabel>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
