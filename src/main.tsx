import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Add proper type checking for the root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Create the root with proper typing
const root = createRoot(rootElement);

// Render with StrictMode for better development experience
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
