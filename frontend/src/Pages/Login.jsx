import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Baseurl } from '../Utilities/Config';

const Login = () => {
  const navigate = useNavigate();
  
  const [userdata, setUserData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Baseurl}/auth/login`, userdata);
      if (res.data.success) {
        navigate("/Home");
      }
      Cookies.set('token', res.data.token);
      console.log(res.data.user);
      Cookies.set('name',res.data.user.username);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div style={{ height:"675px",display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={userdata.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={userdata.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ width: '100%', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>{message && <h5 style={{ color: 'red', padding: '10px' }}>{message}</h5>}</div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>Don't have an account? <a href="/Register" style={{ textDecoration: 'none', color: '#007bff' }}>Register</a></div>
      </div>
    </div>
  );
};

export default Login;
