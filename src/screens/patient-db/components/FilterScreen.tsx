import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
  ScrollView,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import DashboardBackground from '../../../components/DashboardBackground';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * FilterScreen Component
 * 
 * Modal screen for filtering patient data
 */
const FilterScreen: React.FC<{
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}> = ({ visible, onClose, onApplyFilters }) => {
  // Filter states
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [clinic, setClinic] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Dropdown states
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [clinicOpen, setClinicOpen] = useState(false);

  // Animation values
  const serviceTypeHeight = React.useRef(new Animated.Value(0)).current;
  const clinicHeight = React.useRef(new Animated.Value(0)).current;

  // Service type options
  const serviceTypes = [
    'Consultation',
    'Annual Check-up',
    'Follow-up',
    'Emergency',
    'Vaccination'
  ];

  // Clinic options
  const clinics = [
    'Hope Health Centre',
    'City Medical Center',
    'Riverside Clinic',
    'Family Health Services'
  ];

  // Handle date change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Reset all filters
  const handleReset = () => {
    setServiceType(null);
    setClinic(null);
    setDate(null);
  };

  // Apply filters and close
  const handleApply = () => {
    const filters: FilterOptions = {
      serviceType,
      clinic,
      date
    };
    onApplyFilters(filters);
    onClose();
  };

  // Toggle dropdown for service type
  const toggleServiceTypeDropdown = () => {
    setServiceTypeOpen(!serviceTypeOpen);
    setClinicOpen(false); // Close other dropdown
    
    // Animate height
    Animated.timing(serviceTypeHeight, {
      toValue: serviceTypeOpen ? 0 : serviceTypes.length * 55, // Rough estimation of height
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Reset the other dropdown height
    Animated.timing(clinicHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };
  
  // Toggle dropdown for clinic
  const toggleClinicDropdown = () => {
    setClinicOpen(!clinicOpen);
    setServiceTypeOpen(false); // Close other dropdown
    
    // Animate height
    Animated.timing(clinicHeight, {
      toValue: clinicOpen ? 0 : clinics.length * 55, // Rough estimation of height
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Reset the other dropdown height
    Animated.timing(serviceTypeHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // Select service type
  const selectServiceType = (type: string) => {
    setServiceType(type);
    toggleServiceTypeDropdown();
  };
  
  // Select clinic
  const selectClinic = (clinic: string) => {
    setClinic(clinic);
    toggleClinicDropdown();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <View style={styles.backgroundContainer}>
          <DashboardBackground fill={colors.main.primary} />
        </View>
        
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.base.black} />
            </TouchableOpacity>
            <Text style={styles.title}>Filters</Text>
            <View style={{width: 40}} /> {/* Empty view for balanced header */}
          </View>
          
          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Service Type Filter */}
            <View style={styles.filterSection}>
              <TouchableOpacity 
                style={[
                  styles.filterButton,
                  serviceTypeOpen && styles.activeFilterButton
                ]}
                onPress={toggleServiceTypeDropdown}
              >
                <Text style={[
                  styles.filterButtonText,
                  serviceType && styles.selectedFilterText
                ]}>
                  {serviceType || 'Service Type'}
                </Text>
                <Ionicons 
                  name={serviceTypeOpen ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={colors.base.black} 
                />
              </TouchableOpacity>
              
              <Animated.View style={[
                styles.dropdownContainer,
                { height: serviceTypeHeight, overflow: 'hidden' }
              ]}>
                {serviceTypes.map((type, index) => (
                  <TouchableOpacity
                    key={`service-${index}`}
                    style={[
                      styles.optionItem,
                      serviceType === type && styles.selectedOption
                    ]}
                    onPress={() => selectServiceType(type)}
                  >
                    <Text style={[
                      styles.optionText,
                      serviceType === type && styles.selectedOptionText
                    ]}>
                      {type}
                    </Text>
                    {serviceType === type && (
                      <Ionicons name="checkmark" size={24} color={colors.main.secondary} />
                    )}
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </View>
            
            {/* Clinic Filter */}
            <View style={styles.filterSection}>
              <TouchableOpacity 
                style={[
                  styles.filterButton,
                  clinicOpen && styles.activeFilterButton
                ]}
                onPress={toggleClinicDropdown}
              >
                <Text style={[
                  styles.filterButtonText,
                  clinic && styles.selectedFilterText
                ]}>
                  {clinic || 'Clinic'}
                </Text>
                <Ionicons 
                  name={clinicOpen ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={colors.base.black} 
                />
              </TouchableOpacity>
              
              <Animated.View style={[
                styles.dropdownContainer,
                { height: clinicHeight, overflow: 'hidden' }
              ]}>
                {clinics.map((clinicName, index) => (
                  <TouchableOpacity
                    key={`clinic-${index}`}
                    style={[
                      styles.optionItem,
                      clinic === clinicName && styles.selectedOption
                    ]}
                    onPress={() => selectClinic(clinicName)}
                  >
                    <Text style={[
                      styles.optionText,
                      clinic === clinicName && styles.selectedOptionText
                    ]}>
                      {clinicName}
                    </Text>
                    {clinic === clinicName && (
                      <Ionicons name="checkmark" size={24} color={colors.main.secondary} />
                    )}
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </View>
            
            {/* Date Filter */}
            <View style={styles.filterSection}>
              <TouchableOpacity 
                style={[
                  styles.filterButton,
                  date && styles.activeFilterButton
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[
                  styles.filterButtonText,
                  date && styles.selectedFilterText
                ]}>
                  {date ? formatDate(date) : 'Date'}
                </Text>
                <Ionicons name="calendar" size={24} color={colors.base.black} />
              </TouchableOpacity>
              
              {showDatePicker && Platform.OS === 'android' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              
              {showDatePicker && Platform.OS === 'ios' && (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                  />
                  <View style={styles.datePickerButtonContainer}>
                    <TouchableOpacity 
                      style={styles.datePickerButton} 
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.datePickerButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.datePickerButton} 
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.datePickerButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
          
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// Types
export interface FilterOptions {
  serviceType: string | null;
  clinic: string | null;
  date: Date | null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.base.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.base.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.base.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.base.black,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.base.white,
  },
  activeFilterButton: {
    borderColor: colors.main.secondary,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.base.black,
  },
  selectedFilterText: {
    color: colors.main.secondary,
    fontWeight: '600',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.base.black,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.base.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.main.secondary + '10', // 10% opacity
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.base.black,
  },
  selectedOptionText: {
    color: colors.main.secondary,
    fontWeight: '600',
  },
  datePickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.base.black,
    marginTop: 10,
    paddingTop: 10,
  },
  datePickerButton: {
    padding: 10,
  },
  datePickerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.main.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.main.primary,
  },
  resetButtonText: {
    color: colors.main.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: colors.main.secondary,
  },
  applyButtonText: {
    color: colors.base.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FilterScreen; 