import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import IconPlusCircle from "../../assets/icons/PlusCircle";
import ModalMenu from "./menu";
import { useNavigation } from "@react-navigation/native";

export const Card = ({
  id,
  front,
  back,
  type = "default",
  funcion,
  handleDeleteTarjeta,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();
  const actions = [
    {
      label: "Editar",
      onPress: () => navigation.navigate("Editar Tarjeta", { id, front, back }),
    },
    {
      label: "Eliminar",
      onPress: () => handleDeleteTarjeta(id),
    },
  ];
  const handleLongPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

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
      <Pressable onLongPress={handleLongPress}>
        <View className="bg-white shadow-sm shadow-black rounded-lg w-32 h-48 p-2">
          <Text>{front}</Text>
        </View>
        <View className="absolute bg-black/10 rounded-lg w-32 h-48 -z-10 left-1.5 top-1.5" />
      </Pressable>
      <ModalMenu
        visible={menuVisible}
        actions={actions}
        onClose={() => setMenuVisible(false)}
        position={menuPosition}
      />
    </View>
  );
};
