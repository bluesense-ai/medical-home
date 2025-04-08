import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  FlatList 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import DashboardBackground from "../../../components/DashboardBackground";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Patient } from "./PatientCard";

// Define navigation parameter types
type PatientHistoryParams = {
  PatientHistory: {
    patient: Patient;
  };
};

// Define history item type
interface HistoryItem {
  id: string;
  diagnosis: string;
  date: string;
}

// Mock history data
const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', diagnosis: 'Strained Lower Back', date: '8/28/2024' },
  { id: '2', diagnosis: 'Low White Blood Cells', date: '8/29/2024' },
  { id: '3', diagnosis: 'Flu Symptoms', date: '8/30/2024' },
  { id: '4', diagnosis: 'Headache syntoms', date: '7/31/2024' },
  { id: '5', diagnosis: 'Allergic Reaction', date: '7/15/2024' },
  { id: '6', diagnosis: 'Annual Checkup', date: '6/10/2024' },
  { id: '7', diagnosis: 'Blood Pressure Review', date: '5/22/2024' },
  { id: '8', diagnosis: 'COVID-19 Test', date: '4/18/2024' },
];

/**
 * PatientHistoryScreen Component
 * Displays a patient's medical history
 */
const PatientHistoryScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<PatientHistoryParams, 'PatientHistory'>>();
  const { patient } = route.params || { patient: { id: '', name: '', lastVisit: '' } };

  // Handle going back to patient details
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Handle editing history information
  const handleEdit = () => {
    console.log("Edit history information");
    // Will be implemented when API is ready
  };
  
  // Handle selecting a history item
  const handleSelectHistoryItem = (item: HistoryItem) => {
    // Navigate to history detail screen
    navigation.navigate('PatientHistoryDetail', {
      patientName: patient.name,
      historyItem: item
    });
  };
  
  // Render individual history item
  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => handleSelectHistoryItem(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.backgroundContainer}>
        <DashboardBackground fill={colors.main.secondary} />
      </View>
      
      <View style={styles.mainContent}>
        <View style={styles.formCard}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={colors.base.black} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEdit}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.patientHistoryTitle}>{patient.name}'s History</Text>
          
          <FlatList
            data={MOCK_HISTORY}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.historyList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? 100 : 0,
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    flex: 1,
    backgroundColor: colors.base.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.base.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  editButton: {
    padding: 8,
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.base.black,
  },
  patientHistoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.base.black,
    textAlign: "center",
    marginBottom: 32,
  },
  historyList: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: colors.main.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diagnosisText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.base.white,
  },
  dateText: {
    fontSize: 16,
    color: colors.base.white,
  },
});

export default PatientHistoryScreen; 