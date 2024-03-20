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

function validateName(name) {
  const re = /^[A-Za-z][A-Za-z\s]*$/;
  return re.test(name);
}

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [comentarioError, setComentarioError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      validateName(nombre) &&
      validateEmail(email) && 
      validatePhone(telefono) && 
      comentario.trim() !== ''
    );
  }, [nombre, email, telefono, comentario]);

  const handleNombreChange = (event) => {
    const nameValue = event.target.value;
    setNombre(nameValue);
    setNombreError(
      validateName(nameValue) ? '' : 'El nombre debe comenzar con una letra y solo contener letras y espacios'
    );
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Verificar primero si el correo electrónico ya está registrado
    const esCorreoValido = await verificarCorreo(email);
    if (!esCorreoValido) {
      // Si el correo ya está registrado, mostrar un mensaje y no enviar el formulario
      alert('El correo electrónico ya está registrado. Por favor, use otro correo.');
      return;
    }
  
    // Si el correo no está registrado y el formulario es válido, proceder con el envío
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
  

  // Función para verificar si el correo ya está registrado
const verificarCorreo = async (correo) => {
  try {
    const response = await fetch('http://localhost:3001/verificar-correo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: correo }),
    });
    const data = await response.json();
    if (response.status === 409) {
      setEmailError('Este correo electrónico ya está registrado.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  } catch (error) {
    setEmailError('Error al verificar el correo electrónico.');
    return false;
  }
};

// Llamar a verificarCorreo cuando el campo de email pierda el foco
const handleEmailBlur = async (event) => {
  const correo = event.target.value;
  if (validateEmail(correo)) {
    await verificarCorreo(correo);
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
                {nombreError && <p className="text-danger">{nombreError}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Dirección de correo electrónico</Form.Label>
                <Form.Control 
      type="email" 
      placeholder="Ingresa tu dirección de correo electrónico" 
      required 
      value={email} 
      onBlur={handleEmailBlur} // Agregar el manejador de evento onBlur
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
