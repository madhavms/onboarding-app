import App from "./App";
import React, { StrictMode } from "react";
import {createRoot} from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);