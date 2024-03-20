// Importar las librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Crear una instancia de Express
const app = express();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Configurar el middleware para parsear JSON
app.use(bodyParser.json());

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'macosmysql',
  database: 'telchis'
});

// Conectar a la base de datos
connection.connect(error => {
  if (error) throw error;
  console.log('Conexión exitosa a la base de datos.');
});

// Definir la ruta para guardar los datos del formulario
app.post('/guardar-contacto', (req, res) => {
  // Incluir el campo comentario en la desestructuración
  const { nombre, email, telefono, comentario } = req.body;
  // Actualizar la consulta para incluir el campo comentario
  const query = 'INSERT INTO contactos (nombre, email, telefono, comentario) VALUES (?, ?, ?, ?)';
  
  // Incluir el comentario en los valores a insertar
  connection.query(query, [nombre, email, telefono, comentario], (err, results) => {
    if (err) {
      console.error('Error al guardar los datos:', err);
      res.status(500).send('Error al guardar los datos');
    } else {
      console.log('Datos guardados con éxito:', results);
      res.status(200).json({ mensaje: 'Contacto guardado con éxito' });
    }
  });
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});

// Función para verificar si el correo ya está registrado
const isEmailRegistered = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM contactos WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0].count > 0);
    });
  });
};

// Ruta para verificar si el correo ya está registrado
app.post('/verificar-correo', async (req, res) => {
  const { email } = req.body;
  try {
    const alreadyRegistered = await isEmailRegistered(email);
    if (alreadyRegistered) {
      res.status(409).json({ mensaje: 'Este correo electrónico ya está registrado' });
    } else {
      res.status(200).json({ mensaje: 'Este correo electrónico no está registrado' });
    }
  } catch (error) {
    console.error('Error al verificar el correo electrónico:', error);
    res.status(500).send('Error al verificar el correo electrónico');
  }
});