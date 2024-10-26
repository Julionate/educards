import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Card } from "../components/card";
import { createTarjeta, getTarjetasByMazo } from "../database/db";

export const MazoHome = ({ route, navigation }) => {
  const { mazo } = route.params;
  const { id, nombre, descripcion } = mazo;

  const [tarjetas, setTarjetas] = useState([]);

  const fetchTarjetas = async () => {
    const tarjetas = await getTarjetasByMazo(id);
    setTarjetas(tarjetas);
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      await fetchTarjetas();
    };

    initializeDatabase().catch((error) => {
      console.error("Error en la inicialización de la base de datos:", error);
    });

    const unsubscribe = navigation.addListener("focus", () => {
      fetchTarjetas();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View className="flex-1 bg-white justify-center items-center gap-6">
        <View className="mt-6 flex-1">
          <Text className="text-3xl font-semibold text-center">{nombre}</Text>
          <Text className="text-xl text-center">{descripcion}</Text>
        </View>
        <View className="flex-1 items-center justify-center flex-wrap flex-row gap-3">
          {tarjetas.map((tarjeta) => (
            <Card key={tarjeta.id} front={tarjeta.front} back={tarjeta.back} />
          ))}
          <Card
            type="card-add"
            funcion={() => navigation.navigate("Crear Tarjeta", { id })}
          />
        </View>
      </View>
    </ScrollView>
  );
};
