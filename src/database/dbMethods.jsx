import { getDatabase } from "./db"; // Asegúrate de ajustar la ruta según sea necesario

const db = getDatabase();

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

export const createTarjeta = async (mazo_id, front, back) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO tarjetas (mazo_id, front, back) VALUES (?, ?, ?)",
      [mazo_id, front, back]
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
    }));
  } catch (error) {
    console.error("Error al leer las tarjetas:", error);
    return [];
  }
};
