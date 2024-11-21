import { useNavigate } from 'react-router-dom';
import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/map');
    };

    return (
        <div className="home-container">
        <div className="overlay"></div>
        <div className="content">
            <h1 className="title">MindConnect</h1>
            <p className="subtitle">
                Ready to explore mental health resources in King County?
            </p>
            <Link className="cta-button" to="/map">Connect with Us.</Link>
        </div>
        </div>
    );
}
