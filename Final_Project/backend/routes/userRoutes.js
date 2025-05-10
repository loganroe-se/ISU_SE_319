const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/create", async (req, res) => {
    const { username, email, password } = req.body;

    // Ensure valid inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already in use." });
        }

        // Create the new user
        const newUser = new User({
            username,
            email,
            password,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ 
            email: savedUser.email, 
            username: savedUser.username, 
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Ensure valid inputs
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Find the user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username." });
        }

        // Check passwords
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password." })
        }

        res.status(200).json({ 
            message: "Login was successful.",
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

// Get all users
router.get("/", async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
});

// Get a user by email
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message });
    }
});

// Delete a user by email
router.delete("/:email", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted", email: req.params.email });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
});

// Update a user by email
router.put("/:email", async (req, res) => {
    const { username, password } = req.body;

    // Make sure the input is valid
    if (!username && !password) {
        return res.status(400).json({ message: "At least one field (username or password) must be provided. "});
    }

    try {
        const updates = {};
        if (username) updates.username = username;
        if (password) updates.password = password;

        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            { $set: updates },
            { new: true } // Returns the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove passwrod from the return object
        const updatedUserObj = updatedUser.toObject();
        delete updatedUserObj.password;

        res.status(200).json(updatedUserObj);
    } catch (err) {
        res.status(500).json({ message: "Error updated user", error: err.message });
    }
});

module.exports = router;