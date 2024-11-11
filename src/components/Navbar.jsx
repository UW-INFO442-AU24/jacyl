import { Link } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"

export function Navbar({user}) {

    const auth = getAuth();

    function signout() {
        signOut(auth)
            .catch((err) => {
                console.log(err);
            })
        }

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
            {user ? <li><Link to="/" onClick={signout}>Logout</Link></li> : <li><Link to="login">Login</Link></li>}
        </ul>
    </nav>
    )
}