import * as SQLite from "expo-sqlite";

let db;

const openDatabase = async () => {
  db = await SQLite.openDatabaseAsync("mazos.db");
  return db;
};

export const init = async () => {
  await openDatabase();

  await db
    .execAsync(
      `
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS mazos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT
      );
      CREATE TABLE IF NOT EXISTS tarjetas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mazo_id INTEGER NOT NULL,
        front TEXT,
        back TEXT,
        FOREIGN KEY (mazo_id) REFERENCES mazos (id) ON DELETE CASCADE
      );
    `
    )
    .then(() => {
      console.log("Tabla 'mazos' creada correctamente.");
    })
    .catch((error) => {
      console.error("Error al crear la tabla:", error);
    });
};

// Exporta el objeto de la base de datos
export const getDatabase = () => db;
