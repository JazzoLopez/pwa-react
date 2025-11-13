import { useState } from "react";

export default function Form({ addUser }) {
  const [form, setForm] = useState({ name: "", lastname: "", age: 0, username: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addUser(form);
    setForm({ name: "", lastname: "", age: 0, username: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Apellidos"
        value={form.lastname}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={form.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
