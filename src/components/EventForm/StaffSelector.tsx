import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

/**
 * Props for StaffSelector component
 * @property {string} staffName - Currently assigned staff name
 * @property {Function} onStaffChange - Function to call when staff is changed
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface StaffSelectorProps {
  staffName: string;
  onStaffChange?: (name: string) => void;
  theme: string;
}

/**
 * StaffSelector Component
 * 
 * This component provides a selector for assigning staff to an event
 */
const StaffSelector: React.FC<StaffSelectorProps> = ({
  staffName,
  onStaffChange,
  theme
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  
  const handlePress = () => {
    // In a real implementation, this would show a staff selection modal
    console.log('Open staff selector');
    if (onStaffChange) {
      // For demonstration purposes, this would be replaced with actual selection
      // onStaffChange('New Staff Name');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assigned Staff</Text>
      <TouchableOpacity 
        style={styles.selector}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.staffInfo}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{staffName.charAt(0)}</Text>
          </View>
          <Text style={styles.staffName}>{staffName}</Text>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={theme === 'dark' ? colors.base.white : colors.base.black}
        />
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 8,
    color: colors.base.black,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderColor: colors.legacy.lightGray,
    borderWidth: 1,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  staffName: {
    fontSize: 14,
    color: colors.base.black,
  }
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.base.white,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderColor: colors.legacy.lightGray,
    borderWidth: 1,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  staffName: {
    fontSize: 14,
    color: colors.base.white,
  }
});

export default StaffSelector; 