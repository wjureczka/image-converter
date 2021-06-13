import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./wasm/webp";
import "./wasm/pdf";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorkerRegistration.register();
