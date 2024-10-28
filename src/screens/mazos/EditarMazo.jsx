import { View, Text, TextInput, Pressable } from "react-native";
import { useState, useContext } from "react";
import { updateMazo } from "../../database/db";

export const EditarMazo = ({ route }) => {
  const {
    id: id,
    nombre: nombreMazo,
    descripcion: descripcionMazo,
  } = route.params;
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [message, setMessage] = useState(null);

  const handleUpdateDeck = () => {
    if (nombre === null || nombre === "") {
      setMessage("Debes especificar un nombre");
      return;
    }

    if (descripcion === null || descripcion === "") {
      setMessage("Debes especificar una descripción");
      return;
    }

    setMessage(`Mazo: ${nombre}, fue modificado con éxito`);
    updateMazo(nombre, descripcion, id);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white gap-6">
      <Text className="text-2xl font-medium">Editando "{nombreMazo}"</Text>
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setNombre(text)}
        defaultValue={nombreMazo}
        placeholder="Ingrese un nombre"
      />
      <TextInput
        className="h-20 bg-slate-50 rounded-lg w-full max-w-96 shadow-black shadow-sm text-xl p-4 border-b-1 border-black/5"
        onChangeText={(text) => setDescripcion(text)}
        defaultValue={descripcionMazo}
        placeholder="Ingrese una descripción"
      />
      {message !== null || message !== "" ? <Text>{message}</Text> : null}
      <Pressable onPress={handleUpdateDeck}>
        <View className="bg-sky-400 h-max w-max p-4 rounded-xl">
          <Text className="text-white text-xl font-medium">EDITAR</Text>
        </View>
      </Pressable>
    </View>
  );
};
