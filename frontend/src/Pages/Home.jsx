import React, { useState } from "react";
import Movies from "../Components/Movies";
import MovieImage from "./movie.jpg";
import MovieImage2 from "./movie2.jpg";
import MovieImage3 from "./movie3.jpg";
import MovieImage4 from "./movie4.jpg";

const Home = () => {
  const movieImages = [MovieImage, MovieImage2, MovieImage3, MovieImage4];

  return (
    <div>
    <div className="scroll-container">
    <div className = "scroll-element">
      {movieImages.map((movie, index) => (
        <img key={index} src={movie} alt={`Movie ${index + 1}`} width="600" height="400" />
      ))}
      </div>
    </div>
        <Movies/>
    </div>
  );
};

export default Home;
