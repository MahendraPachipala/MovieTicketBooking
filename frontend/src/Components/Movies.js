import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Styles/Movies.css";
import { Link } from "react-router-dom"; 
import { Baseurl } from '../Utilities/Config';

const Movies = ({}) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${Baseurl}/movies`);
        setMovies(res.data.movies);
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="homepage">
      <h1 className="heading">Explore Available Movies</h1>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <section className="featured-movies">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div className="card" key={index}>
                <img src={movie.image} alt={`Poster for ${movie.title}`} />
                <div className="movie-desc">
                  <h3>{movie.title}</h3>
                  <p>Rating: {movie.rating}</p>
                  <Link to={`/Aboutmovie/${movie._id}`}>
                    <button className="Bookbutton">Book Now</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </section>
      )}
    </div>
  );
}

export default Movies;
