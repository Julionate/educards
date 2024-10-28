import { View, Text, TextInput, Pressable } from "react-native";
import { useState, useContext } from "react";
import { MazoContext } from "../../context/MazosContext";

export const CrearTarjeta = ({ route }) => {
  const { id } = route.params;
  const { handleCreateTarjeta } = useContext(MazoContext);
  const [front, setfront] = useState(null);
  const [back, setBack] = useState(null);
  const [message, setMessage] = useState(null);

  const handleAddCard = () => {
    if (front === null || front === "") {
      setMessage("Debes especificar un front");
      return;
    }

    if (back === null || back === "") {
      setMessage("Debes especificar una descripción");
      return;
    }
    const fechaCreacion = new Date().toISOString();
    const sigRevision = new Date().toISOString();
    const intervalo = 1;
    const factorFacilidad = 0.5;

    setMessage(`Tarjeta: ${front}, fue creado con éxito para el mazo ${id}`);
    handleCreateTarjeta(
      id,
      front,
      back,
      fechaCreacion,
      sigRevision,
      intervalo,
      factorFacilidad
    );
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
