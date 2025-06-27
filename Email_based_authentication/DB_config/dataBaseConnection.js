import mongo from 'mongoose';


const MONGO_URI  = "mongodb://localhost:27017/mydatabase"; // Default to local MongoDB if no URI is provided

const database = mongo;


await database.connect(MONGO_URI).then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error);
});


export default database;