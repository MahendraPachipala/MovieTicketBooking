import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import MovieCard from '../Components/MovieCard';
import "../Styles/Booking.css";
import { Baseurl } from '../Utilities/Config';
import cookies from 'js-cookie';

function Booking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const istoken = cookies.get('token');

  useEffect(() => {
    if (!istoken) {
      alert("Please Login To Continue");
      navigate("/login");
    }
  }, [istoken, navigate]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${Baseurl}/Aboutmovie/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Error fetching movie. Please try again later.");
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await axios.get(`${Baseurl}/getalltheaters`);
        setTheaters(res.data.theatersdata);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTheaters();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setSelectedDates(dates);
    setSelectedDate(dates[0]);
  }, []);

  const handleBookNow = (showTime, theater) => {
    navigate(`/BookNow/${id}`, {
      state: {
        theaterlocation: selectedLocation,
        theater: theater.name,
        date: selectedDate,
        time: showTime,
      }
    });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location.location);
    setSearchTerm('');
    setSelectedShowTime('');
    setFilteredLocations([]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedShowTime('');
  };

  const handleShowTimeChange = (showTime, theater) => {
    handleBookNow(showTime, theater);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length !== 0) {
      const filteredLocations = theaters.filter((theater) =>
        theater.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filteredLocations);
    } else {
      setFilteredLocations([]);
    }
  };

  return (
    <div className="booking-container" style={{ height: "675px" }}>
      {error && <div className="error">{error}</div>}
      <MovieCard movie={movie} />
      <div className="filters">
        <div className="dates">
          {selectedDates.map(date => (
            <button 
              key={date} 
              className={`date ${selectedDate === date ? "selecteddate" : ""}`}
              onClick={() => handleDateChange(date)}
            >
              {date}
            </button>
          ))}
        </div>
        <div className="search-container">
          <span className="search-icon"></span>
          <input type="text" id="location-search" value={searchTerm} onChange={handleSearchChange} placeholder="Search locations" />
        </div>
        <div className="select">
          {filteredLocations.length > 0 && filteredLocations.slice(0, 2).map((loc) => (
            <button 
              key={loc._id} 
              onClick={() => handleLocationChange(loc)}
            >
              {loc.location}
            </button>
          ))}
        </div>
        <h3>{selectedLocation}</h3>
        {selectedLocation && (
          <div>
            {theaters
              .filter(theater => theater.location === selectedLocation)
              .map(theater => {
                if (movie?.title === theater.currentMovie) {
                  return (
                    <div className="Movietimings" key={theater._id}>
                      <p>{theater.name}</p>
                      <div className="dates">
                        {theater.availableDates.map(dateObj => {
                          if (dateObj.date === selectedDate) {
                            return dateObj.showTimings.map(time => (
                              <button className="showtime" onClick={() => handleShowTimeChange(time.time, theater)} key={time._id}>{time.time}</button>
                            ));
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
