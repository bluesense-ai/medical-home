import React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Props for TimePickerModal component
 * @property {boolean} visible - Whether the modal is visible or not
 * @property {boolean} isStartPicker - Whether this is for start time (true) or end time (false)
 * @property {Date} currentTime - The currently selected time
 * @property {Function} onClose - Function to call when modal is closed without selection
 * @property {Function} onTimeSelected - Function to call when a time is selected
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface TimePickerModalProps {
  visible: boolean;
  isStartPicker: boolean;
  currentTime: Date;
  onClose: () => void;
  onTimeSelected: (time: Date, isStartTime: boolean) => void;
  theme: string;
}

/**
 * TimePickerModal Component
 * 
 * This component provides a platform-specific time picker interface
 * It uses a spinner for iOS and a custom list UI for Android
 */
const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  isStartPicker,
  currentTime,
  onClose,
  onTimeSelected,
  theme
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;

  // Generate time list for picker
  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        times.push(time);
      }
    }
    return times;
  };

  if (Platform.OS === 'ios') {
    return (
      <>
        {visible && (
          <DateTimePicker
            value={currentTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={(event, selectedDate) => {
              onClose();
              if (event.type === 'set' && selectedDate) {
                onTimeSelected(selectedDate, isStartPicker);
              }
            }}
          />
        )}
      </>
    );
  }

  // Android picker modal
  const times = generateTimeList();
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View 
        style={styles.modalContainer} 
        onTouchEnd={onClose}
      >
        <View 
          style={styles.modalContent}
          onTouchEnd={e => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Text 
              style={[styles.modalButtonText, { color: colors.main.error }]}
              onPress={onClose}
            >
              Cancel
            </Text>
            <Text style={[styles.modalButtonText, { fontWeight: '700' }]}>
              {isStartPicker ? 'Select Start Time' : 'Select End Time'}
            </Text>
            <Text 
              style={[styles.modalButtonText, { color: colors.main.primary }]}
              onPress={onClose}
            >
              Done
            </Text>
          </View>
          <View style={styles.androidPickerContainer}>
            <FlatList
              data={times}
              keyExtractor={(item) => item.toISOString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.timeItem,
                    {
                      backgroundColor: 
                        moment(item).isSame(currentTime, 'minute')
                          ? theme === 'dark' ? colors.base.darkGray : colors.base.lightGray
                          : 'transparent'
                    }
                  ]}
                  onTouchEnd={() => onTimeSelected(item, isStartPicker)}
                >
                  <Text style={[styles.timeItemText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
                    {moment(item).format('h:mm A')}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              getItemLayout={(data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              initialScrollIndex={Math.floor(moment(currentTime).hour() * 4)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.base.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalButtonText: {
    color: colors.base.black,
    fontSize: 16,
    fontWeight: '600',
  },
  androidPickerContainer: {
    height: 300,
    backgroundColor: colors.base.white,
    borderRadius: 8,
    margin: 16,
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  timeItemText: {
    color: colors.base.black,
    fontSize: 16,
    fontWeight: '500',
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.base.darkGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  androidPickerContainer: {
    height: 300,
    backgroundColor: colors.base.darkGray,
    borderRadius: 8,
    margin: 16,
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  timeItemText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TimePickerModal; 