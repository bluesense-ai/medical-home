import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';

/**
 * Props for FormLayout component
 * @property {Function} onCancel - Function to call when cancel button is pressed
 * @property {Function} onSubmit - Function to call when submit button is pressed
 * @property {boolean} isLoading - Whether the form is in loading state
 * @property {boolean} isDisabled - Whether the submit button should be disabled
 * @property {React.ReactNode} children - Content to render inside the form layout
 * @property {string} theme - Current theme ('dark' or 'light')
 * @property {Date} selectedDate - Selected date for the event (used for month display)
 */
interface FormLayoutProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  children: React.ReactNode;
  theme: string;
  selectedDate?: Date;
}

/**
 * FormLayout Component
 * 
 * This component provides a consistent layout structure for forms,
 * including header, content area, footer, and loading overlay
 */
const FormLayout: React.FC<FormLayoutProps> = ({
  onCancel,
  onSubmit,
  isLoading,
  isDisabled,
  children,
  theme,
  selectedDate
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const backgroundColor = theme === 'dark' ? colors.base.darkGray : colors.main.primary;
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={backgroundColor} 
        translucent
      />
      
      <FormHeader 
        onCancel={onCancel} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        theme={theme}
        selectedDate={selectedDate} 
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add Event Name</Text>
        <View style={styles.separator} />
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            {children}
          </View>
        </View>

        <FormFooter 
          onCancel={onCancel}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isDisabled={isDisabled}
          theme={theme}
        />
      </ScrollView>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme === 'dark' ? colors.base.white : colors.main.primary} />
          <Text style={styles.loadingText}>Adding event...</Text>
        </View>
      )}
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.base.white,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: colors.base.black,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.legacy.lightGray,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: colors.base.white,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.legacy.lightGray,
  },
});

export default FormLayout; 