import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AudioManager from "./AudioManager.jsx";

function Navbar({ user, setUser, onFlush, isFlushing }) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      AudioManager.pause();
    } else {
      AudioManager.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLogout = () => {
    localStorage.removeItem("flush_user");
    setUser(null);
    navigate("/");
  };

  const handleFlush = () => {
    onFlush(); 
  };

  return (
    <nav className="navbar">
      <button 
        className={`flush-handle-btn ${isFlushing ? "flushing" : ""}`} 
        onClick={handleFlush}
        title="Flush the feed (Refresh)"
      >
        <span className="handle-icon">🚽</span>
        <span className="handle-text">FLUSH FEED</span>
      </button>
      
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
