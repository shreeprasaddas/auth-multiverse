
import exrpess from "express";
import { sendOtpEmail, verifyOtp} from "../controller/authController.js";



const router = exrpess.Router();


router.post("/send-otp", sendOtpEmail);
router.post("/verify-otp", verifyOtp);


export default router;





