import { Link, NavLink } from "react-router-dom"
import { Dropdown } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth"

export function Navbar({user}) {

    const auth = getAuth();

    function signOut() {
        signOut(auth)
            .catch((err) => {
                console.log(err);
            })
    }

    return (    
        <nav className="navbar">
            <Link to="/">
                <div className="logo">
                    <img src="/img/logo.png" alt="Logo" className="logo-image" />
                </div>
            </Link>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/about">About</Link></li>
            {user ? <li><Link to="/user">Profile</Link></li> : <li><Link to="login">Login</Link></li>}
        </ul>
        <div className="hamburger-nav">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <span className="material-icons">&#xE5D2;</span> {}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/">Home</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/resources">Resources</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/map">Map</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/quiz">Quiz</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/about">About</Dropdown.Item>
                        {user ? (
                            <Dropdown.Item as={NavLink} to="/user">Profile</Dropdown.Item>
                        ) : (
                            <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                        )}
                        {user && (
                            <Dropdown.Item as={NavLink} to="/" onClick={signOut}>Sign-Out</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
    </nav>
    )
}