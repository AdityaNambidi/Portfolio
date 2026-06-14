// src/Navbar.js
import React, { useEffect, useState } from 'react';
import './styles/Navbar.css';
import {NavReveal} from "./Reveal"

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) 
                setScrolled(true);
            else
                setScrolled(false);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <NavReveal>
        <nav className={"navbar " + (scrolled ? "scrolled": "")}>
            
            <div className="navbar-logo">AN<span>.</span></div>
            <button className="menu-button" onClick={toggleMenu}>
                &#9776; {/* Unicode character for the hamburger menu */}
            </button>
            <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                <li className={ activeLink === 'home' ? 'active' : ""} ><a onClick={ () => { setActiveLink("home"); toggleMenu(); } } href="#home">Home</a></li>
                
                <li className={ activeLink === 'about' ? 'active' : ""} ><a onClick={ () => { setActiveLink("about"); toggleMenu(); } } href="#aboutme">About me</a></li>
                <li className={ activeLink === 'projects' ? 'active' : ""} ><a onClick={ () => { setActiveLink("projects"); toggleMenu(); } } href="#projects">Projects</a></li>
                <li className={ activeLink === 'contact' ? 'active' : ""} ><a onClick={ () => { setActiveLink("contact"); toggleMenu(); } } href="#contact">Contact</a></li>
            </ul>
        </nav>
        </NavReveal>
    );
};

export default NavBar;
