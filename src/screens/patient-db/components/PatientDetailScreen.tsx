import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import DashboardBackground from "../../../components/DashboardBackground";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Patient } from "./PatientCard";
import FilterScreen, { FilterOptions } from "./FilterScreen";

// Define navigation parameter types
type PatientDetailParams = {
  PatientDetail: {
    patient: Patient;
  };
};

/**
 * PatientDetailScreen Component
 * Displays detailed information about a selected patient
 */
const PatientDetailScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<PatientDetailParams, 'PatientDetail'>>();
  const { patient } = route.params || { patient: { id: '', name: '', lastVisit: '' } };
  
  // State for filter modal
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    serviceType: null,
    clinic: null,
    date: null
  });

  // Mock patient details data
  const patientDetails = {
    fullName: patient.name,
    appointment: "Friday, March 14 2025",
    familyPhysician: "Dr. Sarah Johnson",
    age: "32",
    sex: "Female",
    clinic: "Hope Health Centre"
  };

  // Handle going back to patient list
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Handle editing patient information
  const handleEdit = () => {
    console.log("Edit patient information");
    // Will be implemented when API is ready
  };

  // Handle viewing patient history
  const handleHistory = () => {
    console.log("View patient history");
    // Navigate to patient history screen
    navigation.navigate('PatientHistory', { patient });
  };
  
  // Handle opening filter modal
  const handleOpenFilters = () => {
    setIsFilterModalVisible(true);
  };
  
  // Handle applying filters
  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
    // Here you would apply the filters to your data
  };

  // Check if any filters are active
  const hasActiveFilters = activeFilters.serviceType || activeFilters.clinic || activeFilters.date;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.backgroundContainer}>
        <DashboardBackground fill={colors.main.secondary} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
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
          
          <Text style={styles.patientName}>{patientDetails.fullName}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Appointment</Text>
            <Text style={styles.appointmentDate}>{patientDetails.appointment}</Text>
            
            <TouchableOpacity 
              style={styles.historyButton}
              onPress={handleHistory}
            >
              <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterContainer,
                hasActiveFilters && styles.activeFilterContainer
              ]}
              onPress={handleOpenFilters}
            >
              <Text style={[
                styles.filterText,
                hasActiveFilters && styles.activeFilterText
              ]}>
                Filters
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>Name & Last Name</Text>
            <TextInput
              style={styles.input}
              value={patientDetails.fullName}
              editable={false}
            />
            
            <Text style={styles.inputLabel}>Family Physician</Text>
            <TextInput
              style={styles.input}
              value={patientDetails.familyPhysician}
              editable={false}
            />
            
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={patientDetails.age}
              editable={false}
            />
            
            <Text style={styles.inputLabel}>Sex</Text>
            <TextInput
              style={styles.input}
              value={patientDetails.sex}
              editable={false}
            />
            
            <Text style={styles.inputLabel}>Clinic</Text>
            <TextInput
              style={styles.input}
              value={patientDetails.clinic}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Filter Modal */}
      <FilterScreen 
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  formCard: {
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
    marginBottom: 16,
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
  patientName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.base.black,
    textAlign: "center",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.base.black,
    marginBottom: 8,
  },
  appointmentDate: {
    fontSize: 12,
    color: colors.base.black,
    marginBottom: 20,
  },
  historyButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  historyButtonText: {
    color: colors.base.white,
    fontWeight: "600",
    fontSize: 12,
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: colors.base.darkGray,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  activeFilterContainer: {
    backgroundColor: colors.main.secondary,
    borderColor: colors.main.secondary,
  },
  filterText: {
    color: colors.base.darkGray,
    fontSize: 12,
  },
  activeFilterText: {
    color: colors.base.white,
    fontWeight: "600",
  },
  formSection: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.base.black,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.base.white,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 12,
    color: colors.base.black,
    marginBottom: 8,
  },
});

export default PatientDetailScreen; 