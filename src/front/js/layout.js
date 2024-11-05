import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "../components/Auth/Signup";
import Login from "../js/pages/login.js"
import Private from "../components/Auth/Private";

function AppRouter() {
    const isAuthenticated = !!sessionStorage.getItem("token");

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/private" element={isAuthenticated ? <Private /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
