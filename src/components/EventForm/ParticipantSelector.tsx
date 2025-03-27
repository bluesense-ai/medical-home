import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

// Mock data for participant suggestions
const MOCK_PARTICIPANTS = [
  'Dr. Smith',
  'Dr. Johnson',
  'Dr. Williams',
  'Dr. Brown',
  'Dr. Jones',
  'Dr. Garcia',
  'Dr. Miller',
  'Dr. Davis',
  'Dr. Rodriguez',
  'Dr. Martinez',
];

/**
 * Props for ParticipantSelector component
 * @property {Array<string>} selectedParticipants - List of selected participants
 * @property {Function} onParticipantAdd - Function to call when a participant is added
 * @property {Function} onParticipantRemove - Function to call when a participant is removed
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface ParticipantSelectorProps {
  selectedParticipants: string[];
  onParticipantAdd: (participant: string) => void;
  onParticipantRemove: (participant: string) => void;
  theme: string;
}

/**
 * ParticipantSelector Component
 * 
 * This component provides an interface for selecting and managing
 * event participants
 */
const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  selectedParticipants,
  onParticipantAdd,
  onParticipantRemove,
  theme
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filter participants based on search query
  const filteredParticipants = MOCK_PARTICIPANTS.filter(
    p => p.toLowerCase().includes(searchQuery.toLowerCase()) && 
    !selectedParticipants.includes(p)
  );
  
  const handleParticipantSelect = (participant: string) => {
    onParticipantAdd(participant);
    setSearchQuery('');
    setShowSuggestions(false);
  };
  
  return (
    <View style={styles.container}>
      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search participants..."
          placeholderTextColor={theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setShowSuggestions(!!text);
          }}
          onFocus={() => setShowSuggestions(!!searchQuery)}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => setShowSuggestions(!showSuggestions)}
        >
          <Ionicons 
            name={showSuggestions ? "close" : "search"} 
            size={20} 
            color={theme === 'dark' ? colors.base.white : colors.base.black} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Participant suggestions */}
      {showSuggestions && filteredParticipants.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredParticipants}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleParticipantSelect(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        </View>
      )}
      
      {/* Selected participants */}
      {selectedParticipants.length > 0 && (
        <View style={styles.selectedContainer}>
          {selectedParticipants.map((participant) => (
            <View key={participant} style={styles.participantTag}>
              <Text style={styles.participantName}>{participant}</Text>
              <TouchableOpacity onPress={() => onParticipantRemove(participant)}>
                <Ionicons 
                  name="close-circle" 
                  size={16} 
                  color={theme === 'dark' ? colors.base.white : colors.base.black} 
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: colors.base.black,
    fontSize: 12,
  },
  searchButton: {
    padding: 8,
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionsList: {
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.legacy.lightGray,
  },
  suggestionText: {
    color: colors.base.black,
    fontSize: 12,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.legacy.lightGray,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
  },
  participantName: {
    color: colors.base.black,
    fontSize: 12,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: colors.base.white,
    fontSize: 12,
  },
  searchButton: {
    padding: 8,
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionsList: {
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.legacy.lightGray,
  },
  suggestionText: {
    color: colors.base.white,
    fontSize: 12,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
  },
  participantName: {
    color: colors.base.white,
    fontSize: 12,
  },
});

export default ParticipantSelector; 