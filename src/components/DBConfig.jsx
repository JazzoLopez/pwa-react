export const dbConnection = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "user",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storesSchema: [
                { name: "name", keypath: "name", options: { unique: false } },
                { name: "lastname", keypath: "lastname", options: { unique: false } },
                { name: "age", keypath: "age", options: { unique: false } },
                { name: "username", keypath: "username", options: { unique: false } },
                { name: "email", keypath: "email", options: { unique: false } },
            ]
        },
        {
            store: "test",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storesSchema: [
                { name: "value", keypath: "value", options: { unique: false } },
            ]
        }
    ]

}