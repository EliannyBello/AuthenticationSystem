import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/register.js";
import Login from "../js/pages/login.js"
import Private from "./pages/private.js";
import Home from "./pages/home.js";

function Layout() {
    const isAuthenticated = !!sessionStorage.getItem("token");

    return (

        <Router>
            <Navbar />
            <Routes>
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/private" element={isAuthenticated ? <Private /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default Layout;
