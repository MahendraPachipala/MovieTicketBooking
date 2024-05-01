import BookedSeats from "../models/Booking.js";

export const BookSeats = async (req, res) => {
  try {
    const { moviename, theatername, date, seats,time } = req.body;

    let bookedSeats = await BookedSeats.findOne({ moviename, theatername, date,time });

    if (!bookedSeats) {
      bookedSeats = new BookedSeats({ moviename, theatername, date, seats: [],time });
    }
    bookedSeats.seats.push(...seats);
    await bookedSeats.save();
    res.status(201).json({ message: 'Seats booked successfully' });
  } catch (error) {
    console.error('Error booking seats:', error);
    res.status(500).json({ error: 'An error occurred while booking seats' });
  }
};


export const getBooked = async (req, res) => {
    try {
      const { moviename, theatername, date,time } = req.body;
      console.log(req.body);
      const movie = await BookedSeats.findOne({ moviename: moviename, theatername: theatername, date: date,time:time});
      if (movie) {
        console.log(movie);
        res.status(200).json({ success:true,message: 'success', bookedSeats: movie });
      } else {
       const bookedSeats = new BookedSeats({ moviename, theatername, date, seats: [],time });
       await bookedSeats.save();
       const movie = await BookedSeats.findOne({ moviename: moviename, theatername: theatername, date: date,time:time});
       res.status(200).json({ success:true,message: 'success', bookedSeats: movie });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success:false,message: 'Internal server error.' });
    }
  };