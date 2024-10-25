import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useFrase from "../database/Frases";
import { getMazosWithLimit } from "../database/db";
import { Deck } from "../components/deck";

export const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const frase = useFrase();
  const goToMazos = () => navigation.navigate("Mazos");
  const [mazosPendientes, setMazosPendientes] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      const mazos = await getMazosWithLimit(6);

      setMazosPendientes(mazos);
    };

    initializeDatabase().catch((error) => {
      console.error("Error en la inicialización de la base de datos:", error);
    });
  }, []);

  return (
    <View
      className="flex-1 justify-center items-center bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="mb-6">
        <Text className="text-3xl font-bold">EDUCARDS</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-medium text-center">
            Mazos pendientes
          </Text>
          <Text className="text-xl text-center">{frase}</Text>
          <View className="py-6 flex-1 flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6 z-10">
            {mazosPendientes.map((mazo) => (
              <Deck
                key={mazo.id}
                id={mazo.id}
                nombre={mazo.nombre}
                descripcion={mazo.descripcion}
                funcion={() => navigation.navigate("Mazo Home", { mazo })}
              />
            ))}
          </View>
          <Pressable onPress={goToMazos}>
            <Text className="text-sky-500 text-xl font-medium py-4 px-4">
              Ver todos tus mazos
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-medium">Tus estadísticas</Text>
          <Text className="text-xl">Aquí iría algo sobre tus estadísticas</Text>
        </View>

        <View className="h-max w-screen px-16 py-6 bg-sky-400 flex items-center justify-center">
          <Text className="text-center font-medium text-xl text-white">
            Esta aplicación está siendo desarrollada por:
          </Text>
          <Text className="text-center font-medium text-xl text-white">
            Julio Oñate
          </Text>
          <Text className="text-center font-medium text-xl text-white">
            Sebastián Luengo
          </Text>
          <Text className="text-center font-medium text-xl text-white">
            Fabián Medina
          </Text>
          <Text className="text-center font-medium text-xl text-white">
            Daniel Lagos
          </Text>
          <Text className="text-center font-bold text-xl text-white">
            Con mucha I.A: Insomnio y Ansiedad ♥️
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
