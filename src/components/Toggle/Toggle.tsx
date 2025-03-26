import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../theme/colors';

interface ToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.container,
        // { backgroundColor: colors.main.primary } 
        { backgroundColor: isEnabled ? colors.main.secondary : colors.main.primary }
      ]}
    >
      <View style={styles.content}>
        <View style={[
          styles.dot,
          {
            transform: [{ translateX: isEnabled ? 55 : 0 }],
            backgroundColor: isEnabled ? colors.main.primary : colors.main.secondary
          }
        ]} />
        <Text style={[
          styles.toggleText,
          { transform: [{ translateX: isEnabled ? -20 : 0 }] }
        ]}>
          {isEnabled ? 'Provider' : 'Patient'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 30,
    borderRadius: 20,
    padding: 4.74,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  toggleText: {
    color: 'white',
    fontSize: 12,
    paddingRight: 5,
  },
});

export default Toggle;