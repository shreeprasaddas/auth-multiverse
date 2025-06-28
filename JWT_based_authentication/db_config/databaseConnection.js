import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/mydatabase";
const database = mongoose;


await database.connect(DB_URL).then(()=>{
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error);
});


export default database;
