import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

/**
 * Props for StaffSelector component
 * @property {string} staffName - Currently assigned staff name
 * @property {Function} onStaffChange - Function to call when staff is changed
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface StaffSelectorProps {
  staffName?: string;
  onStaffChange?: (name: string) => void;
  theme: string;
}

// Example staff list for suggestions
const STAFF_SUGGESTIONS = [
  'Dami Egbeyemi',
  'John Smith',
  'Sarah Johnson',
  'Michael Davis',
  'Emily Brown',
  'Robert Wilson',
  'Jessica Taylor'
];

/**
 * StaffSelector Component
 * 
 * This component provides an input field with autocomplete functionality to add staff members.
 * When typing, a dropdown list of matching staff members appears below the input.
 * Multiple staff members can be added and are displayed with avatars below the input field.
 */
const StaffSelector: React.FC<StaffSelectorProps> = ({
  staffName = '',
  onStaffChange,
  theme
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredStaff, setFilteredStaff] = useState<string[]>([]);
  
  // Initialize selected staff with the initial staffName if provided
  const [selectedStaff, setSelectedStaff] = useState<string[]>(() => {
    // If staffName is provided and is not empty, include it in the initial array
    return staffName ? [staffName] : [];
  });
  
  const inputRef = useRef<TextInput>(null);

  // Filter staff suggestions based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredStaff(STAFF_SUGGESTIONS);
    } else {
      const filtered = STAFF_SUGGESTIONS.filter(
        staff => staff.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredStaff(filtered);
    }
  }, [inputValue]);

  // Handle input focus
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  // Handle selecting a staff member
  const handleSelectStaff = (name: string) => {
    // Don't add duplicates
    if (!selectedStaff.includes(name)) {
      const newSelectedStaff = [name, ...selectedStaff];
      setSelectedStaff(newSelectedStaff);
      
      // Update the parent component with the first staff as the primary
      if (onStaffChange) {
        onStaffChange(name);
      }
    }
    
    setInputValue('');
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  // Handle adding a new staff member that's not in suggestions
  const handleAddNewStaff = () => {
    if (inputValue.trim() === '') return;
    
    handleSelectStaff(inputValue);
  };

  // Handle removing a staff member
  const handleRemoveStaff = (name: string) => {
    const newSelectedStaff = selectedStaff.filter(staff => staff !== name);
    setSelectedStaff(newSelectedStaff);
    
    // Update the parent component with the new primary staff (first in list)
    if (onStaffChange && newSelectedStaff.length > 0 && newSelectedStaff[0]) {
      onStaffChange(newSelectedStaff[0]);
    }
  };

  // Render a staff suggestion item
  const renderSuggestionItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity 
        style={styles.suggestionItem}
        onPress={() => handleSelectStaff(item)}
      >
        <View style={styles.avatar}>
          <Text style={styles.initial}>{item.charAt(0)}</Text>
        </View>
        <Text style={styles.staffName}>{item}</Text>
      </TouchableOpacity>
    );
  };

  // Render a selected staff item
  const renderSelectedStaffItem = (name: string, index: number) => {
    // Skip rendering if name is undefined
    if (!name) return null;
    
    return (
      <View key={`selected-${index}`} style={styles.selectedStaff}>
        <View style={styles.selectedStaffInfo}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{name.charAt(0)}</Text>
          </View>
          <Text style={styles.staffName}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveStaff(name)}>
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={theme === 'dark' ? colors.base.white : colors.base.black} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assigned Staff</Text>
      
      {/* Input for searching staff */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search staff member..."
        placeholderTextColor={theme === 'dark' ? colors.base.gray : colors.base.darkGray}
        value={inputValue}
        onChangeText={setInputValue}
        onFocus={handleInputFocus}
        onSubmitEditing={handleAddNewStaff}
        returnKeyType="done"
      />
      
      {/* Staff suggestions dropdown */}
      {showSuggestions && inputValue.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {/* Using simple ScrollView instead of FlatList to avoid nesting VirtualizedLists */}
          <ScrollView 
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            {filteredStaff.map((item, index) => (
              <TouchableOpacity 
                key={`suggestion-${index}`}
                style={styles.suggestionItem}
                onPress={() => handleSelectStaff(item)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.initial}>{item.charAt(0)}</Text>
                </View>
                <Text style={styles.staffName}>{item}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Add new staff option if not found in suggestions */}
            {inputValue.trim() !== '' && !filteredStaff.some(staff => 
              staff.toLowerCase() === inputValue.toLowerCase()
            ) && (
              <TouchableOpacity 
                style={[styles.suggestionItem, styles.addNewItem]}
                onPress={handleAddNewStaff}
              >
                <View style={[styles.avatar, styles.addNewAvatar]}>
                  <Ionicons name="add" size={18} color={colors.base.white} />
                </View>
                <Text style={styles.staffName}>Add "{inputValue}"</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}
      
      {/* Selected staff list */}
      {selectedStaff.length > 0 && (
        <View style={styles.selectedStaffContainer}>
          {selectedStaff.map((name, index) => renderSelectedStaffItem(name, index))}
        </View>
      )}
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 100, // Ensure dropdown appears above other elements
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.base.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 12,
    color: colors.base.black,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 78, // Position below input (label + input height + margin)
    left: 0,
    right: 0,
    backgroundColor: colors.base.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    maxHeight: 200,
    zIndex: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionsList: {
    maxHeight: 160,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.legacy.lightGray,
  },
  addNewItem: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
  },
  addNewAvatar: {
    backgroundColor: colors.main.secondary,
  },
  selectedStaffContainer: {
    marginTop: 5,
  },
  selectedStaff: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  selectedStaffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    color: colors.base.white,
    fontSize: 12,
    fontWeight: '600',
  },
  staffName: {
    fontSize: 12,
    color: colors.base.black,
  }
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 100,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.base.white,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    color: colors.base.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 78,
    left: 0,
    right: 0,
    backgroundColor: colors.base.darkGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxHeight: 200,
    zIndex: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  suggestionsList: {
    maxHeight: 160,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  addNewItem: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  addNewAvatar: {
    backgroundColor: colors.main.secondary,
  },
  selectedStaffContainer: {
    marginTop: 5,
  },
  selectedStaff: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  selectedStaffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: colors.main.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  staffName: {
    fontSize: 14,
    color: colors.base.white,
  }
});

export default StaffSelector; 