import { View, Text, Pressable } from "react-native";
import IconPlusCircle from "../../assets/icons/PlusCircle";

export const Deck = ({
  id,
  nombre = "Sin nombre",
  descripcion = "Sin descripción",
  funcion,
  type = "default",
}) => {
  if (type === "add-deck") {
    return (
      <View className="w-max h-max relative">
        <Pressable onPress={funcion}>
          <View className="w-36 h-48 bg-white shadow-black shadow-lg flex justify-start items-center p-2 rounded-lg">
            <Text className="font-bold text-xl text-center">
              Añadir nuevo mazo
            </Text>
            <IconPlusCircle className="flex-1 w-12 h-12 fill-gray-800" />
          </View>
          <View className="w-36 h-48 absolute bg-black -z-10 left-1.5 top-1.5 rounded-lg"></View>
          <View className="w-36 h-48 absolute bg-black/50 -z-10 left-3 top-3 rounded-lg"></View>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="w-max h-max relative">
      <Pressable onPress={funcion}>
        <View className="w-36 h-48 bg-white shadow-black shadow-lg flex justify-start p-2 rounded-lg">
          <Text className="font-bold text-xl text-center">{nombre}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" className="text-xl">
            {descripcion}
          </Text>
        </View>
        <View className="w-36 h-48 absolute bg-black -z-10 left-1.5 top-1.5 rounded-lg"></View>
        <View className="w-36 h-48 absolute bg-black/50 -z-10 left-3 top-3 rounded-lg"></View>
      </Pressable>
    </View>
  );
};
