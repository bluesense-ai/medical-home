import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

// Staff selector props
export interface StaffSelectorProps {
  staffName: string;
  theme: string;
}

// Staff selector component
const StaffSelector: React.FC<StaffSelectorProps> = ({ staffName, theme }) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const initial = staffName.charAt(0).toUpperCase();
  
  return (
    <View>
      <Text style={[styles.sectionTitle, styles.marginTop]}>Assigned Staff</Text>
      <View style={styles.staffContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.staffName}>{staffName}</Text>
      </View>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  sectionTitle: {
    fontSize: 12,
    fontWeight: "medium",
    color: colors.base.black,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
  },
  avatar: {
    width: 23,
    height: 23,
    borderRadius: 18,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
  staffName: {
    color: colors.base.black,
    fontSize: 12,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
  staffName: {
    color: colors.base.black,
    fontSize: 16,
  },
});

export default StaffSelector; 