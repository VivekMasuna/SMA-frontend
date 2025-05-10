import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { AuthContext } from "../utils/authContext";
import "./styles/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
            });
            logout(); // Clear from context
            navigate("/login");
            // window.location.reload();
        } catch (err) {
            console.error("Logout failed:", err.message || err);
        }
    };

    return (
        <header className="header">
            <div className="navbar">
                <a href="/" className="logo">
                    <img src="/kjsieit-logo.svg" alt="logo" />
                </a>

                <div className="hamburger-container">
                    <Hamburger size={24} toggled={isOpen} toggle={setIsOpen} direction="left" />
                </div>

                <nav className={isOpen ? "nav-menu open" : "nav-menu"}>
                    <ul onClick={() => setIsOpen(false)}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        {user && <li><a href="/exp">Experiments</a></li>}
                        {!user ? (
                            <li><a href="/login" className="btns">Login</a></li>
                        ) : (
                            <li><a className="btns" onClick={handleLogout}>Logout</a></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
