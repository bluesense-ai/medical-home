import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  Animated,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import DashboardBackground from "../../../components/DashboardBackground";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RecordingAnimation from "./RecordingAnimation";
import EditForm from "./EditForm";
import SuccessModal from "./SuccessModal";
import FormContent from "./FormContent";
import RecordingControls from "./RecordingControls";

// Define navigation parameter types
type PatientSoapNotesParams = {
  PatientSoapNotes: {
    patientName: string;
    historyItem?: {
      id: string;
      diagnosis: string;
      date: string;
    };
  };
};

/**
 * PatientSoapNotesScreen Component
 * Displays SOAP notes interface for a patient's visit
 */
const PatientSoapNotesScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<PatientSoapNotesParams, 'PatientSoapNotes'>>();
  const { patientName, historyItem } = route.params || { 
    patientName: '', 
    historyItem: undefined
  };

  // State for recording status
  const [isRecording, setIsRecording] = useState(false);
  // State for recording progress
  const [recordingProgress, setRecordingProgress] = useState(30);
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const copyButtonFade = useRef(new Animated.Value(1)).current;
  
  // Form control states
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    fileUploaded: false,
    transcriptionComplete: false,
    updating: false
  });
  
  // Form data state
  const [formData, setFormData] = useState({
    visit: '',
    dateTime: '',
    serviceType: '',
    subjective: '',
    objective: '',
    plan: '',
    notes: '',
    link: ''
  });

  // Animation transitions for recording state
  useEffect(() => {
    if (isRecording) {
      // Hide copy button, show recording animation
      Animated.parallel([
        Animated.timing(copyButtonFade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Hide recording animation, show copy button
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(copyButtonFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isRecording, fadeAnim, copyButtonFade]);

  // Simulated progress animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingProgress(prev => {
          const newProgress = prev + 0.5;
          // Reset progress when reaching 100%
          return newProgress > 100 ? 30 : newProgress;
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Handle going back to history detail
  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditMode(false);
    } else {
      navigation.goBack();
    }
  };
  
  // Handle editing information
  const handleEdit = () => {
    console.log("Edit SOAP notes information");
    setIsEditing(true);
    setEditMode(true);
  };

  // Handle saving the edits
  const handleSaveEdits = () => {
    // Show success modal
    setShowSuccessModal(true);
    
    // Set timers for animation
    setTimeout(() => {
      setUpdateStatus({...updateStatus, fileUploaded: true});
      
      setTimeout(() => {
        setUpdateStatus({...updateStatus, fileUploaded: true, transcriptionComplete: true});
        
        setTimeout(() => {
          setUpdateStatus({fileUploaded: true, transcriptionComplete: true, updating: true});
          
          // Close modal and exit edit mode after all operations are complete
          setTimeout(() => {
            setShowSuccessModal(false);
            setIsEditing(false);
            setEditMode(false);
            // Show success message or other notification here
            
            // Reset states
            setUpdateStatus({
              fileUploaded: false,
              transcriptionComplete: false,
              updating: false
            });
          }, 1000);
        }, 1000);
      }, 1000);
    }, 500);
  };

  // Toggle recording state
  const handleRecording = () => {
    if (isRecording) {
      // When recording is stopped, process the audio recording
      console.log("Audio recording stopped and saved");
      // API save operation will be performed here
      
      // Update recording state
      setIsRecording(false);
      
      // Clear recording from memory (Optimization)
      // In a real application, reset the audio recording reference returned by the API
      setTimeout(() => {
        // Reset recording reference (placeholder)
        console.log("Audio recording cleared from RAM");
        
        // Reset progress bar
        setRecordingProgress(30);
      }, 500);
    } else {
      // Start recording
      setRecordingProgress(30);
      setIsRecording(true);
    }
  };

  // Handle copying SOAP notes
  const handleCopySoapNotes = () => {
    console.log("Copying SOAP notes");
    // Will be implemented when API is ready
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEdit}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>{patientName} Visit</Text>
          
          {/* Recording controls */}
          <RecordingControls
            isRecording={isRecording}
            onToggleRecording={handleRecording}
            onCopySoapNotes={handleCopySoapNotes}
            recordingProgress={recordingProgress}
            fadeAnim={fadeAnim}
            copyButtonFade={copyButtonFade}
          />
          
          {/* Form content */}
          <FormContent 
            formData={formData}
            onInputChange={handleInputChange}
          />
          
          {/* Edit form modal */}
          <EditForm 
            visible={editMode}
            formData={formData}
            onInputChange={handleInputChange}
            onCancel={() => {
              setEditMode(false);
              setIsEditing(false);
            }}
            onSave={handleSaveEdits}
          />
          
          {/* Success modal */}
          <SuccessModal
            visible={showSuccessModal}
            status={updateStatus}
            onRequestClose={() => setShowSuccessModal(false)}
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
    marginBottom: 20,
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
    fontSize: 16,
    fontWeight: "600",
    color: colors.base.black,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.base.black,
    textAlign: "center",
    marginBottom: 24,
  },
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    height: 120, // Düşük boyutlar için 120px yeterli
    position: 'relative',
  },
  recordingAnimationWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  recordButtonWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  copyButtonWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  recordButton: {
    backgroundColor: colors.main.error,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    gap: 6,
  },
  recordButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '500',
  },
  copyButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '70%',
  },
  buttonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "medium",
    color: colors.base.black,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.base.white,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.base.black,
  },
  multilineInput: {
    backgroundColor: colors.base.white,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.base.black,
    textAlignVertical: 'top',
    minHeight: 100,
  },
});

export default PatientSoapNotesScreen; 