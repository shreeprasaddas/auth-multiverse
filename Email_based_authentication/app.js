import express from 'express';
import database from './DB_config/dataBaseConnection.js';
import authRouter from './router/authRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use('/api/auth', authRouter);



app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
 
})