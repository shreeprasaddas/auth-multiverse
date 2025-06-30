import mongoose from "mongoose";


const database = mongoose;

await database.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error);
}); 


export default database;