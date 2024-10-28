import { View, Text, ScrollView } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Card } from "../../components/card";
import { useMazos } from "../../context/MazosContext";
import { getTarjetasByMazo } from "../../database/db";

export const MazoHome = ({ route, navigation }) => {
  const { tarjetas, setTarjetas } = useMazos();
  const { mazo } = route.params;
  const { id, nombre, descripcion } = mazo;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const tarjetasArray = await getTarjetasByMazo(id);
        setTarjetas(tarjetasArray);
      };

      fetchData();

      return () => {
        setTarjetas([]);
      };
    }, [])
  );

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
