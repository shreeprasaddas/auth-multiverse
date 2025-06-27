import database from "../DB_config/dataBaseConnection.js";


const userSchema = new database.Schema({
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    otp: {type:String, required:false},
    otpExpires: {type:Date, required:false},
    isVerified: {type:Boolean, default:false},
    createdAt: {type:Date, default:Date.now}
});

const User = database.model('User', userSchema);
export default User;