import { View, Text, Pressable, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useState } from "react";
import { getTarjetaByMazo, revisionTarjeta } from "../database/db";

export const Revision = ({ route }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [tarjeta, setTarjeta] = useState([]);
  const {
    front = "",
    back = "",
    factorFacilidad = 1,
    factorDificultad = 1,
    intervalo = 1,
  } = tarjeta || {};
  const { mazo } = route.params;
  const { id } = mazo;

  console.log(tarjeta);

  const handleRevision = (seleccion) => {
    let factor;
    let newIntervalo;
    if (seleccion === "f") {
      factor = factorFacilidad;
      newIntervalo = intervalo + intervalo * factor;
    }
    if (seleccion === "d") {
      factor = factorDificultad;
      newIntervalo = intervalo <= 1 ? 1 : intervalo - intervalo * factor;
    }

    revisionTarjeta(newIntervalo, tarjeta.id, seleccion);
    fetchData();
  };

  const handleScroll = () => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 200);
  };

  const fetchData = async () => {
    const tarjeta = await getTarjetaByMazo(id);
    setTarjeta(tarjeta);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {
        setTarjeta([]);
      };
    }, [])
  );

  if (!tarjeta) {
    return (
      <View className="bg-white w-full h-full flex justify-center items-center">
        <Text className="text-3xl font-medium">👏</Text>
        <Text className="text-3xl font-medium">¡Felicitaciones!</Text>
        <Text className="text-xl">Has acabado este mazo por hoy</Text>
      </View>
    );
  }

  return (
    <View className="bg-white w-full h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            if (isScrolling === false) {
              console.log("invirtiendo");
              setIsFlipped(!isFlipped);
            }
          }}
        >
          {isFlipped ? (
            <View className="h-full w-full flex justify-center items-center">
              <Text className="text-xl">{back}</Text>
            </View>
          ) : (
            <View className="h-full w-full flex justify-center items-center">
              <Text className="text-xl">{front}</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
      <View className="w-full border-t-2 border-t-black/[0.01] h-max p-4 flex flex-row justify-evenly items-center">
        <Pressable
          onPress={() => handleRevision("f")}
          className="bg-sky-400 w-28 h-16 rounded-xl flex justify-center items-center active:bg-sky-500"
        >
          <Text className="font-medium text-white text-xl">Fácil</Text>
        </Pressable>
        <Pressable
          onPress={() => handleRevision("d")}
          className="bg-red-500 w-28 h-16 rounded-xl flex justify-center items-center active:bg-red-600"
        >
          <Text className="font-medium text-white text-xl">Difícil</Text>
        </Pressable>
      </View>
    </View>
  );
};
