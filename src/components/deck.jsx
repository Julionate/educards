// components/deck.js
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import IconPlusCircle from "../../assets/icons/PlusCircle";
import ModalMenu from "./menu";
import { useNavigation } from "@react-navigation/native";
import { deleteMazo } from "../database/db";

export const Deck = ({
  id,
  nombre = "Sin nombre",
  descripcion = "Sin descripción",
  pendientes = 0,
  funcion,
  handleDeleteMazo,
  type = "default",
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();

  const actions = [
    {
      label: "Editar",
      onPress: () =>
        navigation.navigate("Editar Mazo", { id, nombre, descripcion }),
    },
    { label: "Eliminar", onPress: () => handleDeleteMazo(id) },
  ];

  const handleLongPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

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
      <Pressable onPress={funcion} onLongPress={handleLongPress}>
        {pendientes > 0 ? (
          <View className="absolute z-10 -left-3 -top-3 bg-red-500 w-6 h-6 rounded-full flex justify-center items-center">
            <Text className="text-white font-bold">{pendientes}</Text>
          </View>
        ) : null}
        <View className="w-36 h-48 bg-white shadow-black shadow-lg flex justify-start p-2 rounded-lg">
          <Text className="font-bold text-xl text-center">{nombre}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" className="text-xl">
            {descripcion}
          </Text>
        </View>
        <View className="w-36 h-48 absolute bg-black -z-10 left-1.5 top-1.5 rounded-lg"></View>
        <View className="w-36 h-48 absolute bg-black/50 -z-10 left-3 top-3 rounded-lg"></View>
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
