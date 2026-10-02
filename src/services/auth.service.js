import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1. Create Default Admin if no users exist
export const seedDefaultUser = async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        const hashedPassword = await bcrypt.hash("admin1234", 10);
        await User.create({
            firstName: "Admin",
            lastName: "System",
            email: "admin@machinecare.com",
            password: hashedPassword
        });
        console.log("Default user created: admin@machinecare.com / admin1234");
    }
};

// 2. Register New User
export const registerUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;

    if (!firstName || !lastName || !email || !password) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 8) {
        const error = new Error("Password must contain at least 8 characters");
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword
    });

    const savedUser = await user.save();

    return {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email
    };
};