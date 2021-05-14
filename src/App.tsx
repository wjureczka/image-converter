import React from "react";
import styled from "@emotion/styled";
import ImageUpload from "./components/ImageUpload";
import ImageDownload from "./components/ImageDownload";
import { ImagesContextProvider } from "./context/ImagesContext";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: var(--margin-xl);
  margin-right: var(--margin-xl);
`;

const AppHeader = styled.h1`
  font-size: var(--font-size-h1);
  margin-top: var(--margin-xl);
`;

const ContentContainer = styled.div`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-gap: var(--margin-xxl);
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
