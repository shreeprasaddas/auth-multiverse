import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";        
import dotenv from "dotenv";

dotenv.config();

const GoogleStrategy =
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.ID,
            clientSecret: process.env.SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            
            cb(null, profile);

        }


    );


passport.serializeUser(function (user, cb) {
    cb(null, user);
}); 

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
}   );

export default GoogleStrategy;