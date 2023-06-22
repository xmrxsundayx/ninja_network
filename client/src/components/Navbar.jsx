import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <h1>Ninja Network</h1>
            <ul>
                <li><a href="#"/>Home</li>
                <li><a href="#"/>My Ninjas</li>
                <li><a href="#"/>Profile</li>
                <li><a href="#"/>Log Out</li>
            </ul>
        </div>
    );
}

export default Navbar;

