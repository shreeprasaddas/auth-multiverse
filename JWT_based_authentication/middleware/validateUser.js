import { createToken,verifyToken } from "../controller/TokenController.js";

const validateUser = async (req , res , next) =>{
    const cookie = req.cookies.cookie;

    const isValidToken = await verifyToken(cookie);
    console.log("Token verification result:", isValidToken);

    if(isValidToken){
        console.log("User is authenticated");
        next()
    }
    else{
        console.log("User is not authenticated");
        return res.status(401).json({
            message: "User is not authenticated"
        });
    }
}

export default validateUser;
