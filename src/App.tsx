import React from "react";
import styled from "@emotion/styled";
import ImageUpload from "./components/ImageUpload";
import ImageDownload from "./components/ImageDownload";
import { ImagesContextProvider } from "./context/ImagesContext";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;

  @media screen and (min-width: var(--screen-tablet)) {
    margin-left: var(--margin-xxl);
    margin-right: var(--margin-xxl);
  }
`;

const AppHeader = styled.h1`
  font-size: var(--font-size-h1);
  margin-top: var(--margin-xl);
  color: var(--font-white);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--margin-xxl);
  margin-top: var(--margin-xxl);
`;

function App() {
  return (
    <ImagesContextProvider>
      <AppContainer>
        <AppHeader>Image converter</AppHeader>

        <ContentContainer>
          <ImageUpload />

          <ImageDownload />
        </ContentContainer>
      </AppContainer>
    </ImagesContextProvider>
  );
}

export default App;
