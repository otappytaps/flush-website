import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  // links for anchors to be added later
  return (
    <nav className="navbar">
      <select className="filter">
        <option value="popular">Popular</option>
        <option value="latest">Latest</option>
      </select>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <div className="user-cluster">
        <Link className="login" to="/login">
          Login
        </Link>
        <Link className="signup" to="/signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
