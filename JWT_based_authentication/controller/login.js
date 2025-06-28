import User from "../model/user.js";
import { createToken } from "./TokenController.js";
import {verifyPassword} from "../middleware/hashing.js";



const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email format"});
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid = await verifyPassword(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid password"});
        }
        const token = await createToken(user);
        res.cookie("cookie",token,{maxAge: 3600000, httpOnly: true});

        return res.status(200).json({
            message: "User logged in successfully", 
            user: {
                username: user.username,
                email: user.email,
                type: user.type
            }


    })
    
}
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default loginUser;