import React from "react";
// import logo from "../images/ninja_network_logo.PNG"

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a href="/" class="navbar-brand">
                        <h1><u>NINJA NETWORK</u></h1>
                        {/* ********************** */}
                        {/* if we want to add a logo, we can save the image in the image file and upload it here. Make sure to uncomment it import for the logo as well. */}
                        {/* <img src={logo} height="28" alt="ninja_logo"/> */}
                        {/* *********************** */}
                    </a>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav">
                            <a href="/home" class="nav-item nav-link active">Home</a>
                            <a href="/profile" class="nav-item nav-link">Profile</a>
                            <a href="/myninjas" class="nav-item nav-link">My Ninjas</a>
                        </div>
                        <div class="navbar-nav ms-auto">
                            <a href="login" class="nav-item nav-link">Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

