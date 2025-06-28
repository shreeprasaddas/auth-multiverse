import express from "express";
import loginUser from "../controller/login.js";
import validateUser from "../middleware/validateUser.js";


const LoginRouter = express.Router();


LoginRouter.post("/login", async (req, res) => {

    try {
        await loginUser(req, res);
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

export default LoginRouter;


