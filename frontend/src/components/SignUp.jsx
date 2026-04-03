import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEnvelope,
  faCalendar,
  faCircleQuestion,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
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
      <div className="signup-panel">
        <div className="sign-up-background">
          <div className="sign-up-form-container">
            <form id="signupForm" onSubmit={handleSubmit}>
              <h2 className="sign-up-title">Join the Community!</h2>

              <div className="signup-form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={faCircleUser}
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={faCircleUser}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="username">Username</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={faCircleUser}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="email">Email</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon className="signup-icon" icon={faEnvelope} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="dob">Date of Birth</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon className="signup-icon" icon={faCalendar} />
                  <input
                    type="date"
                    name="dob"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label>
                  Password
                  <span className="signup-tooltip-wrap">
                    <FontAwesomeIcon
                      className="signup-icon"
                      icon={faCircleQuestion}
                    />

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
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="sign-up-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={faSpinner}
                    spin
                  />
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="signup-login-link">
                <p>
                  Already have an account?{" "}
                  <span className="sign-uptologin">
                    <Link to="/login">Log In</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="signup-modal">
          <div className="signup-modal-content">
            <span
              className="signup-close"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h3>Terms & Conditions</h3>
            <p>
              Terms and Conditions for Flush
              <p>
                Welcome to Flush! By signing up and using our platform, you
                agree to the following terms and conditions:
              </p>
              <ul>
                1. **Acceptance of Terms** By accessing and using Flush, you
                agree to comply with these terms. If you do not agree, please do
                not use the service.
                <br></br>
                2. **Account Responsibility** You are responsible for
                maintaining the confidentiality of your account credentials,
                including your username and password. You agree to notify us
                immediately of any unauthorized use.
                <br></br>
                3. **User Conduct** You agree not to engage in any harmful or
                illegal activity on Flush, including but not limited to
                spamming, posting offensive content, or attempting to breach
                security.
                <br></br>
                4. **Content Ownership** All content submitted by users remains
                the property of the user. By submitting content, you grant Flush
                a non-exclusive license to display and distribute it within the
                platform.
                <br></br>
                5. **Privacy** We respect your privacy. Personal information
                collected will be used according to our Privacy Policy and will
                not be shared with third parties without your consent.
                <br></br>
                6. **Modifications** Flush reserves the right to modify these
                Terms and Conditions at any time. Users will be notified of
                significant changes via email or in-app notifications.
                <br></br>
                7. **Termination** Flush may suspend or terminate your account
                if you violate these Terms or engage in behavior that threatens
                the integrity or safety of the platform.
                <br></br>
                8. **Limitation of Liability** Flush is provided "as is" without
                warranties. We are not liable for any damages resulting from the
                use of the platform.
                <br></br>
                9. **Governing Law** These Terms and Conditions are governed by
                the laws of Madagascar. Any disputes shall be resolved in
                accordance with applicable laws.
              </ul>
              By checking "I agree" and signing up, you acknowledge that you
              have read, understood, and agree to these Terms and Conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
