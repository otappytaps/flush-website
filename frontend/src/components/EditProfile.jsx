import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultPfp from "../assets/default-pfp.png";
import "./EditProfile.css";

function EditProfile({ user, setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    about: user?.about || ""
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
      return alert("Passwords do not match!");
    }

    try {
      const response = await fetch(`http://localhost:5001/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("flush_user", JSON.stringify(data.user));
        setUser(data.user);
        alert("Profile updated successfully!");
        navigate("/");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating.");
    }
  };

  if (!user) {
    return (
      <div className="edit-main-container">
        <h1 style={{color: "white"}}>Loading profile...</h1>
      </div>
    );
  }

  return (
    <div className="edit-main-container">
      <div className="edit-forms-box">
        <div className="edit-sidebar">
          <div className="pfp-container">
            <img 
                id="edit-pfp" 
                src={user.pfp ? `http://localhost:5001${user.pfp}` : defaultPfp} 
                alt="Profile" 
                />
                <button id="edit-change-pfp-btn" title="Change Photo" type="button">
                Edit
                </button>
            </div>
          <h3 className="sidebar-user-name">{user.firstName} {user.lastName}</h3>
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
              <button type="submit" className="edit-save-btn">Save Changes</button>
              <button type="button" className="edit-cancel-btn" onClick={() => navigate("/")}>
                Cancel
              </button>
              <button type="button" className="edit-home-btn" onClick={handleBackToHome}>
                Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;