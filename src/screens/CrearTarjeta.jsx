import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { createTarjeta } from "../database/db";

export const CrearTarjeta = ({ route }) => {
  const { id } = route.params;
  const [front, setfront] = useState(null);
  const [back, setBack] = useState(null);
  const [message, setMessage] = useState(null);

  console.log(id);

  const handleAddCard = () => {
    if (front === null || front === "") {
      setMessage("Debes especificar un front");
      return;
    }

    if (back === null || back === "") {
      setMessage("Debes especificar una descripción");
      return;
    }

    setMessage(`Tarjeta: ${front}, fue creado con éxito para el mazo ${id}`);
    createTarjeta(id, front, back);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white gap-6">
      <Text className="text-2xl font-medium">Crear una nueva tarjeta</Text>
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setfront(text)}
        value={front}
        placeholder="Ingrese la pregunta"
      />
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setBack(text)}
        value={back}
        placeholder="Ingrese la respuesta"
      />
      {message !== null || message !== "" ? <Text>{message}</Text> : null}
      <Pressable onPress={handleAddCard}>
        <View className="bg-sky-400 h-max w-max p-4 rounded-xl">
          <Text className="text-white text-xl font-medium">CREAR TARJETA</Text>
        </View>
      </Pressable>
    </View>
  );
};
