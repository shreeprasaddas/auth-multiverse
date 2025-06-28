import User from "../model/user.js";
import {hashPassword} from "../middleware/hashing.js";

const registerUser = async (req, res) => {
    const {username, email, password, type} = req.body;

    if (!username || !email || !password || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const isUserExists = await User.findOne({email});

        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = (await hashPassword(password)).hash.toString();
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            type
        })

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export default registerUser;