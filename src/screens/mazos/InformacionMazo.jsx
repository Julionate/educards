import { View, Text, ScrollView } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Card } from "../../components/card";
import { useMazos } from "../../context/MazosContext";
import { deleteTarjeta, getTarjetasByMazo } from "../../database/db";

export const MazoHome = ({ route, navigation }) => {
  const { tarjetas, setTarjetas } = useMazos();
  const { mazo } = route.params;
  const { id, nombre, descripcion } = mazo;

  const handleDeleteTarjeta = (id) => {
    deleteTarjeta(id);
    fetchData();
  };

  const fetchData = async () => {
    const tarjetasArray = await getTarjetasByMazo(id);
    setTarjetas(tarjetasArray);
  };

  useFocusEffect(
    useCallback(() => {
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
            <Card
              id={tarjeta.id}
              key={tarjeta.id}
              front={tarjeta.front}
              handleDeleteTarjeta={handleDeleteTarjeta}
            />
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
