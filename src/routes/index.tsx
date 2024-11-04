import { Navigate } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";

const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
    { path: "/cart", component: <Cart /> },
]; 

export { publicRoutes };