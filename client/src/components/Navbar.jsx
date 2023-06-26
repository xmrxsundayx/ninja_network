// import logo from "../images/ninja_network_logo.PNG"
import logo from "../images/trimmed_logo.PNG"
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);

    // this is to get the logged User info

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/logged`, { withCredentials: true })
            .then(res => {
                // show the user returned
                console.log("logged user:" + res.data._id)
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: " + err)
                setUser({})
                navigate('/login');
            });
    }, []);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/api/login')
            })
            .catch(err => console.log(err))
    };

    const handleHome = () => {
        navigate(`/home/${user._id}`)
    }

    return (
        <div className="sticky">
            <nav className="d-flex navbar navbar-expand-lg" style={{ background: "#5F9CB5" }}>
                <div className="container-fluid row-col d-flex justify-content-between">
                    <img
                        src={logo}
                        type="image"
                        className="logo"
                        onClick={handleHome}
                        style={{ cursor: "pointer" }}
                    />
                    {/* Removing Search */}
                    
                    <div className="form-outline input-group mx-auto">
                        
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
                        <i className="fas fa-bell nav-item nav-link"></i>
                        <div className="navbar-nav justify-content-end">
                            <Link to={`/home/${user._id}`} className="nav-item nav-link">
                                Home
                            </Link>
                            <Link to={`/profile/${user._id}`} className="nav-item nav-link">
                                Profile
                            </Link>
                            <Link to={`/myninjas/${user._id}`} className="nav-item nav-link">
                                My Ninjas
                            </Link>
                            <a href="/login" className="nav-item nav-link" onClick={handleLogout}>
                                Log Out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;