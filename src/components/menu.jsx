import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ModalMenu = ({ visible, actions, onClose, position }) => {
  const [menuDimensions, setMenuDimensions] = useState({ width: 0, height: 0 });
  const scaleAnimation = useRef(new Animated.Value(0)).current; // Inicializa la animación

  // Calcular la posición ajustada para evitar el desbordamiento
  const adjustedPosition = {
    x: Math.min(
      Math.max(0, position.x - menuDimensions.width / 2),
      SCREEN_WIDTH - menuDimensions.width
    ),
    y: Math.min(
      Math.max(0, position.y - menuDimensions.height / 4),
      SCREEN_HEIGHT - menuDimensions.height
    ),
  };

  // Efecto para controlar la animación
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (visible) {
      // Iniciar la animación al abrir
      Animated.timing(scaleAnimation, {
        toValue: 1, // Valor final (escala máxima)
        duration: 300, // Duración de la animación
        easing: Easing.out(Easing.ease), // Easing para suavizar la animación
        useNativeDriver: true, // Usa el driver nativo para rendimiento
      }).start();
    } else {
      // Restablecer la animación al cerrar
      Animated.timing(scaleAnimation, {
        toValue: 0, // Valor inicial (escala 0)
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        // Llamar a onClose después de que la animación se complete
        if (!visible) {
          onClose();
        }
      });
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <Animated.View
          className="absolute bg-white p-5 border-b-[2px] border-black/5 rounded-lg"
          style={[
            {
              top: adjustedPosition.y,
              left: adjustedPosition.x,
              transform: [{ scale: scaleAnimation }], // Aplicar la escala animada
            },
          ]}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setMenuDimensions({ width, height });
          }}
        >
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className="py-4"
              onPress={() => {
                action.onPress();
                onClose();
              }}
            >
              <Text style={styles.menuItemText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center", // Centra verticalmente el menú
    alignItems: "center", // Centra horizontalmente el menú
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ModalMenu;
