import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Baseurl } from '../Utilities/Config';
import "../Styles/Login.css"; 

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    pincode: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Baseurl}/auth/register`, formData);
      setError(null);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Network error. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder = "Enter Your Name" required className="login-input" />

          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder = "Enter Your Email" required className="login-input" />

          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder = "Enter Password" required className="login-input" />

          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder = "Enter Mobile Number" className="login-input" />

          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="login-input" placeholder = "Enter Pincode"/>

          <button type="submit" className="login-button">Register</button>
        </form>
        <div className="login-message">{error && <h5>{error}</h5>}</div>
        <div className="login-register">Already have an account? <a href="/Login">Login</a></div>
      </div>
    </div>
  );
};

export default RegistrationForm;
