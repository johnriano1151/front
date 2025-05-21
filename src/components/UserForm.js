import React, { useState } from 'react';

/**
 * Componente para crear y editar usuarios.
 * @param {Function} onSave - Función para manejar el guardado del usuario
 * @param {Object} userData - Información del usuario a editar
 */
const UserForm = ({ onSave, userData = {} }) => {
  const [user, setUser] = useState({
    nombre: userData.nombre || '',
    email: userData.email || ''
  });

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  // Envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        name="nombre"
        value={user.nombre}
        onChange={handleChange}
        required
      />
      <label>Email:</label>
      <input
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default UserForm;
