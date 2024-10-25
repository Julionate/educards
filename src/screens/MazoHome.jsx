import { View, Text } from "react-native";

export const MazoHome = ({ route }) => {
  const { mazo } = route.params;
  const { id, nombre, descripcion } = mazo;
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className="mt-6">
        <Text className="text-3xl font-semibold text-center">{nombre}</Text>
        <Text className="text-xl text-center">{descripcion}</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text>Aquí irán las tarjetas</Text>
      </View>
    </View>
  );
};
