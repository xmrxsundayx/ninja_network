import React, { useState } from "react";
// import logo from "../images/ninja_network_logo.PNG"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const navigate = useNavigate();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/login')
    })
        .catch(err => console.log(err)) 
    };

    return (
        <div className="sticky">
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{
                    background: "#0389C9"
                }}
            >
                <div className="ms-5 container-fluid row-col d-flex align-items-center">
                    <a href="/" className="navbar-brand">
                        <h3>
                            <u className="text-white">NINJA NETWORK</u>
                        </h3>
                    </a>
                    <div className="form-outline input-group">
                        <input type="search" id="form1" placeholder="Search" 
                        style={{
                            width: "15%",
                            backgroundColor: "#1D95CF",
                            border: "none",
                        }} />
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    {/* ********************** */}
                    {/* if we want to add a logo, we can save the image in the image file and upload it here. Make sure to uncomment the import for the logo as well. */}
                    {/* <img src={logo} height="28" alt="ninja_logo"/> */}
                    {/* *********************** */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleCollapse}
                        aria-expanded={!isCollapsed}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}>
                        <div className="navbar-nav me-5">
                            <a href="/home" className="nav-item nav-link">
                                Home
                            </a>
                            <a href="/profile" className="nav-item nav-link">
                                Profile
                            </a>
                            <a href="/myninjas" className="nav-item nav-link">
                                My Ninjas
                            </a>
                            <a href="login" className="nav-item nav-link" onClick={handleLogout}>
                                Log Out
                            </a>
                        </div>
                        <div className="navbar-nav ">
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;