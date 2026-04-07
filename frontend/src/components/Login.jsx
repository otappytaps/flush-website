import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Login.css";
import Error from "./Error";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://flush-website-backend.onrender.com/api/auth/login", //http://localhost:5001
        { username, password, rememberMe },
        { withCredentials: true },
      );

      const data = response.data;

      localStorage.setItem("flush_user", JSON.stringify(data.user));

      setUser(data.user);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      setErrorMessage(message);
      setIsErrorDisplayed(true);
    } finally {
      setIsLoading(false); 
    }
  };

  function closeError() {
    setIsErrorDisplayed(false);
  }

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
                  className={isErrorDisplayed ? "input-error" : ""}
                  onChange={
                    (e) => {
                      setUsername(e.target.value);
                      closeError();
                    }}
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
                  className={isErrorDisplayed ? "input-error" : ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    closeError();
                  }}
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

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="login-signup-container">
              <p>
                Don't have an account?
                <span>
                  <Link to="/signup"> Sign Up</Link>
                </span>
              </p>
              <Error isErrorDisplayed={isErrorDisplayed} error={errorMessage} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
