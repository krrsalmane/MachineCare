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