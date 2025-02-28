import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'outline' | 'filled';
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'filled' 
}) => {
  const buttonStyle = variant === 'outline' ? styles.outlineButton : styles.filledButton;
  const textStyle = variant === 'outline' ? styles.outlineText : styles.filledText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outlineButton: {
    width: '100%',
    height: 44,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.base.white,
  },
  filledButton: {
    width: '100%',
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.blue,
  },
  outlineText: {
    color: colors.primary.blue,
    fontSize: 18,
    fontWeight: "bold",
  },
  filledText: {
    color: colors.base.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AuthButton; 