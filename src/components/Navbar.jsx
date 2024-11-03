export function Navbar() {
    return (
        <nav className="navbar">
        <div className="logo">
            Logo <br />
            <span className="logo-text">(with Picture)</span>
        </div>
        <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/map">Map</a></li>
            <li><a href="/quiz">Quiz</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
    )
}