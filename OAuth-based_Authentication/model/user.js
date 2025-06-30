import e from "express";
import databaseConnection from "../db_config/databaseConnection.js";

const User = databaseConnection.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = databaseConnection.model("User", User);   

export default UserModel;