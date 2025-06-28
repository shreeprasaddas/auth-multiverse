import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const createToken =async (user) => {
    const token = await jjwt.sign(
        {email:user.email,password:user.password},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )

    return token;
}

const verifyToken = async (token) => {
    try {
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
        return verifiedToken;
    } catch (error) {   
        console.error("Token verification failed:", error);
        return false;
    }

}

export { createToken, verifyToken };


