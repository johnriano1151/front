const express = require('express');
const bcrypt = require('bcryptjs');
const jsonfile = require('jsonfile');
const cors = require('cors');
const app = express();

const PORT = 3000;
const DB_FILE = './users.json';

app.use(cors());
app.use(express.json()); // Para aceptar JSON

/**
 * Ruta para registrar un nuevo usuario
 */
app.post('/api/register', async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  const users = await jsonfile.readFile(DB_FILE);
  const existe = users.find(u => u.usuario === usuario);
  if (existe) {
    return res.status(409).json({ error: 'El usuario ya existe.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ usuario, password: hashedPassword });
  await jsonfile.writeFile(DB_FILE, users, { spaces: 2 });

  res.json({ mensaje: 'Usuario registrado exitosamente.' });
});

/**
 * Ruta para inicio de sesión
 */
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  const users = await jsonfile.readFile(DB_FILE);
  const user = users.find(u => u.usuario === usuario);
  if (!user) {
    return res.status(401).json({ error: 'Error en la autenticación.' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Error en la autenticación.' });
  }

  res.json({ mensaje: 'Autenticación satisfactoria.' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/**
 * Ruta para listar todos los usuarios (solo para pruebas)
 */
app.get('/api/usuarios', async (req, res) => {
  const users = await jsonfile.readFile(DB_FILE);
  // No devolver contraseñas
  const safeUsers = users.map(u => ({ usuario: u.usuario }));
  res.json(safeUsers);
});


/**
 * Elimina un usuario por nombre
 */
app.delete('/api/usuarios/:usuario', async (req, res) => {
  const { usuario } = req.params;
  let users = await jsonfile.readFile(DB_FILE);
  const newUsers = users.filter(u => u.usuario !== usuario);

  if (newUsers.length === users.length) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  await jsonfile.writeFile(DB_FILE, newUsers, { spaces: 2 });
  res.json({ mensaje: `Usuario '${usuario}' eliminado correctamente.` });
});

/**
 * Actualiza la contraseña de un usuario
 */
app.put('/api/usuarios/:usuario', async (req, res) => {
  const { usuario } = req.params;
  const { passwordNueva } = req.body;

  if (!passwordNueva) {
    return res.status(400).json({ error: 'Nueva contraseña requerida' });
  }

  const users = await jsonfile.readFile(DB_FILE);
  const user = users.find(u => u.usuario === usuario);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  user.password = await bcrypt.hash(passwordNueva, 10);
  await jsonfile.writeFile(DB_FILE, users, { spaces: 2 });

  res.json({ mensaje: 'Contraseña actualizada correctamente' });
});
