import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Articraft. All Rights Reserved.</p>
            <Link to="/help">
                <button className="help-button">Help</button>
            </Link>
        </footer>
    );
};

export default Footer;
