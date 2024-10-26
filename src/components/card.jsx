import { View, Text, Pressable } from "react-native";
import IconPlusCircle from "../../assets/icons/PlusCircle";

export const Card = ({ front, back, type = "default", funcion }) => {
  if (type === "card-add") {
    return (
      <View className="w-max h-max relative">
        <Pressable onPress={funcion}>
          <View className="bg-white shadow-sm shadow-black rounded-lg w-32 h-48 p-2 flex items-center">
            <Text className="font-medium">Añadir tarjeta</Text>
            <IconPlusCircle className="flex-1 w-12 h-12 fill-gray-800" />
          </View>
          <View className="absolute bg-black/10 rounded-lg w-32 h-48 -z-10 left-1.5 top-1.5" />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="w-max h-max relative">
      <View className="bg-white shadow-sm shadow-black rounded-lg w-32 h-48 p-2">
        <Text>{front}</Text>
      </View>
      <View className="absolute bg-black/10 rounded-lg w-32 h-48 -z-10 left-1.5 top-1.5" />
    </View>
  );
};
