import { View, Text, TextInput, Pressable } from "react-native";
import { createMazo, deleteMazosTable } from "../database/db";
import { useState } from "react";
import { err } from "react-native-svg";

export const CrearMazo = () => {
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [message, setMessage] = useState(null);

  const handleAddDeck = () => {
    if (nombre === null || nombre === "") {
      setMessage("Debes especificar un nombre");
      return;
    }

    if (descripcion === null || descripcion === "") {
      setMessage("Debes especificar una descripción");
      return;
    }

    setMessage(`Mazo: ${nombre}, fue creado con éxito`);
    createMazo(nombre, descripcion);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white gap-6">
      <Text className="text-2xl font-medium">Crear un nuevo Mazo</Text>
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setNombre(text)}
        value={nombre}
        placeholder="Ingrese un nombre"
      />
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setDescripcion(text)}
        value={descripcion}
        placeholder="Ingrese una descripción"
      />
      {message !== null || message !== "" ? <Text>{message}</Text> : null}
      <Pressable onPress={handleAddDeck}>
        <View className="bg-sky-400 h-max w-max p-4 rounded-xl">
          <Text className="text-white text-xl font-medium">CREAR MAZO</Text>
        </View>
      </Pressable>
    </View>
  );
};
