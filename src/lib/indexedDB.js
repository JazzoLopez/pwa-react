import { dbConnection } from "../components/DBConfig";

function openDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            return reject(new Error("IndexedDB no está soportado en este navegador"));
        }

        const request = window.indexedDB.open(dbConnection.name, dbConnection.version);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            (dbConnection.objectStoresMeta || []).forEach((meta) => {
                if (!db.objectStoreNames.contains(meta.store)) {
                    const store = db.createObjectStore(meta.store, meta.storeConfig || { keyPath: 'id', autoIncrement: true });
                    (meta.storesSchema || []).forEach((idx) => {
                        try {
                            store.createIndex(idx.name, idx.keypath, idx.options || { unique: false });
                        } catch (e) {
                        }
                    });
                }
            });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function withStore(storeName, mode, cb) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        let result;
        try {
            result = cb(store);
        } catch (err) {
            reject(err);
        }
        tx.oncomplete = () => {
            try { db.close(); } catch (e) { }
            resolve(result);
        };
        tx.onerror = () => reject(tx.error);
    });
}

export async function getAll(storeName) {
    return withStore(storeName, 'readonly', (store) => {
        const req = store.getAll();
        req.onsuccess = () => { };
        return new Promise((res, rej) => {
            req.onsuccess = () => res(req.result || []);
            req.onerror = () => rej(req.error);
        });
    });
}

export async function addItem(storeName, item) {
    return withStore(storeName, 'readwrite', (store) => {
        const req = store.add(item);
        return new Promise((res, rej) => {
            req.onsuccess = (e) => res(e.target.result);
            req.onerror = () => rej(req.error);
        });
    });
}

export async function updateItem(storeName, item) {
    return withStore(storeName, 'readwrite', (store) => {
        const req = store.put(item);
        return new Promise((res, rej) => {
            req.onsuccess = (e) => res(e.target.result);
            req.onerror = () => rej(req.error);
        });
    });
}

export async function deleteItem(storeName, key) {
    return withStore(storeName, 'readwrite', (store) => {
        const req = store.delete(key);
        return new Promise((res, rej) => {
            req.onsuccess = () => res(true);
            req.onerror = () => rej(req.error);
        });
    });
}

export async function clearStore(storeName) {
    return withStore(storeName, 'readwrite', (store) => {
        const req = store.clear();
        return new Promise((res, rej) => {
            req.onsuccess = () => res(true);
            req.onerror = () => rej(req.error);
        });
    });
}

export default { openDB, getAll, addItem, updateItem, deleteItem, clearStore };
