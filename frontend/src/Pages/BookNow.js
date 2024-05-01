import React, { useEffect, useState } from "react";
import "./Booknow.css";
import Seat from "../Images/seat.png";
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
import { Baseurl } from "../Utilities/Config";

const SeatSelector = ({ rows, cols }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);
  const [movie, setMovie] = useState(null);
  const [bookedseats,setbookedseats] = useState();
  const location = useLocation();
  const { theaterlocation, date, theater, time } = location.state;
  const { id } = useParams();
 const navigate  = useNavigate();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${Baseurl}/Aboutmovie/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const showDetails = {
          moviename: movie.title,
          theatername: theater,
          date: date,
          time:time,
          movie:movie.title,
        };
        const res = await axios.post(`${Baseurl}/getbooked`, showDetails);
        if(!res.data.bookedSeats.success){
          console.log("big problem");
        }
        setbookedseats(res.data.bookedSeats.seats);
        console.log(bookedseats);
      } catch (err) {
        console.error("Error fetching theater data:", err);
      }
    };
    if (movie) {
      fetchTheaterData();
    }
  }, [movie, theater, date,time]);

  const handleSeatClick = (seatId, row, col) => {
    const isSeatSelected = selectedSeats.includes(seatId);
    const updatedSelectedSeats = isSeatSelected
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];
    const updatedSelectedSeatsInfo = isSeatSelected
      ? selectedSeatsInfo.filter(seatInfo => seatInfo.seatId !== seatId)
      : [...selectedSeatsInfo, { seatId, row, col }];
    setSelectedSeats(updatedSelectedSeats);
    setSelectedSeatsInfo(updatedSelectedSeatsInfo);
  };

  const handleBookNow = async () => {

    navigate("/confirm", {
      state: {
        movie: movie.title,
        Date: date,
        Theater: theater,
        Time: time,
        Tickets: selectedSeats,
      }
    });
    

    try {
      const bookingData = {
        moviename: movie.title,
        theatername: theater,
        date: date,
        seats: selectedSeatsInfo,
        time:time
      };
      const response = await axios.post("http://localhost:4000/api/booktickets", bookingData);
      console.log("Booking successful:", response.data);
    } catch (error) {
      console.error("Error booking tickets:", error.message);
    }
  };

  if (!bookedseats) {
    return <div>Loading...</div>;
  }
  
  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const seatId = `${String.fromCharCode(65 + row - 1)}${col}`;
        const isBooked = bookedseats.some(seat => seat.seatId === seatId || (seat.row === row && seat.col === col));
        const isSelected = selectedSeats.includes(seatId);
  
        const seatElement = col !== 6 ? (
          <div
            key={seatId}
            
            onClick={() => handleSeatClick(seatId, row, col)}
            style={{
              filter: isBooked ? "brightness(0.3)" : "none",
            }}
            className={`seat ${isSelected ? "selected" : ""}`}
          >
            <img src={Seat} className={`${isSelected ? "selected" : ""}`}alt={`Seat ${seatId}`} />
            <span className="seat-number">{`${String.fromCharCode(65 + row - 1)}${col}`}</span>
          </div>
        ) : (
          <div
            key={seatId}
            className="seat"
          >
            <p>{`${String.fromCharCode(65 + row - 1)}`}</p>
          </div>
        );
  
        seats.push(seatElement);
      }
    }
    return seats;
  };
  
  
  
  
  

  return (
    <div>
      {movie && (
        <div className="MovieBanner">
          <div className="MovieDetails">
            <h1>{movie.title}</h1>
            <div className="Details">
              <p><strong>Theater Location:</strong> {theaterlocation}</p>
              <p><strong>Theater:</strong> {theater}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
          </div>
        </div>
      )}

      <div className="theater">{renderSeats()}</div>
      
      {selectedSeats.length > 0 && (
        <div className="button-container">
          <button className="button" onClick={handleBookNow}>Proceed to Payment</button>
        </div>
      )}
      
      {selectedSeatsInfo.length > 0 && (
        <div className="selected-seats-container">
          <span className="selected-seats-label">Selected Seats: {selectedSeatsInfo.length}</span>
          <div className="selected-seats-wrapper">
            {selectedSeatsInfo.map((seatInfo, index) => (
              <div className="selected-seat" key={index}>
                {seatInfo.seatId}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
