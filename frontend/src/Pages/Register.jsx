import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Baseurl } from '../Utilities/Config';

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
      if(response.data.success){
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
    <div style={{ maxWidth: '400px', margin: '0 auto', height:"675px",display:"flex",alignItems:"center"}}>
      <h1 style={{ textAlign: 'center' }}></h1>
      
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '10px' }}>Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

        <label htmlFor="email" style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

        <label htmlFor="password" style={{ display: 'block', marginBottom: '10px' }}>Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

        <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '10px' }}>Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

        <label htmlFor="pincode" style={{ display: 'block', marginBottom: '10px' }}>Pincode:</label>
        <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

        <button type="submit" style={{ width: '100%', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>{error && <h5 style={{ color: 'red' }}>{error}</h5>}</div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>Already have an account? <a href="/Login" style={{ textDecoration: 'none', color: '#007bff' }}>Login</a></div>
      </form>
     
    </div>
  );
};

export default RegistrationForm;
