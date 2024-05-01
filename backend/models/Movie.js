import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    cast: [{
        name: String,
        role: String,
        image: String
    }]
    ,
    addimages:[{
        image:String
    }]
});

export const Movie = mongoose.model('Movie', movieSchema);


