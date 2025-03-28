import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { init } from "./src/database/db";

import { Home } from "./src/screens/Home";

import "./global.css";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { Mazos } from "./src/screens/mazos/Mazos";
import { CrearMazo } from "./src/screens/mazos/CrearMazo";
import { MazoHome } from "./src/screens/mazos/InformacionMazo";
import { CrearTarjeta } from "./src/screens/tarjetas/CrearTarjeta";
import { MazoProvider } from "./src/context/MazosContext";
import { EditarMazo } from "./src/screens/mazos/EditarMazo";
import { Revision } from "./src/screens/Revision";
import { Button } from "react-native";
import { NavigationAddMazo } from "./src/components/NavigationAddMazo";
import { NavigationAddTarjeta } from "./src/components/NavigationAddTarjeta";
import { EditarTarjeta } from "./src/screens/tarjetas/EditarTarjeta";

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
    <MazoProvider>
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
            options={{
              headerRight: () => <NavigationAddMazo />,
            }}
          />
          <Stack.Screen name="Revision" component={Revision} />
          <Stack.Screen
            name="Información Mazo"
            component={MazoHome}
            options={{
              headerRight: () => <NavigationAddTarjeta />,
            }}
          />
          <Stack.Screen name="Crear Mazo" component={CrearMazo} />
          <Stack.Screen name="Editar Mazo" component={EditarMazo} />
          <Stack.Screen name="Crear Tarjeta" component={CrearTarjeta} />
          <Stack.Screen name="Editar Tarjeta" component={EditarTarjeta} />
        </Stack.Navigator>
      </NavigationContainer>
    </MazoProvider>
  );
}
