import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './planes.css';

const ServiceCard = ({ title, description, price }) => (
  <div className="service-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <p>Price: ${price}</p>
  </div>
);

const Planes = () => {
  return (
    <div className="planes">
    <Container className="py-5">
      <h1 className="text-center mb-5">Nuestros Planes de Internet</h1>
      <Row>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p1.png" />
            <Card.Body>
              <Card.Title>Plan Básico</Card.Title>
              <Card.Text>
                Velocidad de 120 Mbps, ilimitado, sin cuota de instalación telefonia fija.
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p3.png" />
            <Card.Body>
              <Card.Title>Plan Estándar</Card.Title>
              <Card.Text>
                Velocidad de 200 Mbps, ilimitado, sin cuota de instalación telefonia fija.
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p2.png" />
            <Card.Body>
              <Card.Title>Plan Premium</Card.Title>
              <Card.Text>
                Velocidad de 500 Mbps, ilimitado, sin cuota de instalación y telefonia fija.
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
        
       <Container>
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
        </Container> 
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p4.png" />
            <Card.Body>
              <Card.Title>Plan basico</Card.Title>
              <Card.Text>
              50 canales locales y regionales
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p5.png" />
            <Card.Body>
              <Card.Title>Plan deportivo</Card.Title>
              <Card.Text>
              50 canales locales y regionales mas canales deportivos premium
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="img/p6.png" />
            <Card.Body>
              <Card.Title>Plan Premium</Card.Title>
              <Card.Text>
              Más de 200 canales, incluyendo películas y series exclusivas en HD Y 4K.
              </Card.Text>
              <Button variant="primary" href="/ServiceForm">Contratar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container fluid={true}>
  </Container>
    </div>

  );
};

// Renderizar el componente Planes en el elemento root del HTML
ReactDOM.render(<Planes />, document.getElementById('root'));

export default Planes;