import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const BUTTON_WIDTH = 182; // 24px padding on each side

interface ActionButtonProps {
  title: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    backgroundColor: colors.main.secondary,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: colors.main.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
});

export default ActionButton; 