import React, { createContext, useState, useContext } from "react";

export const MazoContext = createContext();

export const useMazos = () => useContext(MazoContext);

export const MazoProvider = ({ children }) => {
  const [mazos, setMazos] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);

  return (
    <MazoContext.Provider
      value={{
        mazos,
        setMazos,
        tarjetas,
        setTarjetas,
      }}
    >
      {children}
    </MazoContext.Provider>
  );
};
