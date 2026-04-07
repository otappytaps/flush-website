import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultPfp from "../assets/default-pfp.png";
import axios from "axios";
import "./EditProfile.css";
import Popup from "./Popup";

function EditProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [alertPopup, setAlertPopup] = useState({ open: false, success: false, message: "" });

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    about: user?.about || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setPasswordError("");

    try {
      const response = await axios.put(
        `https://flush-website-backend.onrender.com/api/users/${user._id}`, //http://localhost:5001
        formData,
        { withCredentials: true },
      );

      const data = response.data;

      setUser(data.user);
      setAlertPopup({ open: true, success: true, message: "Profile updated successfully!" });
    } catch (err) {
      let errorMsg = "An error occurred while updating.";
  
      if (err.response) {
        errorMsg = err.response.data.message || errorMsg;
      } else if (err.request) {
        errorMsg = "The server is clogged! No response received. 📶";
      }
      
      setAlertPopup({ open: true, success: false, message: errorMsg });
    }
  };

  if (!user) {
    return (
      <div className="edit-main-container">
        <h1 style={{ color: "white" }}>Loading profile...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="edit-main-container">
        <div className="edit-forms-box">
          <div className="edit-sidebar">
            <div className="pfp-container">
              <img
                id="edit-pfp"
                src={
                  user.pfp && user.pfp !== ""
                    ? `https://flush-website-backend.onrender.com${user.pfp}`
                    : defaultPfp
                }
                alt="Profile"
              />
            </div>
            <h3 className="sidebar-user-name">
              {user.firstName} {user.lastName}
            </h3>
            <p className="sidebar-user-email">{user.email}</p>
          </div>

          <div className="edit-main-content">
            <h2 className="edit-title">Account Settings</h2>

            <form className="edit-form" onSubmit={handleSubmit}>
              <div className="edit-form-row">
                <div className="edit-form-grp">
                  <label className="edit-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="edit-input"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-grp">
                  <label className="edit-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="edit-input"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-form-row">
                <div className="edit-form-grp">
                  <label className="edit-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="edit-input"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-grp">
                  <label className="edit-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="edit-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-form-row">
                <div className="edit-form-grp">
                  <label className="edit-label">New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="edit-input"
                    placeholder="Leave blank to keep current"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-grp">
                  <label className="edit-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="edit-input"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {passwordError && (
                    <span style={{ color: "red", fontSize: "11px", marginTop: "-6px" }}>{passwordError}</span>
                  )}
                </div>
              </div>

              <div className="edit-form-grp">
                <label className="edit-label">About Me</label>
                <textarea
                  name="about"
                  className="edit-textarea"
                  rows="4"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="edit-form-buttons">
                <button type="submit" className="edit-save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="edit-cancel-btn"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="edit-home-btn"
                  onClick={handleBackToHome}
                >
                  Back to Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Popup open={alertPopup.open} onClose={() => {
        setAlertPopup({ ...alertPopup, open: false });
        if (alertPopup.success) navigate("/");
        }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", height: "100%", gap: "16px", padding: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "48px" }}>{alertPopup.success ? "🧻" : "💩"}</span>
          <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>{alertPopup.message}</p>
          <button
            onClick={() => {
              setAlertPopup({ ...alertPopup, open: false });
              if (alertPopup.success) navigate("/");
            }}
            style={{ padding: "10px 24px", borderRadius: "20px", border: "none",
              background: alertPopup.success ? "#38b6ff" : "#e74c3c",
              color: "white", fontWeight: 700, cursor: "pointer" }}>
            {alertPopup.success ? "Flushing!" : "Try again"}
          </button>
        </div>
      </Popup>
    </>
  );
}

export default EditProfile;
