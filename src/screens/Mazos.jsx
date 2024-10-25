import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { init, getMazos } from "../database/db";
import { Deck } from "../components/deck";

export const Mazos = ({ navigation }) => {
  const [mazos, setMazos] = useState([]);

  const fetchMazos = async () => {
    const mazos = await getMazos();
    setMazos(mazos);
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      await fetchMazos();
    };

    initializeDatabase().catch((error) => {
      console.error("Error en la inicialización de la base de datos:", error);
    });

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMazos();
    });

    return unsubscribe;
  }, [navigation]);

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
              funcion={() => navigation.navigate("Mazo Home", { mazo })}
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
