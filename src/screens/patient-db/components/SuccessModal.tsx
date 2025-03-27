import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';

interface StatusType {
  fileUploaded: boolean;
  transcriptionComplete: boolean;
  updating: boolean;
}

interface SuccessModalProps {
  visible: boolean;
  status: StatusType;
  onRequestClose: () => void;
}

/**
 * SuccessModal Component
 * 
 * Modal component that displays upload status
 */
const SuccessModal: React.FC<SuccessModalProps> = ({ 
  visible, 
  status, 
  onRequestClose 
}) => {
  // Animated value for spinner animation
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Rotation animation
  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
    
    return () => {
      spinAnim.setValue(0);
    };
  }, [visible, spinAnim]);

  // Convert 0-1 value to 0-360 degrees
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Updating Provider Notes</Text>
          
          <View style={styles.statusItem}>
            <View style={[
              styles.statusIcon, 
              status.fileUploaded ? styles.successIcon : styles.loadingIcon
            ]}>
              {status.fileUploaded ? (
                <Ionicons name="checkmark" size={18} color="white" />
              ) : (
                <Animated.View 
                  style={[
                    styles.spinner, 
                    { transform: [{ rotate: spin }] }
                  ]} 
                />
              )}
            </View>
            <Text style={styles.statusText}>File Uploaded Succesfully</Text>
          </View>
          
          <View style={styles.statusItem}>
            <View style={[
              styles.statusIcon, 
              status.transcriptionComplete ? styles.successIcon : styles.loadingIcon
            ]}>
              {status.transcriptionComplete ? (
                <Ionicons name="checkmark" size={18} color="white" />
              ) : (
                status.fileUploaded && 
                <Animated.View 
                  style={[
                    styles.spinner, 
                    { transform: [{ rotate: spin }] }
                  ]} 
                />
              )}
            </View>
            <Text style={styles.statusText}>Getting transcription</Text>
          </View>
          
          <View style={styles.statusItem}>
            <View style={[
              styles.statusIcon,
              status.updating ? styles.loadingIcon : styles.pendingIcon
            ]}>
              {status.updating && 
                <Animated.View 
                  style={[
                    styles.spinner, 
                    { transform: [{ rotate: spin }] }
                  ]} 
                />
              }
            </View>
            <Text style={styles.statusText}>Updating</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: colors.base.white,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
    marginBottom: 24,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: colors.legacy.lightGray,
  },
  successIcon: {
    backgroundColor: '#4CAF50', // Green
  },
  pendingIcon: {
    backgroundColor: colors.main.info, // Blue (info color)
  },
  loadingIcon: {
    backgroundColor: colors.main.info, // Blue (info color)
  },
  statusText: {
    fontSize: 14,
    color: colors.base.black,
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    borderTopColor: 'transparent',
  },
});

export default SuccessModal; 