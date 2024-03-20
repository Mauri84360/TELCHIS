import React from 'react';
import ReactDOM from 'react-dom';
import serviceImages from './serviceImages.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './servicios.css';

// Create a separate Carrusel component
const Carrusel = () => {
  return (
    <div className="Servicios">
    <Carousel controls={true} indicators={false} interval={3000} className="position-relative">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/1.png"
          alt="Primera imagen"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/2.png"
          alt="segunda imagen"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/3.png"
          alt="Tercera imagen"
        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

const Servicios = () => {
  return (
    <div className="services-page">
      <h1>Nuestros servicios</h1>
      <Carrusel /> {/* Render the Carrusel component here */}
      <div className="services-grid">
        {serviceImages.map((image, index) => (
          <Service key={index} image={image} />
        ))}
      </div>
      <Container fluid={true}>
      <div>
      <Carousel controls={true} indicators={false} interval={3000} className="position-relative">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/9.png"
          alt="Primera imagen"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/10.png"
          alt="segunda imagen"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/7.png"
          alt="Tercera imagen"
        />
      </Carousel.Item>
    </Carousel>
      </div>
  </Container>
    </div>
  );
};

const Service = ({ image }) => {
  return (
    <div className="service-item">
      <img src={image.src} alt={image.alt} />
      <p>{image.description}</p>
    </div>
  
  );
};

// Renderizar el componente Servicios en el elemento root del HTML
ReactDOM.render(<Servicios />, document.getElementById('root'));

export default Servicios;