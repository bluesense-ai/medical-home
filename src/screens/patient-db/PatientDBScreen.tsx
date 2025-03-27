import React, { useRef, useState, useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Animated, 
  Text 
} from "react-native";
import { colors } from "../../theme/colors";
import DashboardBackground from "../../components/DashboardBackground";
import { useTheme } from "../../store/useTheme";
import PatientList from "./components/PatientList";
import { Patient } from "./components/PatientCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Mock data for testing, will be replaced with API call
const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Dami Egbeyemi', lastVisit: '8/28/2024' },
  { id: '2', name: 'John Smith', lastVisit: '8/28/2024' },
  { id: '3', name: 'Jose Pena', lastVisit: '8/28/2024' },
  { id: '4', name: 'Isabel Garcia', lastVisit: '8/28/2024' },
  { id: '5', name: 'Michael Johnson', lastVisit: '8/27/2024' },
  { id: '6', name: 'Sarah Williams', lastVisit: '8/26/2024' },
  { id: '7', name: 'David Lee', lastVisit: '8/25/2024' },
  { id: '8', name: 'Emma Thompson', lastVisit: '8/24/2024' },
];

/**
 * PatientDBScreen Component
 * Main screen for displaying the patient database
 */
const PatientDBScreen: React.FC = () => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<any>>();
  
  // State for patient data
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients data
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchPatients = async () => {
      try {
        // Simulate API loading delay
        setTimeout(() => {
          setPatients(MOCK_PATIENTS);
          setIsLoading(false);
        }, 1000);
        
        // When we have a real API, we would do:
        // const response = await fetch('api_endpoint_here');
        // const data = await response.json();
        // setPatients(data);
      } catch (err) {
        setError('Failed to load patients');
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    // Navigate to patient details screen with the selected patient data
    navigation.navigate('PatientDetail', { patient });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.backgroundContainer}>
          <DashboardBackground fill={colors.main.secondary} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Patient Database</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <PatientList 
              patients={patients} 
              onPatientSelect={handlePatientSelect}
              isLoading={isLoading}
              theme={theme}
            />
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backgroundContainer: {
    position: "absolute",
    width: 390,
    height: 774,
    left: 0,
    bottom: 0,
    transform: [{ scale: 1 }],
    transformOrigin: "bottom left",
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.base.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: colors.main.error,
    fontSize: 16,
    textAlign: 'center',
  },
});

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backgroundContainer: {
    position: "absolute",
    width: 390,
    height: 774,
    left: 0,
    bottom: 0,
    transform: [{ scale: 1 }],
    transformOrigin: "bottom left",
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.base.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: colors.main.error,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PatientDBScreen;
