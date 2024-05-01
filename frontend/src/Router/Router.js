import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Home from "../Pages/Home.jsx";
import AboutMovie from "../Pages/AboutMovie.js"
import Booking from "../Pages/Booking.js";
import SeatSelector from "../Pages/BookNow.js"
import Confirm from "../Pages/Confirm.jsx";
import About from "../Pages/About.jsx";

const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path = "/Register" element = {<Register/>}/>
                <Route path = "/Home" element = {<Home/>}/>
                <Route path = "/Aboutmovie/:id" element = {<AboutMovie/>}/>
                <Route path = "/Booking/:id" element = {<Booking/>}/>
                <Route path = "/BookNow/:id" element = {<SeatSelector rows={6} cols={10}/>}/>
                <Route path = "/Confirm" element = {<Confirm/>}/>
                <Route path = "/About" element = {<About/>}/>
            </Routes>
        </Router>
    );
};

export default Routers;
