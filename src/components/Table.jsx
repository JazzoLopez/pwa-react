import { useState } from "react";

export default function Table({ users, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", lastname: "", age: 0, username: "", email: "" })
    const startEdit = (user) => {
        setEditing(user.id);
        setForm(user);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = (id) => {
        onUpdate(id, { ...form, id });
        setEditing(null);
    };

    return (
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td className="no-rows" colSpan="6">Sin registros</td>
                    </tr>
                ) : (
                    users.map((u) => (
                        <tr key={u.id}>
                            <td data-label="Nombre">
                                {editing === u.id ? (
                                    <input name="name" value={form.name} onChange={handleChange} />
                                ) : (
                                    u.name
                                )}
                            </td>
                            <td data-label="Apellidos">
                                {editing === u.id ? (
                                    <input name="lastname" value={form.lastname} onChange={handleChange} />
                                ) : (
                                    u.lastname
                                )}
                            </td>
                            <td data-label="Edad">
                                {editing === u.id ? (
                                    <input name="age" value={form.age} onChange={handleChange} />
                                ) : (
                                    u.age
                                )}
                            </td>
                            <td data-label="Usuario">
                                {editing === u.id ? (
                                    <input name="username" value={form.username} onChange={handleChange} />
                                ) : (
                                    u.username
                                )}
                            </td>
                            <td data-label="Email">
                                {editing === u.id ? (
                                    <input name="email" value={form.email} onChange={handleChange} />
                                ) : (
                                    u.email
                                )}
                            </td>
                            <td data-label="Acciones">
                                <div className="actions">
                                    {editing === u.id ? (
                                        <>
                                            <button onClick={() => handleUpdate(u.id)}>Guardar</button>
                                            <button onClick={() => setEditing(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEdit(u)}>Editar</button>
                                            <button onClick={() => onDelete(u.id)}>Eliminar</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
