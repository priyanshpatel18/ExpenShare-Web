import axios from "axios";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.js";
import "./index.css";

axios.defaults.baseURL = "https://expen-share-web-server.vercel.app";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
        <Toaster />
        <ToastContainer position="bottom-left" autoClose={2000} theme="dark" />
    </BrowserRouter>
);
