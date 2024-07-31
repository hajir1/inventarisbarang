import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "./style/customize.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LihaAlatPage from "./pages/LihatAlatPage";
import TambahAlatPage from "./pages/TambahAlatPage";
import AlatDipakai from "./pages/AlatDipakai";
import DetailAlatPage from "./pages/DetailAlatPage";
import ServicePage from "./pages/ServiceAlatPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/lihatalat",
    element: <LihaAlatPage />,
  },
  {
    path: "/lihatalat/:id",
    element: <DetailAlatPage />,
  },
  {
    path: "/tambahalat",
    element: <TambahAlatPage />,
  },
  {
    path: "/alatdipakai",
    element: <AlatDipakai />,
  },
  {
    path: "/alatdiservice",
    element: <ServicePage/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes}></RouterProvider>
);
