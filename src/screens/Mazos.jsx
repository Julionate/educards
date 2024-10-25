import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { init, getMazos } from "../database/db";
import { Deck } from "../components/deck";

export const Mazos = ({ navigation }) => {
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
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="py-6 flex-1 flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {mazos.map((mazo) => (
            <Deck
              key={mazo.id}
              id={mazo.id}
              nombre={mazo.nombre}
              descripcion={mazo.descripcion}
            />
          ))}
          <Deck
            type="add-deck"
            funcion={() => navigation.navigate("Crear Mazo")}
          />
        </View>
      </ScrollView>
    </View>
  );
};
