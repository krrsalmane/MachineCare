



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = () =>{
    return mongoose.connect(MONGO_URL);
}

export default connectDB