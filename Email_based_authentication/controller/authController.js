import crypto from 'crypto';

import nodemailer from 'nodemailer';


// email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"mrpyaj1@gmail.com",
        pass:"galh fkuo pfty lxpx"
    }
})


// Function to generate OTP
const generateOtp = ()=>{
    return crypto.randomInt(100000, 999999).toString();
}

// Function to send OTP email
const sendOtpEmail = async (req,res)=>{
    const {email, password,UserOtp} = req.body;

    user = await User.findOne({email});
    if(!email || !password || !UserOtp){
        return res.status(400).json({message: "Email, password, and OTP are required"});
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email format"});
    }
    if(email){
        res.status(400).json({message: "Email already exists"});
    }
    user = new User({
        email,
        password,
        otp: UserOtp,
        otpExpires: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
        isVerified: false
    });
    await user.save();

    const otp = generateOtp();
    const mailOptions = {
        from: 'mrpyaj1@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.      
        Please do not share it with anyone.`
    };  
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');   
        return true;  
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
        
        
    }
}

sendOtpEmail("shreepsd2@gmail.com");

// verify OTP function
const verifyOtp = async (req,res)=>{
  
    const {email, UserOtp} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    if(user.otp !== UserOtp){
        return res.status(400).json({message:"Invalid OTP"});
    }

    if(!email || !UserOtp){
        return res.status(400).json({message: "Email and OTP are required"});
    }
    
}

export {sendOtpEmail, verifyOtp};