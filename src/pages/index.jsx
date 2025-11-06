import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Listado from "../pages/Listado.jsx";
import Registro from "../pages/Registro.jsx";
import Gafete from "../pages/Gafete.jsx";


export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/listado", element: <Listado /> },
  { path: "/registro", element: <Registro /> },
  { path: "/gafete/:id", element: <Gafete /> }

]);
