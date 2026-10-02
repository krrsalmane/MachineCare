import { registerUser, loginUser, updateUserProfile } from "../services/auth.service.js";

// Register
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        // req.user is set by authMiddleware
        res.status(200).json({
            user: {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                createdAt: req.user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const updatedUser = await updateUserProfile(req.user._id, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
};