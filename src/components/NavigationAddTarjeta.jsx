import { View, Pressable } from "react-native";
import IconPlusCircleAlt from "../../assets/icons/PlusCircleAlt";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export const NavigationAddTarjeta = () => {
  const route = useRoute();
  const { mazo } = route.params;
  const { id, nombre, descripcion } = mazo;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Crear Tarjeta", { id })}>
      <View className="w-8 h-8">
        <IconPlusCircleAlt className="w-max h-max fill-gray-900"></IconPlusCircleAlt>
      </View>
    </Pressable>
  );
};
