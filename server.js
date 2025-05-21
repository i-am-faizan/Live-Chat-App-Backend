import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(cors({
  origin:['http://localhost:5173'],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
  }));
  
app.use(express.json());


  


mongoose.connect("mongodb://localhost:27017/live-chat-db")
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

 
  
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
