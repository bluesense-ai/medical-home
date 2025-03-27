import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { colors } from '../../../theme/colors';

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

interface FormContentProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

/**
 * FormContent Component
 * 
 * Component that displays SOAP notes form fields
 */
const FormContent: React.FC<FormContentProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>(Last name, First name) Visit</Text>
        <TextInput
          style={styles.input}
          value={formData.visit}
          onChangeText={(text) => onInputChange('visit', text)}
          placeholder=""
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Date and Time</Text>
        <TextInput
          style={styles.input}
          value={formData.dateTime}
          onChangeText={(text) => onInputChange('dateTime', text)}
          placeholder=""
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Service Type</Text>
        <TextInput
          style={styles.input}
          value={formData.serviceType}
          onChangeText={(text) => onInputChange('serviceType', text)}
          placeholder=""
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Subjective</Text>
        <TextInput
          style={styles.multilineInput}
          value={formData.subjective}
          onChangeText={(text) => onInputChange('subjective', text)}
          placeholder=""
          multiline={true}
          numberOfLines={4}
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Objective</Text>
        <TextInput
          style={styles.multilineInput}
          value={formData.objective}
          onChangeText={(text) => onInputChange('objective', text)}
          placeholder=""
          multiline={true}
          numberOfLines={4}
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Plan</Text>
        <TextInput
          style={styles.multilineInput}
          value={formData.plan}
          onChangeText={(text) => onInputChange('plan', text)}
          placeholder=""
          multiline={true}
          numberOfLines={4}
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.multilineInput}
          value={formData.notes}
          onChangeText={(text) => onInputChange('notes', text)}
          placeholder=""
          multiline={true}
          numberOfLines={4}
          editable={false}
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Link</Text>
        <TextInput
          style={styles.input}
          value={formData.link}
          onChangeText={(text) => onInputChange('link', text)}
          placeholder=""
          editable={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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

export default FormContent; 