import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="nav-container">
        <Link to="/Register" className="nav-link">
          Register
        </Link>
        <Link to="/Login" className="nav-link">
          Login
        </Link>
        <Link to="/Profile" className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
}
