import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MazoContext } from "../context/MazosContext";

import useFrase from "../database/Frases";
import { Deck } from "../components/deck";

export const Home = ({ navigation }) => {
  const { mazos } = useContext(MazoContext);
  const insets = useSafeAreaInsets();
  const frase = useFrase();
  const goToMazos = () => navigation.navigate("Mazos");
  const [mazosPendientes, setMazosPendientes] = useState([]);
  const [otrosPendientes, setOtrosPendientes] = useState([]);

  useEffect(() => {
    getPending();
  }, [mazos]);

  const getPending = () => {
    const pendientes = mazos.slice(0, 6);
    const otrosPendientes = mazos.slice(6).length;
    setMazosPendientes(pendientes);
    setOtrosPendientes(otrosPendientes);
  };

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
          {mazosPendientes.length > 0 ? (
            <>
              <Text className="text-2xl font-medium text-center">
                Mazos pendientes
              </Text>
              <Text className="text-xl text-center">{frase}</Text>
              <View className="py-6 flex flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6 z-10">
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
              {otrosPendientes > 0 ? (
                <Text>+{otrosPendientes} pendientes</Text>
              ) : null}
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
