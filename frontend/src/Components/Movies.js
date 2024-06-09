import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Styles/Movies.css";
import { Link } from "react-router-dom";
import { Baseurl } from '../Utilities/Config';
import { useDebounce } from "use-debounce";

const Movies = ({ searchdata }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchData] = useDebounce(searchdata, 300);

  const handlemoviedata = (data) => {
    if (debouncedSearchData.trim() === "") {
      setMovies(data);
    } else {
      setMovies(
        data.filter((movie) =>
          movie.title.toLowerCase().includes(debouncedSearchData.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      console.log(searchdata);
      try {
        const res = await axios.get(`${Baseurl}/movies`);
        handlemoviedata(res.data.movies);
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchData]);

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
