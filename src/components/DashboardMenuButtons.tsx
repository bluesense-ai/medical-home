import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Router';
import { colors } from '../theme/colors';
import AnimatedSection from './AnimatedSection';

const DashboardMenuButtons: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <AnimatedSection isInitial delay={300} style={styles.menuContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('DashboardEventsScreen', { selectedDate: undefined })}
      >
        <Text style={styles.buttonText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AIVisitsLanding')}>
        <Text style={styles.buttonText}>AI Visits</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Patient Database</Text>
      </TouchableOpacity>
    </AnimatedSection>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 35,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.legacy.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.base.black,
  },
});

export default DashboardMenuButtons; 