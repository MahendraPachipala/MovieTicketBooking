import express from "express";
import mongoose from "mongoose";
import { Register,Login } from "./controllers/UserCont.js";
import cors from "cors"; 
import dotenv from 'dotenv';
import { getAllMovies,insertMovie,getoneMovie } from "./controllers/Moviecont.js";
import cookieParser from "cookie-parser";
import { insertTheaterdata,updateMovieData,getAlltheaters } from "./controllers/Theatercont.js";
import { BookSeats,getBooked } from "./controllers/Bookingcont.js";
import { sendEmail,verifyCode } from "./controllers/ForgotCont.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Register Route
app.post('/api/auth/register', async (req, res) => {
  Register(req, res);
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    Login(req,res);
});


//getmovie route;
app.get('/api/movies',async(req,res)=>{
  getAllMovies(req,res);
})

//post Movie route;
app.post('/api/movies',async(req,res)=>{
  insertMovie(req,res)
})

//Get one Movie route;
app.get("/api/Aboutmovie/:id",async(req,res)=>{
  getoneMovie(req,res);
})

//post Theater data route;
app.post("/api/theater",async(req,res)=>{
  insertTheaterdata(req,res);
})

//updatae movies in theater schema
app.post("/api/updatemovie/:id",async(req,res)=>{
  updateMovieData(req,res);
})

//get all theaters
app.get("/api/getalltheaters",async(req,res)=>{
   getAlltheaters(req,res);
})

//post tickets data
app.post("/api/booktickets",async(req,res)=>{
  BookSeats(req,res);
})

//Get all booked data
app.post("/api/getbooked",async(req,res)=>{
  getBooked(req,res);
})


//Email verification api
app.post("/api/verifyemail",async(req,res)=>{
   sendEmail(req,res);
})

app.post("/api/verifyCode",async(req,res)=>{
  verifyCode(req,res);
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
