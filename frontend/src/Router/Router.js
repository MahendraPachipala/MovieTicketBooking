import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Home from "../Pages/Home.jsx";
import AboutMovie from "../Pages/AboutMovie.js";
import Booking from "../Pages/Booking.js";
import SeatSelector from "../Pages/BookNow.js";
import Confirm from "../Pages/Confirm.jsx";
import About from "../Pages/About.jsx";


const Routers = ({searchdata}) => {

  return (
    <div>
      <Routes>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home searchdata={searchdata}/>} />
        <Route path="/aboutmovie/:id" element={<AboutMovie />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booknow/:id"  element={<SeatSelector rows={6} cols={10} />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  );
};

export default Routers;
