import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import logo from '../assets/logo-no-background.png'

export default function Header() {
    //const auth = useContext(AuthContext)
    const authContext = useAuth()
    
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://kartik-nain.netlify.app/" target="blank">
                            <img src={logo} style={{width: '80px'}} />
                        </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {authContext.isAuthenticated && <Link className="nav-link" to={`/welcome/${authContext.username}`}>Home</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {authContext.isAuthenticated && <Link className="nav-link" to="/todos">To-Dos</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {!authContext.isAuthenticated && <Link className="nav-link" to="/">Home</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!authContext.isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {!authContext.isAuthenticated && <Link className="nav-link" to="/register">Register</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {authContext.isAuthenticated && <Link className="nav-link" onClick={authContext.logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}