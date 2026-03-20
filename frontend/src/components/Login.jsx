import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("flush_user", JSON.stringify(data.user));
        setUser(data.user); 
        navigate("/"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-split-container">
      {/* LEFT BRANDING SIDE */}
      <div className="login-left-panel">
        <div className="login-brand-content">
          <span className="login-logo"></span>
          <h1 className="login-brand-title"></h1>
          <p className="login-brand-text"></p>
        </div>
      </div>

      {/* RIGHT LOGIN SIDE */}
      <div className="login-right-panel">
        <div className="login-background">
          <div className="login-logo-container">
            <p className="login-welcome-text">Welcome Back!</p>
          </div>

          <div className="login-form-container">
            <form onSubmit={handleLogin}>
              <h2 className="login-title">Login</h2>

              <div className="login-form-group">
                <label>Username:</label>
                <div className="login-input-icon">
                  <i className="login-fa-solid fa-user"></i>
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
                <div className="login-input-icon">
                  <i className="login-fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-remember">
                <input type="checkbox" id="remember" name="remember" />
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
    </div>
  );
}

export default Login;
