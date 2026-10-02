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

// 3. Login User
export const loginUser = async (email, password) => {
    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { userId: user._id.toString() },
        process.env.JWT_SECRET || "machinecare_jwt_secret_key",
        { expiresIn: "1d" }
    );

    return {
        message: "Login successful",
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    };
};

// 4. Update Profile
export const updateUserProfile = async (userId, updateData) => {
    const { firstName, lastName, email, password } = updateData;

    const user = await User.findById(userId).select("+password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            const error = new Error("Email already registered");
            error.statusCode = 400;
            throw error;
        }
        user.email = email.toLowerCase();
    }
    if (password) {
        if (password.length < 8) {
            const error = new Error("Password must contain at least 8 characters");
            error.statusCode = 400;
            throw error;
        }
        user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
};