import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/database.js";



const app = express();
dotenv.config();


const PORT = process.env.PORT || 7000 ;
const MONGO_URL = process.env.MONGO_URL;



connectDB().then(() => {

    console.log("It's connected");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((error) => {
    console.log(error);
});




