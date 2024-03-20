import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './ServiceForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor o realizar otras acciones
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="service-form-container">
      <br></br>
      <h1 className="text-center">Contratación de Servicios</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceType">Tipo de Servicio</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un servicio</option>
            <option value="Cable">Cable</option>
            <option value="Internet">Internet</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Código Postal</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Contratar
        </button>
      </form>
      {submitted && (
        <div className="alert alert-success mt-3">
          ¡Contratado! Gracias por elegir nuestro servicio.
        </div>
      )}
    </div>
  );
};
// Renderizar el componente Contacto en el elemento root del HTML
ReactDOM.render(<ServiceForm />, document.getElementById('root'));

export default ServiceForm;
