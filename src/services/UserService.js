/**
 * Servicio para gestionar usuarios en localStorage (simula backend)
 */

const STORAGE_KEY = 'usuarios';

const getAll = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const save = (user) => {
  const users = getAll();
  if (user.id) {
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
  } else {
    user.id = Date.now();
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const remove = (id) => {
  const users = getAll().filter((user) => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export default { getAll, save, remove };
