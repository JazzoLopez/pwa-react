import { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(stored);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  const addUser = (user) => {
    const newList = [...users, { id: Date.now(), ...user }];
    setUsers(newList);
    saveToLocal(newList);
  };

  const updateUser = (id, updated) => {
    const newList = users.map((u) => (u.id === id ? updated : u));
    setUsers(newList);
    saveToLocal(newList);
  };

  const deleteUser = (id) => {
    const newList = users.filter((u) => u.id !== id);
    setUsers(newList);
    saveToLocal(newList);
  };

  return (
    <div className="app-container">
      <h2>Usuarios</h2>
      <Form addUser={addUser} />
      <Table users={users} onUpdate={updateUser} onDelete={deleteUser} />
    </div>
  );
}

export default App;
