import React, { ChangeEvent, useContext, useRef, useState } from "react";
import styled from "@emotion/styled";
import PublishIcon from "@material-ui/icons/Publish";
import { ImagesContext, ImageType } from "../context/ImagesContext";

const ImageUploadContainer = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--margin-xl);
  justify-items: center;
  height: 100%;
  width: 100%;
  max-width: 400px;
`;

const ImageInputLabel = styled.label`
  position: relative;
  color: var(--interactive-loud);
  text-shadow: 0 0 3px lightgray;
  cursor: pointer;
  width: 100%;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--interactive-silent);
  box-shadow: var(--shadow);
  border: 2px dashed var(--interactive-loud);
  border-radius: 16px;

  svg {
    font-size: 50px;
  }

  path {
    fill: var(--interactive-loud);
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ControlsContainer = styled.div`
  width: 100%;
  height: max-content;
  display: grid;
  grid-auto-flow: column;
  grid-gap: var(--margin-l);
`;

const Select = styled.select`
  flex: 1;
  display: inline-flex;
  border: none;
  border-radius: 16px;
  padding: 10px;
  color: white;
  background-color: var(--fill-01);
  font-weight: 900;
  text-transform: uppercase;
`;

const ConvertButton = styled.button`
  flex: 1;
  display: inline-flex;
  justify-content: center;
  font-weight: 900;
  padding: 10px;
  color: white;
  text-transform: uppercase;
  border: none;
  border-radius: 16px;
  background-color: var(--fill-01);
  box-shadow: var(--shadow);
`;

const SelectedImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectedImage = styled.img`
  max-width: 100%;
  height: 100%;
`;

const ImageUpload = () => {
  const { addImage } = useContext(ImagesContext);
  const imageInputReference = useRef<HTMLInputElement | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedConversionType, setSelectedConversionType] =
    useState<ImageType>(ImageType.PNG);
  const handleOnImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = imageInputReference.current?.files || [];

    if (files[0]) {
      const newImageUrl = URL.createObjectURL(files[0]);
      setSelectedImageUrl(newImageUrl);
    }
  };

  const handleConvertImage = () => {
    const files = imageInputReference.current?.files || [];

    if (files[0]) {
      const newImageUrl = URL.createObjectURL(files[0]);

      addImage({ type: selectedConversionType, src: newImageUrl });
      setSelectedImageUrl(null);
    }
  };

  const handleConversionTypeChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedConversionType(event.target.value as ImageType);
  };

  return (
    <ImageUploadContainer>
      <ImageInputLabel>
        <PublishIcon />

        <div>Drag your image or click to upload</div>

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

      <ControlsContainer>
        <Select
          value={selectedConversionType}
          onChange={handleConversionTypeChange}
        >
          {Object.keys(ImageType).map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </Select>

        <ConvertButton onClick={handleConvertImage}>Convert</ConvertButton>
      </ControlsContainer>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
