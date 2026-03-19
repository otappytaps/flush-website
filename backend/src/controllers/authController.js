import User from "../models/User.js";

export async function register(req, res) {
    try {
        const { firstName, lastName, username, email, password, dob } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        const newUser = new User({ 
            firstName, 
            lastName, 
            username, 
            email, 
            password, 
            dob 
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log("User registered:", username);
    } catch (error) {
        console.error("Error in register controller", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful", user });
        console.log("User logged in:", username);
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};