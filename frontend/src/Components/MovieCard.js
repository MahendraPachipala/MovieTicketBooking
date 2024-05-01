import React from 'react';

const MovieCard = ({ movie }) => {
  if(!movie){
    return <div>Loading...</div>
  }
  return (
    <div className="movie-page">
      <h1 className="movie-title">
        {movie.title} 
      </h1>
      <p>Director: {movie.director}</p>
      <p>Release Year: {movie.releaseYear}</p>
    </div>
  );
};

export default MovieCard;
