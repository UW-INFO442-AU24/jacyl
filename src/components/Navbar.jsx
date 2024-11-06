import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar">
        <div className="logo">
            Logo <br />
            <span className="logo-text">(with Picture)</span>
        </div>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
    )
}