import { useEffect, useState } from "react";

const useFrase = () => {
  const frases = [
    "¡Recuerda repasar tus mazos pendientes todos los días!",
    "La práctica hace al maestro.",
    "El conocimiento es poder.",
  ];

  const [frase, setFrase] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    setFrase(frases[randomIndex]);
  }, []);

  return frase;
};

export default useFrase;
