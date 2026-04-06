import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function getPasswordStrength(val) {
  if (!val) return { score: 0, label: "", color: "", width: "0%" };

  const hasLength = val.length >= 8;
  const hasUpper = /[A-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);
  const score = [hasLength, hasUpper, hasNumber, hasSpecial].filter(
    Boolean,
  ).length;

  if (score <= 1)
    return {
      score,
      label: "Weak",
      color: "#dc3545",
      width: "25%",
      hasLength,
      hasUpper,
      hasNumber,
      hasSpecial,
    };
  if (score === 2)
    return {
      score,
      label: "Fair",
      color: "#fd7e14",
      width: "50%",
      hasLength,
      hasUpper,
      hasNumber,
      hasSpecial,
    };
  if (score === 3)
    return {
      score,
      label: "Good",
      color: "#ffc107",
      width: "75%",
      hasLength,
      hasUpper,
      hasNumber,
      hasSpecial,
    };
  return {
    score,
    label: "Strong",
    color: "#28a745",
    width: "100%",
    hasLength,
    hasUpper,
    hasNumber,
    hasSpecial,
  };
}

function validate(name, value, formData) {
  if (!value.trim()) return "invalid";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "invalid";
  if (name === "password" && value.length < 8) return "invalid";
  if (name === "confirmPassword" && value !== formData.password)
    return "invalid";
  if (name === "dob" && new Date(value) > new Date()) return "invalid";
  return "valid";
}

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

  const [fieldStates, setFieldStates] = useState({});

  const [shakeFields, setShakeFields] = useState({});

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldStates((prev) => ({ ...prev, [name]: "idle" }));
    setShakeFields((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      const result = validate(name, value, formData);
      setFieldStates((prev) => ({ ...prev, [name]: result }));
      if (result === "invalid") {
        setShakeFields((prev) => ({ ...prev, [name]: false }));
        requestAnimationFrame(() =>
          setShakeFields((prev) => ({ ...prev, [name]: true })),
        );
      }
    },
    [formData],
  );

  const triggerShake = (name) => {
    setFieldStates((prev) => ({ ...prev, [name]: "invalid" }));
    setShakeFields((prev) => ({ ...prev, [name]: false }));
    requestAnimationFrame(() =>
      setShakeFields((prev) => ({ ...prev, [name]: true })),
    );
  };

  const inputClass = (name) => {
    const state = fieldStates[name] || "idle";
    const shake = shakeFields[name] ? " shake" : "";
    if (state === "valid") return "valid" + shake;
    if (state === "invalid") return "invalid" + shake;
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert("You must agree to the Terms & Conditions to sign up.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      triggerShake("confirmPassword");
      return;
    }
    if (new Date(formData.dob) > new Date()) {
      triggerShake("dob");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://flush-website-backend.onrender.com/api/auth/register",
        {
          //http://localhost:5001
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Account created! You can now login.");
        navigate("/login");
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
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    required
                    className={inputClass("firstName")}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    required
                    className={inputClass("lastName")}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required
                    className={inputClass("username")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="email">Email</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon className="signup-icon" icon={faEnvelope} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    className={inputClass("email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <label htmlFor="dob">Date of Birth</label>
                <div className="signup-input-icon">
                  <FontAwesomeIcon className="signup-icon" icon={faCalendar} />
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    className={inputClass("dob")}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                        <li className={strength.hasLength ? "met" : ""}>
                          At least 8 characters
                        </li>
                        <li className={strength.hasUpper ? "met" : ""}>
                          One uppercase letter
                        </li>
                        <li className={strength.hasNumber ? "met" : ""}>
                          One number
                        </li>
                        <li className={strength.hasSpecial ? "met" : ""}>
                          One special character
                        </li>
                      </ul>
                    </div>
                  </span>
                </label>
                <div className="signup-input-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    className={inputClass("password")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                {formData.password && (
                  <div className="signup-strength-wrap">
                    <div className="signup-strength-bar-track">
                      <div
                        className="signup-strength-bar"
                        style={{
                          width: strength.width,
                          backgroundColor: strength.color,
                          transition: "width 0.3s, background-color 0.3s",
                        }}
                      />
                    </div>
                    <span
                      className="signup-strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="signup-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="signup-input-icon">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    required
                    className={inputClass("confirmPassword")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FontAwesomeIcon
                    className="signup-icon"
                    icon={showConfirm ? faEyeSlash : faEye}
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <div className="signup-form-group signup-terms-row">
                <label className="signup-terms-label">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  I agree to the{" "}
                  <span
                    className="signup-terms-link"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Terms &amp; Conditions
                  </span>
                </label>
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
        <div className="signup-modal" onClick={() => setIsModalOpen(false)}>
          <div
            className="signup-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="signup-close"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h3>Terms &amp; Conditions</h3>
            <p>
              Welcome to Flush! By signing up and using our platform, you agree
              to the following terms and conditions:
            </p>
            <ol>
              <li>
                <strong>Acceptance of Terms</strong> — By accessing and using
                Flush, you agree to comply with these terms. If you do not
                agree, please do not use the service.
              </li>
              <li>
                <strong>Account Responsibility</strong> — You are responsible
                for maintaining the confidentiality of your account credentials,
                including your username and password. You agree to notify us
                immediately of any unauthorized use.
              </li>
              <li>
                <strong>User Conduct</strong> — You agree not to engage in any
                harmful or illegal activity on Flush, including but not limited
                to spamming, posting offensive content, or attempting to breach
                security.
              </li>
              <li>
                <strong>Content Ownership</strong> — All content submitted by
                users remains the property of the user. By submitting content,
                you grant Flush a non-exclusive license to display and
                distribute it within the platform.
              </li>
              <li>
                <strong>Privacy</strong> — We respect your privacy. Personal
                information collected will be used according to our Privacy
                Policy and will not be shared with third parties without your
                consent.
              </li>
              <li>
                <strong>Modifications</strong> — Flush reserves the right to
                modify these Terms and Conditions at any time. Users will be
                notified of significant changes via email or in-app
                notifications.
              </li>
              <li>
                <strong>Termination</strong> — Flush may suspend or terminate
                your account if you violate these Terms or engage in behavior
                that threatens the integrity or safety of the platform.
              </li>
              <li>
                <strong>Limitation of Liability</strong> — Flush is provided "as
                is" without warranties. We are not liable for any damages
                resulting from the use of the platform.
              </li>
              <li>
                <strong>Governing Law</strong> — These Terms and Conditions are
                governed by the laws of Madagascar. Any disputes shall be
                resolved in accordance with applicable laws.
              </li>
            </ol>
            <p>
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
