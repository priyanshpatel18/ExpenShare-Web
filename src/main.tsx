import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
// axios.defaults.baseURL = "https://expen-share-web-server.vercel.app";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
		<BrowserRouter>
			<App />
			<Toaster />
			<ToastContainer position="bottom-left" autoClose={2000} theme="dark" />
		</BrowserRouter>
);
