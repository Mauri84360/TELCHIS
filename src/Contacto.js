import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@gmail.com$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^9[0-9]{9}$/;
  return re.test(phone);
}

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [comentarioError, setComentarioError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      validateEmail(email) && 
      validatePhone(telefono) && 
      comentario.trim() !== ''
    );
  }, [email, telefono, comentario]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setEmailError(
      validateEmail(emailValue) ? '' : 'Ingrese un correo electrónico válido (sólo con dominio @gmail.com)'
    );
  };

  const handleTelefonoChange = (event) => {
    const phoneValue = event.target.value;
    setTelefono(phoneValue);
    setTelefonoError(
      validatePhone(phoneValue) ? '' : 'Ingrese un número de teléfono válido (10 dígitos empezando por 9)'
    );
  };

  const handleComentarioChange = (event) => {
    const comentarioValue = event.target.value;
    setComentario(comentarioValue);
    setComentarioError(
      comentarioValue.trim() ? '' : 'Ingrese sus comentarios'
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      fetch('http://localhost:3001/guardar-contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono, comentario }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar el formulario');
        }
        return response.json();
      })
      .then(data => {
        alert('Formulario enviado con éxito: ' + data.mensaje);
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
    } else {
      alert('Por favor corrija los errores en el formulario para enviar.');
    }
  };

  return (
    <div className="Contacto">
      <Container className="mt-4">
        <h1 className="text-center">Contacto</h1>
        <p className="text-center">Ingresa tus datos</p>
      </Container>
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingresa tu nombre completo" 
                  required 
                  value={nombre} 
                  onChange={handleNombreChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Dirección de correo electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresa tu dirección de correo electrónico" 
                  required 
                  value={email} 
                  onChange={handleEmailChange} 
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingresa tu número de teléfono" 
                  required 
                  value={telefono} 
                  onChange={handleTelefonoChange} 
                />
                {telefonoError && <p className="text-danger">{telefonoError}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="comentario">
                <Form.Label>Comentario</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={6} 
                  placeholder="Ingresa tu comentario" 
                  required 
                  value={comentario} 
                  onChange={handleComentarioChange} 
                />
                {comentarioError && <p className="text-danger">{comentarioError}</p>}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!isFormValid}>
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ReactDOM.render(<Contacto />, document.getElementById('root'));

export default Contacto;
