import React, { createContext, useState, useEffect } from "react";
import { init } from "../database/db"; // Ajusta la ruta según tu estructura
import {
  getMazos,
  createMazo,
  deleteMazo,
  updateMazo,
  getTarjetasByMazo,
  createTarjeta,
} from "../database/db";

export const MazoContext = createContext();

export const MazoProvider = ({ children }) => {
  const [mazos, setMazos] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    const initializeDB = async () => {
      await init();
      await fetchMazos();
    };
    initializeDB();
  }, []);

  const fetchMazos = async () => {
    const mazosArray = await getMazos();
    setMazos(mazosArray);
  };

  const fetchTarjetas = async (id) => {
    const tarjetasArray = await getTarjetasByMazo(id);
    setTarjetas(tarjetasArray);
  };

  const handleCreateMazo = async (nombre, descripcion) => {
    await createMazo(nombre, descripcion);
    await fetchMazos();
  };

  const handleDeleteMazo = async (id) => {
    await deleteMazo(id);
    await fetchMazos();
  };

  const handleUpdateMazo = async (nombre, descripcion, id) => {
    await updateMazo(nombre, descripcion, id);
    await fetchMazos();
  };

  const handleCreateTarjeta = async (
    idMazo,
    front,
    back,
    fechaCreacion,
    sigRevision,
    intervalo,
    factorFacilidad
  ) => {
    await createTarjeta(
      idMazo,
      front,
      back,
      fechaCreacion,
      sigRevision,
      intervalo,
      factorFacilidad
    );
    await fetchTarjetas(idMazo);
  };

  return (
    <MazoContext.Provider
      value={{
        mazos,
        tarjetas,
        fetchTarjetas,
        handleCreateTarjeta,
        handleCreateMazo,
        handleDeleteMazo,
        handleUpdateMazo,
      }}
    >
      {children}
    </MazoContext.Provider>
  );
};
