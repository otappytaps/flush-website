import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  // links for anchors to be added later

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("flush_user"); 
    setUser(null);                         
    navigate("/");                    
  };

  return (
<nav className="navbar">
      <select className="filter">
        <option value="popular">Popular</option>
        <option value="latest">Latest</option>
      </select>
      
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>

      <div className="user-cluster">
        {user ? (
          <>
            <span className="user-greeting">{user.username}</span>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="login" to="/login">
              Login
            </Link>
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
