import express from "express";
import passport from "passport";
import GoogleAuth from "./Controller/googleOauth.js"// Import the Google OAuth strategy configuration

const app = express();

app.use(passport.initialize());
app.use(GoogleAuth)



app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
}   );  