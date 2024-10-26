import React, { createContext, useState, useEffect } from "react";
import { init } from "../database/db"; // Ajusta la ruta según tu estructura
import {
  getMazos,
  createMazo,
  deleteMazo,
  updateMazo,
} from "../database/dbMethods";

export const MazoContext = createContext();

export const MazoProvider = ({ children }) => {
  const [mazos, setMazos] = useState([]);

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

  return (
    <MazoContext.Provider
      value={{ mazos, handleCreateMazo, handleDeleteMazo, handleUpdateMazo }}
    >
      {children}
    </MazoContext.Provider>
  );
};
