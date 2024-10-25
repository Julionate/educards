import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { init, createMazo, readMazos } from "./src/database/db";

import { Home } from "./src/screens/Home";

import "./global.css";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { Mazos } from "./src/screens/Mazos";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initializeDatabase = async () => {
      await init(); // Llama a la función para inicializar la base de datos
    };

    initializeDatabase().catch((error) => {
      console.error("Error en la inicialización de la base de datos:", error);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mazos"
          component={Mazos}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
