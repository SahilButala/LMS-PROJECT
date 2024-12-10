import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { LoginRegisterProvider } from "./Context/auth/Register";
import { AdminContextProvider } from "./Context/admin/AdminContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeViewContextProvider } from "./Context/Home-View/HomeViewContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginRegisterProvider>
      <AdminContextProvider>
        <HomeViewContextProvider>
          <App />
          <ToastContainer />
        </HomeViewContextProvider>
      </AdminContextProvider>
    </LoginRegisterProvider>
  </BrowserRouter>
);
