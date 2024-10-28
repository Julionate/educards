import { useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMazos } from "../context/MazosContext";
import { deleteMazo } from "../database/db";

import useFrase from "../database/Frases";
import { Deck } from "../components/deck";
import { useFocusEffect } from "@react-navigation/native";
import { getPendingMazos } from "../database/db";

export const Home = ({ navigation }) => {
  const { mazos, setMazos } = useMazos();
  const insets = useSafeAreaInsets();
  const frase = useFrase();
  const goToMazos = () => navigation.navigate("Mazos");
  const handleDelete = (id) => {
    deleteMazo(id);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const mazosArray = await getPendingMazos();
        setMazos(mazosArray);
      };

      fetchData();

      return () => {
        setMazos([]);
      };
    }, [])
  );

  console.log(mazos);

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
          {mazos.length > 0 ? (
            <>
              <Text className="text-2xl font-medium text-center">
                Mazos pendientes
              </Text>
              <Text className="text-xl text-center">{frase}</Text>
              <View className="py-6 flex flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6 z-10">
                {mazos.map((mazo) => (
                  <Deck
                    key={mazo.id}
                    id={mazo.id}
                    nombre={mazo.nombre}
                    descripcion={mazo.descripcion}
                    pendientes={mazo.pendientes}
                    handleDelete={handleDelete()}
                    funcion={() => navigation.navigate("Revision", { mazo })}
                  />
                ))}
              </View>
            </>
          ) : (
            <>
              <Text className="text-2xl font-medium text-center">
                🎊 ¡Felicidades! 🎊
              </Text>
              <Text>No tienes mazos pendientes! </Text>
            </>
          )}
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
