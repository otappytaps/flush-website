import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use this for internal links
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="split-container">
      {/* LEFT BRANDING SIDE */}
      <div className="left-panel">
        <div className="brand-content">
          <span className="login-logo"></span>
          <h1 className="brand-title">Flush</h1>
          <p className="brand-text"></p>
        </div>
      </div>

      {/* RIGHT LOGIN SIDE */}
      <div className="right-panel">
        <div className="login-background">
          <div className="login-logo-container">
            <p className="welcome-text">Welcome Back!</p>
          </div>

          <div className="login-form-container">
            <form onSubmit={handleLogin}>
              <h2 className="login-title">Login</h2>

              <div className="form-group">
                <label>Username:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>

              <div className="signup-container">
                <p>
                  Don't have an account?
                  <Link to="/signup"> Sign Up</Link>
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
