import "./index.css"; // <-- first import

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import React from "react";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
