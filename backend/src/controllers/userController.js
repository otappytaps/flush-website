import User from "../models/User.js";
import bcrypt from "bcrypt"; 

export async function updateUser(req, res) {
  try {
    const updateData = { ...req.body };

    if (!updateData.password || updateData.password.trim() === "") {
      delete updateData.password;
      delete updateData.confirmPassword; 
    } else {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
      delete updateData.confirmPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        returnDocument: "after", 
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }
    console.error("Error in updateUser controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getUserByUsername(req, res) {
  try {
    const { username } = req.params;
    // We search the 'username' field in the database
    const user = await User.findOne({ username: username }); 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};