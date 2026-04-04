import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import audioManager from "./audioManager.jsx";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
    setIsPlaying(!isPlaying);
  };

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
            <Link to="/edit-profile" className="user-profile-link">
              <span className="user-greeting">{user.username}</span>
            </Link>
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

        <button
          className="music-toggle"
          onClick={toggleMusic}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
