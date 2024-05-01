import mongoose from "mongoose";

const bookedSeatsSchema = new mongoose.Schema({
  moviename: {
    type: String,
    required: true
  },
  theatername: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seats: [{
    seatId: {
      type: String,
    },
    row: Number,
    col: Number
  }],
  time:{
    type:String,
  }
});

const BookedSeats = mongoose.model('BookedSeats', bookedSeatsSchema);

export default BookedSeats;
