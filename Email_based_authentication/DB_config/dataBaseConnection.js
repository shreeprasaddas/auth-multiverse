import mongo from 'mongoose';

const { MONGO_URI } = process.env;

const database = mongo;


await database.connect(MONGO_URI).then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error);
});


export default database;