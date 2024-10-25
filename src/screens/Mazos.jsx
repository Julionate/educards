import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { init, getMazos } from "../database/db";
import { Deck } from "../components/deck";

export const Mazos = () => {
  const [mazos, setMazos] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      const mazos = await getMazos();

      setMazos(mazos);
    };

    initializeDatabase().catch((error) => {
      console.error("Error en la inicialización de la base de datos:", error);
    });
  }, []);

  console.log(mazos);

  return (
    <ScrollView>
      <View className="bg-white py-6 flex-1 flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6 z-10">
        {mazos.map((mazo) => (
          <Deck
            key={mazo.id}
            id={mazo.id}
            nombre={mazo.nombre}
            descripcion={mazo.descripcion}
          />
        ))}
      </View>
    </ScrollView>
  );
};
