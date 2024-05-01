import mongoose from "mongoose";

const TheaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String, 
        required: true,
    },
    currentMovie: {
        type: String,
    },
    availableDates: [
        {
            date: String,
            showTimings: [{ time: String }] 
        }
    ]
});

const Theater = mongoose.model("Theater", TheaterSchema);
export default Theater;