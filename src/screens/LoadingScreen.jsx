import { useEffect } from "react";
import { Text, View, Image } from "react-native";

export const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        className="w-64 h-20"
        source={require("../../assets/logos/educards_full.webp")}
      />
    </View>
  );
};
