import React from 'react';
import '../Styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container text-center">
        <p className="mb-0">&copy; 2024 Movie Booking. All rights reserved.</p>
        <div>
          <a href="#" className="text-light">Privacy Policy</a>
          <span className="mx-2 text-muted">|</span>
          <a href="#" className="text-light">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
