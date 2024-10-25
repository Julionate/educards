import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useFrase from "../data/Frases";

export const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const frase = useFrase();
  const goToMazos = () => navigation.navigate("Mazos");

  return (
    <View
      className="flex-1 justify-center items-center bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View>
        <Text className="text-3xl font-bold">EDUCARDS</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-medium text-center">
            Mazos pendientes
          </Text>
          <Text className="text-xl text-center">{frase}</Text>
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
