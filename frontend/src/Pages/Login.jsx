import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Baseurl } from '../Utilities/Config';
import '../Styles/Login.css';

const Login = () => {
  const [userdata, setUserData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const istoken = Cookies.get('token');
  useEffect(()=>{
  if(istoken){
    navigate("/");
  }},[istoken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Baseurl}/auth/login`, userdata);
      if (res.data.success) {
        Cookies.set('token', res.data.token);
        Cookies.set('name', res.data.user.username);
        navigate("/");
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Log In</h1>
        <div className="login-form">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={userdata.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={userdata.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="login-button"
          >
            Login
          </button>
        </div> 
        <div><a href="/forgot">Forgot password?</a></div>
        <div className="login-message">{message && <h5>{message}</h5>}</div>
        <div className="login-register">Don't have an account? <a href="/Register">Register</a></div>
      </div>
    </div>
  );
};

export default Login;
