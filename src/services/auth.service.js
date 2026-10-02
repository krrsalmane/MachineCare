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