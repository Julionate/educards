import { useCallback } from "react";
import { useMazos } from "../../context/MazosContext";
import { View, ScrollView } from "react-native";
import { Deck } from "../../components/deck";
import { deleteMazo, getMazos } from "../../database/db";
import { useFocusEffect } from "@react-navigation/native";

export const Mazos = ({ navigation }) => {
  const { mazos, setMazos } = useMazos();

  const handleDeleteMazo = (id) => {
    deleteMazo(id);
    fetchData();
  };

  const fetchData = async () => {
    const mazosArray = await getMazos();
    setMazos(mazosArray);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {
        setMazos([]);
      };
    }, [])
  );

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
              pendientes={mazo.pendientes}
              handleDeleteMazo={handleDeleteMazo}
              funcion={() => navigation.navigate("Información Mazo", { mazo })}
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
