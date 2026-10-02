import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";
import { seedDefaultUser } from "./src/services/auth.service.js";
import machineRoutes from "./src/routes/machine.routes.js"
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/machines" , machineRoutes)

const PORT = process.env.PORT || 8000;

// Connect Database and Start Server
connectDB().then(async () => {
    console.log("Database connected successfully");
    
    // Seed default admin if no users exist
    await seedDefaultUser();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});
