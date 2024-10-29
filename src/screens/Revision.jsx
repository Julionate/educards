import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";

export const Revision = (idMazo) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 200);
  };

  const CONTENT_TARJETA = [
    {
      front: "ESTE ES EL FRONT",
    },
    { back: "ESTE ES EL BACK" },
  ];

  front = CONTENT_TARJETA[0].front;
  back = CONTENT_TARJETA[1].back;
  console.log(isScrolling);
  return (
    <View className="bg-white w-full h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            if (isScrolling === false) {
              console.log("invirtiendo");
              setIsFlipped(!isFlipped);
            }
          }}
        >
          {isFlipped ? (
            <View className="h-full w-full flex justify-center items-center">
              <Text className="text-xl">{back}</Text>
            </View>
          ) : (
            <View className="h-full w-full flex justify-center items-center">
              <Text className="text-xl">{front}</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
      <View className="w-full border-t-2 border-t-black/[0.01] h-max p-4 flex flex-row justify-evenly items-center">
        <Pressable>
          <View className="bg-sky-400 w-28 h-16 rounded-xl flex justify-center items-center active:bg-sky-500">
            <Text className="font-medium text-white text-xl">Fácil</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className="bg-red-500 w-28 h-16 rounded-xl flex justify-center items-center active:bg-red-600">
            <Text className="font-medium text-white text-xl">Difícil</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
