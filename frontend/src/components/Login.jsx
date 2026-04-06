import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { username, password, rememberMe },
        { withCredentials: true } 
      );

      const data = response.data;

      localStorage.setItem("flush_user", JSON.stringify(data.user));
      
      setUser(data.user);
      navigate("/");
      
    } catch (err) {

      const message = err.response?.data?.message || "Login failed";
      alert(message);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-panel">
        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            <h2 className="login-title">Welcome Back!</h2>

            <div className="login-form-group">
              <label>Username:</label>
              <div className="login-input">
                <FontAwesomeIcon className="login-icon" icon={faUser} />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="login-form-group">
              <label>Password:</label>
              <div className="login-input">
                <FontAwesomeIcon className="login-icon" icon={faLock} />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="login-remember">
              <input 
                type="checkbox" 
                id="remember" 
                name="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <label htmlFor="remember">Remember Me</label>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="login-signup-container">
              <p>
                Don't have an account?
                <span>
                  <Link to="/signup"> Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
