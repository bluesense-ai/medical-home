import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../../theme/colors';

interface RecordingAnimationProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  progress?: number; // Value between 0-100
}

/**
 * RecordingAnimation Component
 * Component that displays the recording status and animation
 */
const RecordingAnimation: React.FC<RecordingAnimationProps> = ({
  isRecording,
  onToggleRecording,
  progress = 30, // Default progress, will be dynamic in real application
}) => {
  // Animation value
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Start pulse animation when recording begins
  useEffect(() => {
    let animationRef: Animated.CompositeAnimation | null = null;
    
    if (isRecording) {
      animationRef = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.start();
    } else {
      pulseAnim.setValue(1);
    }
    
    return () => {
      if (animationRef) {
        animationRef.stop();
      }
    };
  }, [isRecording, pulseAnim]);

  // Don't show anything when not recording
  if (!isRecording) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.recordingButton}
        onPress={onToggleRecording}
      >
        <View style={styles.stopIconContainer}>
          <View style={styles.stopIcon} />
        </View>
        <Text style={styles.recordingText}>
          Stop recording
        </Text>
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
          <Animated.View 
            style={[
              styles.progressDot,
              {
                left: `${progress}%`,
                transform: [{ scale: pulseAnim }],
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  recordingButton: {
    backgroundColor: colors.base.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.main.error,
  },
  recordingText: {
    color: colors.main.error,
    fontSize: 14,
    fontWeight: '500',
  },
  stopIconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIcon: {
    width: 10,
    height: 10,
    backgroundColor: colors.main.error,
    borderRadius: 2,
  },
  progressContainer: {
    width: '70%',
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E1F1FF', // Light blue background
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.main.secondary, // Green fill
    borderRadius: 4,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.main.secondary,
    position: 'absolute',
    top: -3,
    marginLeft: -7, // Centers the dot
  },
});

export default RecordingAnimation; 