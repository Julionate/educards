import { useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { MazoContext } from "../../context/MazosContext"; // Importar el contexto
import { Deck } from "../../components/deck";

export const Mazos = ({ navigation }) => {
  const { mazos } = useContext(MazoContext); // Obtener mazos y la función para eliminar

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
