import React from 'react';

/**
 * Lista de usuarios con opción de eliminar o editar.
 * @param {Array} users - Lista de usuarios
 * @param {Function} onEdit - Acción para editar usuario
 * @param {Function} onDelete - Acción para eliminar usuario
 */
const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr key={i}>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => onEdit(user)}>Editar</button>
              <button onClick={() => onDelete(user.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
