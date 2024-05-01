// controllers/movieController.js
import mongoose from "mongoose";
import { Movie } from "../models/Movie.js";

export const insertMovie = async (req,res) => {
    try {
        const {title,rating,description,image,poster,director,releaseYear,cast,addimages} = req.body;
        const newMovie = new Movie({
            title,
            rating,
            description,
            image,
            poster,
            director,
            releaseYear,
            cast,
            addimages
        });
        newMovie.save();
        return res.status(400).json({success:true,message:"Inserted sucessfully"});
    } catch (error) {
        console.error('Error inserting movie:', error);
        return res.status(500).json({sucess:false,message:"Internal server error"});
    }
}

// Function to retrieve all movies from the database
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json({ success: true, movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getoneMovie = async(req,res)=>{
    const id = req.params.id;
    try{
        const movie = await Movie.findOne({_id:id});
       
        if(movie){
        return res.status(200).json({success:true,message:"movie fetched sucessfully.",movie});
        }
        else{
            return res.status(500).json({success:false,message:"movie doesn't exist."})
        }
    }
    catch(err){
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}