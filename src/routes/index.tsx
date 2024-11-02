import { Navigate } from "react-router-dom";

// Pages

import Home from "../pages/Home/Home";

const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
]; 

export { publicRoutes };
