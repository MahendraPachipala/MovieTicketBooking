import React, { useState } from "react";
import Movies from "../Components/Movies";
import MovieImage from "../Images/movie.jpg";
import MovieImage2 from "../Images/movie2.jpg";
import MovieImage3 from "../Images/movie3.jpg";
import MovieImage4 from "../Images/movie4.jpg";

const Home = ({searchdata}) => {
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
        <Movies searchdata ={searchdata}/>
    </div>
  );
};

export default Home;
