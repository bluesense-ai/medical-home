import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import DashboardBackground from "../../../components/DashboardBackground";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define navigation parameter types
type PatientHistoryDetailParams = {
  PatientHistoryDetail: {
    patientName: string;
    historyItem: {
      id: string;
      diagnosis: string;
      date: string;
    };
  };
};

/**
 * PatientHistoryDetailScreen Component
 * Displays details of a specific patient history entry
 */
const PatientHistoryDetailScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<PatientHistoryDetailParams, 'PatientHistoryDetail'>>();
  const { patientName, historyItem } = route.params || { 
    patientName: '', 
    historyItem: { id: '', diagnosis: '', date: '' } 
  };

  // Mock detail data
  const detailData = {
    clinic: "Walmart Clinic",
    serviceAssessment: "Short Visit",
    assessment: "Strained lower back muscles"
  };

  // Handle going back to history list
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle saving and generating SOAP notes
  const handleGenerateSoapNotes = () => {
    console.log("Generating SOAP notes");
    // Navigate to SOAP notes screen
    navigation.navigate('PatientSoapNotes', { 
      patientName,
      historyItem
    });
  };

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
          </View>
          
          <Text style={styles.patientHistoryTitle}>{patientName}'s History</Text>
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clinic</Text>
              <Text style={styles.sectionContent}>{detailData.clinic}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Service assesment</Text>
              <Text style={styles.sectionContent}>{detailData.serviceAssessment}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Assesment</Text>
              <Text style={styles.sectionContent}>{detailData.assessment}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={handleGenerateSoapNotes}
            >
              <Text style={styles.generateButtonText}>Save & Generate Soap Notes</Text>
            </TouchableOpacity>
          </ScrollView>
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
    justifyContent: "flex-start",
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
  patientHistoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.base.black,
    textAlign: "center",
    marginBottom: 32,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.base.black,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: colors.base.black,
  },
  generateButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  generateButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PatientHistoryDetailScreen; 