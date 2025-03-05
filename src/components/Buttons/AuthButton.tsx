import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'outline' | 'solid';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'solid',
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.outlineButton,
        style
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        variant === 'outline' && styles.outlineButtonText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main.secondary,
  },
  outlineButton: {
    backgroundColor: colors.base.white,
    borderWidth: 1,
    borderColor: colors.base.black,
  },
  buttonText: {
    color: colors.base.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  outlineButtonText: {
    color: colors.base.black,
  },
});

export default AuthButton; 