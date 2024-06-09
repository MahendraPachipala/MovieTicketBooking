import React, { useState, useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from "axios";
import "../Styles/AboutMovie.css";
import { Baseurl } from '../Utilities/Config';



const AboutMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page">
      <img src={movie.poster} alt={movie.title} />
      <h1 className="movie-title">
        {movie.title}
        <Link to = {`/Booking/${id}`}>
        <button className="book-now-btn">Book Now</button>
        </Link>
      </h1>
      <p>{movie.description}</p>
      <p>Director: {movie.director}</p>
      <p>Release Year: {movie.releaseYear}</p>
      
      {/* Cast */}
      <h2>Cast</h2>
      <ul>
        {movie.cast.map((actor, index) => (
          <li key={index}>
            <img src={actor.image} alt={actor.name} />
            <p>{actor.name} as {actor.role}</p>
          </li>
        ))}
      </ul>
 
      {/* Additional Images */}
      <h2>Additional Images</h2>
      <div className="image-gallery">
  {movie.addimages.map((image) => (
    <img key={image.image} src={image.image} alt={`Image`} />
  ))}
</div>

    </div>
  );
}

export default AboutMovie;
