import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { colors } from '../../../theme/colors';
import DashboardBackground from '../../../components/DashboardBackground';

type FormData = {
  visit: string;
  dateTime: string;
  serviceType: string;
  subjective: string;
  objective: string;
  plan: string;
  notes: string;
  link: string;
};

interface EditFormProps {
  visible: boolean;
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

/**
 * EditForm Component
 * Full screen modal for editing form
 */
const EditForm: React.FC<EditFormProps> = ({ 
  visible, 
  formData, 
  onInputChange, 
  onCancel, 
  onSave 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        {/* Background */}
        <View style={styles.backgroundContainer}>
          <DashboardBackground fill={colors.main.primary} />
        </View>
        
        {/* Form content */}
        <View style={styles.formCardContainer}>
          <View style={styles.formCard}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={onSave}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.field}>
                <Text style={styles.label}>Name & Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.visit}
                  onChangeText={(text) => onInputChange('visit', text)}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  value={formData.dateTime}
                  onChangeText={(text) => onInputChange('dateTime', text)}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Service Type</Text>
                <TextInput
                  style={styles.input}
                  value={formData.serviceType}
                  onChangeText={(text) => onInputChange('serviceType', text)}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Subjective</Text>
                <TextInput
                  style={styles.multilineInput}
                  value={formData.subjective}
                  onChangeText={(text) => onInputChange('subjective', text)}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Objective</Text>
                <TextInput
                  style={styles.multilineInput}
                  value={formData.objective}
                  onChangeText={(text) => onInputChange('objective', text)}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Plan</Text>
                <TextInput
                  style={styles.multilineInput}
                  value={formData.plan}
                  onChangeText={(text) => onInputChange('plan', text)}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.field}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.multilineInput}
                  value={formData.notes}
                  onChangeText={(text) => onInputChange('notes', text)}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              
              <View style={[styles.field, styles.lastField]}>
                <Text style={styles.label}>Link</Text>
                <TextInput
                  style={styles.input}
                  value={formData.link}
                  onChangeText={(text) => onInputChange('link', text)}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

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
  formCardContainer: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    flex: 1,
    backgroundColor: colors.base.white,
    borderRadius: 16,
    overflow: 'hidden',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.legacy.lightGray,
  },
  cancelText: {
    fontSize: 16,
    color: colors.base.black,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.main.secondary,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  lastField: {
    marginBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.base.black,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.base.black,
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.base.black,
    textAlignVertical: 'top',
    minHeight: 120,
  },
});

export default EditForm; 