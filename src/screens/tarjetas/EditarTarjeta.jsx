import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { updateTarjeta } from "../../database/db";

export const EditarTarjeta = ({ route }) => {
  const { id: id, front: frontOld, back: backOld } = route.params;
  const [front, setFront] = useState(frontOld);
  const [back, setBack] = useState(backOld);
  const [message, setMessage] = useState(null);

  const handleUpdateCard = () => {
    if (front === null || front === "") {
      setMessage("Debes especificar un nombre");
      return;
    }

    if (back === null || back === "") {
      setMessage("Debes especificar una descripción");
      return;
    }

    setMessage(`Tarjeta: ${id}, fue modificada con éxito`);
    updateTarjeta(front, back, id);
  };

  console.log(backOld);

  return (
    <View className="flex-1 justify-center items-center bg-white gap-6">
      <Text className="text-2xl font-medium">Editando Tarjeta (id: {id})</Text>
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setFront(text)}
        defaultValue={frontOld}
        placeholder="Ingrese una pregunta"
      />
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setBack(text)}
        defaultValue={backOld}
        placeholder="Ingrese una respuesta"
      />
      {message !== null || message !== "" ? <Text>{message}</Text> : null}
      <Pressable onPress={handleUpdateCard}>
        <View className="bg-sky-400 h-max w-max p-4 rounded-xl">
          <Text className="text-white text-xl font-medium">EDITAR</Text>
        </View>
      </Pressable>
    </View>
  );
};
