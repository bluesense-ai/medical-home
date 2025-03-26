import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../../theme/colors";

interface ToggleProps {
  text: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isEnabled, onToggle, text }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.container,
        {
          backgroundColor: isEnabled
            ? colors.main.secondary
            : colors.main.primary,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            transform: [{ translateX: isEnabled ? 46 : 0 }],
            backgroundColor: !isEnabled
              ? colors.main.secondary
              : colors.main.primary,
          },
        ]}
      />
      <View style={{ position: "absolute", left: isEnabled ? 7 : 30 }}>
        <Text
          style={{
            fontSize: 10,
            lineHeight: 22,
            letterSpacing: 0.46,
            color: colors.base.white,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 78,
    height: 30,
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Toggle;
