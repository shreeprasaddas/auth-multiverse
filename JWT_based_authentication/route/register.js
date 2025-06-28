import register from "../controller/register.js";
import express from "express";

const RegisterRouter = express.Router();


RegisterRouter.post("/register", async (req, res) => {
    try {
        await register(req, res);
    } catch (error) {
        console.error("Error in register route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default RegisterRouter;