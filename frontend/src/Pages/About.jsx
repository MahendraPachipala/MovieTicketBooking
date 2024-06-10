import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/About.css'; // Import your CSS file for custom styling

const About = () => {
    const aboutText = `Welcome to Movie Booking! We are committed to delivering an exceptional movie-watching experience. Our platform offers a wide selection of movies spanning various genres, ensuring there's something for everyone. With our user-friendly interface, booking your favorite movie tickets is quick and easy. Sit back, relax, and enjoy the show in our comfortable theaters. We strive to make your movie experience memorable and enjoyable. Join us today and let's create unforgettable movie moments together!`;


  const services = [
    {
      id: 1,
      title: 'Wide Selection of Movies',
      description: 'Choose from a vast library of movies across various genres.'
    },
    {
      id: 2,
      title: 'Easy Booking Process',
      description: 'Our user-friendly interface ensures a hassle-free booking experience.'
    },
    {
      id: 3,
      title: 'Comfortable Seating',
      description: 'Enjoy your movie in comfort with our spacious and cozy seating arrangements.'
    }
  ];

  return (
    <div className="about-page">
      <Container>
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>{aboutText}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Our Services</h3>
            <ul>
              {services.map(service => (
                <li key={service.id}>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
