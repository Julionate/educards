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
        factorDificultad FLOAT,
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
    const allRows = await db.getAllAsync(
      `SELECT m.id as m_id, m.nombre as m_nombre, m.descripcion as m_descripcion, count(t.id) as t_pendientes, min(t.sigRevision) as proxima_revision FROM mazos as m
      LEFT JOIN tarjetas as t on m.id = t.mazo_id
      GROUP BY m.id
      ORDER BY t_pendientes DESC`
    );

    return allRows.map((row) => ({
      id: row.m_id,
      nombre: row.m_nombre,
      descripcion: row.m_descripcion,
      pendientes: row.t_pendientes,
      proxima_revision: row.proxima_revision,
    }));
  } catch (error) {
    console.error("Error al leer los mazos:", error);
    return [];
  }
};

export const getPendingMazos = async () => {
  try {
    const allRows = await db.getAllAsync(
      `SELECT m.id as m_id, m.nombre as m_nombre, m.descripcion as m_descripcion, count(t.id) as t_pendientes, min(t.sigRevision) as proxima_revision FROM mazos as m
      JOIN tarjetas as t on m.id = t.mazo_id
      GROUP BY m.id
      HAVING COUNT(t.id) > 0
      ORDER BY t_pendientes DESC`
    );

    return allRows.map((row) => ({
      id: row.m_id,
      nombre: row.m_nombre,
      descripcion: row.m_descripcion,
      pendientes: row.t_pendientes,
      proxima_revision: row.proxima_revision,
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
  factorFacilidad,
  factorDificultad
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO tarjetas (mazo_id, front, back, fechaCreacion, sigRevision, intervalo, factorFacilidad, factorDificultad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        mazo_id,
        front,
        back,
        fechaCreacion,
        sigRevision,
        intervalo,
        factorFacilidad,
        factorDificultad,
      ]
    );
    console.log("Tarjeta creada con ID:", result.lastInsertRowId);
  } catch (error) {
    console.error("Error al crear la tarjeta:", error);
  }
};

export const deleteTarjeta = async (id) => {
  try {
    await db.runAsync("DELETE FROM tarjetas WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error al borrar la tarjeta", error);
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
      factorDificultad: row.factorDificultad,
    }));
  } catch (error) {
    console.error("Error al leer las tarjetas:", error);
    return [];
  }
};
