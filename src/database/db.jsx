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
    `
    )
    .then(() => {
      console.log("Tabla 'mazos' creada correctamente.");
    })
    .catch((error) => {
      console.error("Error al crear la tabla:", error);
    });
};

export const createMazo = async (nombre, descripcion) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO mazos (nombre, descripcion) VALUES (?, ?)",
      nombre,
      descripcion
    );
    console.log("Mazo creado con ID:", result.lastInsertRowId);
  } catch (error) {
    console.error("Error al crear el mazo:", error);
  }
};

// Leer todos los mazos
export const getMazos = async () => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM mazos");

    const mazosArray = allRows.map((row) => {
      return { id: row.id, nombre: row.nombre };
    });
    return mazosArray;
  } catch (error) {
    console.error("Error al leer los mazos:", error);
    return [];
  }
};
