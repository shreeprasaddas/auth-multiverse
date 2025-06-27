import crypto from 'crypto';
import User from '../model/user.js'; // Assuming you have a User model defined
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
const sendOtpEmail = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });
    if (user && user.otpExpires < Date.now() && !user.isVerified) {
        return res.status(400).json({ message: "OTP already sent, please wait for it to expire" });
    }

    const otp = generateOtp();
    user = new User({
        email,
        password,
        otp: otp,
        otpExpires: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
        isVerified: false
    });
    await user.save();

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
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return res.status(500).json({ message: "Failed to send OTP email" });
    }
}


// verify OTP function
const verifyOtp = async (req,res)=>{
  
    const {email, Otp} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    if(user.otp !== Otp){
        console.log(user.otp, Otp);
        return res.status(400).json({message:"Invalid OTP"});
    }

    if(!email || !Otp){
        return res.status(400).json({message: "Email and OTP are required"});
    }
    if(user.otpExpires < Date.now()){
        return res.status(400).json({message: "OTP has expired"});
    }
    user.isVerified = true;
    user.otp = null; // Clear OTP after verification
    user.otpExpires = null; // Clear OTP expiration time    
    await user.save();
    return res.status(200).json({message: "OTP verified successfully"});

}

export {sendOtpEmail, verifyOtp};