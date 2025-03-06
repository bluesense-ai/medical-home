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
    backgroundColor: colors.base.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.base.darkGray,
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

// Dark theme styles
const stylesDark = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#444',
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
    color: colors.base.white,
    fontSize: 16,
  },
});

export default StaffSelector; 