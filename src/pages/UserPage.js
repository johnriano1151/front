import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import UserService from '../services/UserService';

/**
 * Página principal del módulo de usuarios
 */
const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = () => {
    const data = UserService.getAll();
    setUsers(data);
  };

  const handleSave = (user) => {
    UserService.save(user);
    loadUsers();
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      UserService.remove(id);
      loadUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <UserForm onSave={handleSave} editingUser={editingUser} />
      <hr />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserPage;
