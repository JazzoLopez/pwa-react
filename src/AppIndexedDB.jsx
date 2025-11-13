import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { getAll, addItem, updateItem, deleteItem } from "./lib/indexedDB";

function AppIndexedDB() {
    const [users, setUsers] = useState([]);
    const store = "user";

    useEffect(() => {
        let mounted = true;
        getAll(store)
            .then((list) => {
                if (mounted) setUsers(list || []);
            })
            .catch((err) => {
                console.error("Error leyendo IndexedDB:", err);
                if (mounted) setUsers([]);
            });
        return () => (mounted = false);
    }, []);

    const addUser = async (user) => {
        try {
            const id = await addItem(store, user);
            const newUser = { id, ...user };
            setUsers((prev) => [...prev, newUser]);
        } catch (err) {
            console.error("Error agregando usuario:", err);
        }
    };

    const updateUser = async (id, updated) => {
        try {
            await updateItem(store, updated);
            setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
        } catch (err) {
            console.error("Error actualizando usuario:", err);
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteItem(store, id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Error borrando usuario:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Usuarios (2)</h2>
            <Form addUser={addUser} />
            <Table users={users} onUpdate={updateUser} onDelete={deleteUser} />
        </div>
    );
}

export default AppIndexedDB;
