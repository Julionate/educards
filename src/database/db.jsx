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
        fechaCreacion DATETIME,
        sigRevision DATETIME,
        intervalo FLOAT,
        factorFacilidad FLOAT,
        FOREIGN KEY (mazo_id) REFERENCES mazos (id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS revisiones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idTarjeta INTEGER,
        fechaRevision DATETIME,
        dificultad TEXT,
        FOREIGN KEY (idTarjeta) REFERENCES tarjetas (id) ON DELETE CASCADE
      );
    `
    )
    .then(() => {
      console.log(
        "Tabla 'mazos', 'tarjetas' y 'revisiones creada correctamente."
      );
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
    return result; // Puedes retornar el resultado si necesitas el ID u otra información
  } catch (error) {
    console.error("Error al crear el mazo:", error);
  }
};

export const deleteMazo = async (id) => {
  try {
    await db.runAsync("DELETE FROM mazos WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error al borrar el mazo", error);
  }
};

export const updateMazo = async (nombre, descripcion, id) => {
  try {
    await db.runAsync(
      "UPDATE mazos SET nombre = ?, descripcion = ? WHERE id = ?",
      [nombre, descripcion, id]
    );
  } catch (error) {
    console.error("Error al actualizar el mazo", error);
  }
};

export const getMazos = async () => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM mazos");

    return allRows.map((row) => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
    }));
  } catch (error) {
    console.error("Error al leer los mazos:", error);
    return [];
  }
};

export const createTarjeta = async (
  mazo_id,
  front,
  back,
  fechaCreacion,
  sigRevision,
  intervalo,
  factorFacilidad
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO tarjetas (mazo_id, front, back, fechaCreacion, sigRevision, intervalo, factorFacilidad) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        mazo_id,
        front,
        back,
        fechaCreacion,
        sigRevision,
        intervalo,
        factorFacilidad,
      ]
    );
    console.log("Tarjeta creada con ID:", result.lastInsertRowId);
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
  }
};

export const getTarjetasByMazo = async (mazo_id) => {
  try {
    const allRows = await db.getAllAsync(
      "SELECT * FROM tarjetas WHERE mazo_id = ?",
      [mazo_id]
    );

    return allRows.map((row) => ({
      id: row.id,
      mazo_id: row.mazo_id,
      front: row.front,
      back: row.back,
      fechaCreacion: row.fechaCreacion,
      sigRevision: row.sigRevision,
      intervalo: row.intervalo,
      factorFacilidad: row.factorFacilidad,
    }));
  } catch (error) {
    console.error("Error al leer las tarjetas:", error);
    return [];
  }
};
