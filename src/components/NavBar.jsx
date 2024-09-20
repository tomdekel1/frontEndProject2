import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth.context';
import { useState } from 'react';

function NavBar(props) {
    const { user } = useAuth()
    const [collapse, setCollapse] = useState(true)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ background: "var(--navbar-bg)", }}>
            <div className="container-fluid" style={{ color: "var(--text-color)" }} >
                <Link to="/" className="navbar-brand">
                    cardX
                </Link>
                {props.darkMode()}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span onClick={() => setCollapse(!collapse)} className="navbar-toggler-icon"></span>
                </button>
                <div className={collapse ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-item btn" style={{ textDecoration: "none", color: "var(--text-color)" }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/About" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                About
                            </Link>
                        </li>

                        {user && user.isBusiness ?
                            <>
                                <li className="nav-item">
                                    <Link to="/myCards" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                        My Cards
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/createCard" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }}>
                                        Create Card
                                    </Link>
                                </li>
                            </>
                            : null
                        }

                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/LogOut" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                        Log Out
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/favorites" className="nav-item btn mx-5 " style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                        favorites
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/Login" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }}>
                                        Log In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Signup" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                        Sign Up
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signUpBiz" className="nav-item btn mx-5" style={{ textDecoration: "none", color: "var(--text-color)" }} >
                                        Sign Up business
                                    </Link>
                                </li>
                            </>
                        )
                        }
                    </ul>
                    <form className="d-flex">
                        <input onInput={(e) => props.setSearch(e.target.value)} className="form-control " type="search" placeholder="Search" aria-label="Search" style={{ background: "linear-gradient(0.25turn, #ae7feb, #BDE8CA, #1ce4d3)" }} />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;