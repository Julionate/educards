import { useEffect } from "react";
import { Text, View } from "react-native";

export const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-5xl font-semibold">EDUCARDS</Text>
    </View>
  );
};
