<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use this for internal links
import "./Login.css";
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use this for internal links
import './Login.css';
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814

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
<<<<<<< HEAD
                  <input
                    type="text"
                    placeholder="Enter username"
=======
                  <input 
                    type="text" 
                    placeholder="Enter username" 
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password:</label>
                <div className="input-icon">
                  <i className="fa-solid fa-lock"></i>
<<<<<<< HEAD
                  <input
                    type="password"
                    placeholder="Enter password"
=======
                  <input 
                    type="password" 
                    placeholder="Enter password" 
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>

<<<<<<< HEAD
              <button type="submit" className="login-btn">
                Login
              </button>

              <div className="signup-container">
                <p>
                  Don't have an account?
=======
              <button type="submit" className="login-btn">Login</button>

              <div className="signup-container">
                <p>Don't have an account? 
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
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

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
