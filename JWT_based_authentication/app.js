import express from "express";
import dotenv from "dotenv";
import loginRouter from "./route/login.js";
import cookieParser from "cookie-parser";
import validateUser from "./middleware/validateUser.js";
import RegisterRouter from "./route/register.js";
import database from "./db_config/databaseConnection.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());
app.use("/api", loginRouter);
app.use("/api", RegisterRouter);


app.get("/", validateUser, (req, res) => {
    res.status(200).json({
        message: "Welcome to the protected route",
        user: req.user // Assuming req.user is set by validateUser middleware
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

