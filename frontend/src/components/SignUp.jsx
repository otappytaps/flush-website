import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), 
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created! You can now login.");
    } else {
      alert(data.message); 
    }
  } catch (err) {
    console.error("Sign up failed:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="signup-page-root">
      <div className="signup-left-panel">
        <div className="signup-brand-content">
          
          <h1 className="signup-brand-title"></h1>
        </div>
      </div>

      <div className="signup-right-panel">
        <div className="sign-up-background">
          <div className="sign-up-logo-container">
            <p className="welcome-text">Welcome to Flush!</p>
          </div>

          <div className="sign-up-form-container">
            <form id="signupForm" onSubmit={handleSubmit}>
              <h2 className="sign-up-title">Sign Up</h2>

              <div className="signup-form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-user"></i>
                  <input type="text" name="firstName" placeholder="Enter first name" required onChange={handleChange} />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-user"></i>
                  <input type="text" name="lastName" placeholder="Enter last name" required onChange={handleChange} />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="username">Username</label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-circle-user"></i>
                  <input type="text" name="username" placeholder="Enter username" required onChange={handleChange} />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="email">Email</label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="dob">Date of Birth</label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-calendar"></i>
                  <input type="date" name="dob" required onChange={handleChange} />
                </div>
              </div>

              <div className="signup-form-group">
                <label>
                  Password
                  <span className="signup-tooltip-wrap">
                    <i className="fa-solid fa-circle-question tooltip-icon"></i>
                    <div className="tooltip-box">
                      <p className="tooltip-title">Password must have:</p>
                      <ul>
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                      </ul>
                    </div>
                  </span>
                </label>
                <div className="signup-input-icon">
                  <i className="fa-solid fa-lock"></i>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Enter password" 
                    required 
                    onChange={handleChange} 
                  />
                  <i 
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`} 
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              <button type="submit" className="sign-up-btn" disabled={isLoading}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Sign Up"}
              </button>

              <div className="signup-login-link">
                <p>Already have an account? <span className="sign-uptologin"><Link to="/login">Log in</Link></span></p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="signup-modal">
          <div className="signup-modal-content">
            <span className="signup-close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h3>Terms & Conditions</h3>
            <p>Welcome to Flush! By signing up, you agree to our terms...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;