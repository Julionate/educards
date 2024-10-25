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

export const createMazo = async (nombre, descripcion) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO mazos (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );
  } catch (error) {
    console.error("Error al crear el mazo:", error);
  }
};

// Leer todos los mazos
export const getMazos = async () => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM mazos");

    const mazosArray = allRows.map((row) => {
      return { id: row.id, nombre: row.nombre, descripcion: row.descripcion };
    });
    return mazosArray;
  } catch (error) {
    console.error("Error al leer los mazos:", error);
    return [];
  }
};

export const deleteMazosTable = async () => {
  try {
    await db.execAsync("DROP TABLE IF EXISTS mazos");
    console.log("Tabla 'mazos' eliminada correctamente.");
  } catch (error) {
    console.error("Error al eliminar la tabla 'mazos':", error);
  }
};

export const getMazosWithLimit = async (limit = 10) => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM mazos LIMIT ?", [
      limit,
    ]);

    const mazosArray = allRows.map((row) => {
      return { id: row.id, nombre: row.nombre, descripcion: row.descripcion };
    });
    return mazosArray;
  } catch (error) {
    console.error("Error al leer los mazos:", error);
    return [];
  }
};
