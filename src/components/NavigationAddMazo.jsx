import { View, Text, Pressable } from "react-native";
import IconPlusCircleAlt from "../../assets/icons/PlusCircleAlt";
import { useNavigation } from "@react-navigation/native";

export const NavigationAddMazo = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Crear Mazo")}>
      <View className="w-8 h-8">
        <IconPlusCircleAlt className="w-max h-max fill-gray-900"></IconPlusCircleAlt>
      </View>
    </Pressable>
  );
};
