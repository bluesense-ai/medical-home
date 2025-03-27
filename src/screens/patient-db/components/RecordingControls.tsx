import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import RecordingAnimation from './RecordingAnimation';

interface RecordingControlsProps {
  isRecording: boolean;
  recordingProgress: number;
  fadeAnim: Animated.Value;
  copyButtonFade: Animated.Value;
  onToggleRecording: () => void;
  onCopySoapNotes: () => void;
}

/**
 * RecordingControls Component
 * 
 * Component containing recording controls and buttons
 */
const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  recordingProgress,
  fadeAnim,
  copyButtonFade,
  onToggleRecording,
  onCopySoapNotes
}) => {
  return (
    <View style={styles.animationContainer}>
      {/* Recording animation - only visible during recording */}
      <Animated.View 
        style={[
          styles.recordingAnimationWrapper,
          { 
            opacity: fadeAnim, 
            zIndex: isRecording ? 1 : 0, 
            position: 'absolute', 
            width: '100%', 
            alignItems: 'center' 
          }
        ]}
      >
        <RecordingAnimation
          isRecording={isRecording}
          onToggleRecording={onToggleRecording}
          progress={recordingProgress}
        />
      </Animated.View>
      
      {/* Start recording button - only visible when not recording */}
      <Animated.View 
        style={[
          styles.recordButtonWrapper,
          { 
            opacity: copyButtonFade, 
            zIndex: isRecording ? 0 : 1, 
            position: 'absolute', 
            width: '100%', 
            alignItems: 'center' 
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.recordButton}
          onPress={onToggleRecording}
          disabled={isRecording}
        >
          <Ionicons name="mic" size={20} color={colors.base.white} />
          <Text style={styles.recordButtonText}>Start recording</Text>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Copy SOAP Notes button - only visible when not recording */}
      <Animated.View 
        style={[
          styles.copyButtonWrapper,
          { 
            opacity: copyButtonFade, 
            zIndex: isRecording ? 0 : 1, 
            position: 'absolute', 
            width: '100%', 
            alignItems: 'center', 
            top: 60 
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.copyButton}
          onPress={onCopySoapNotes}
          disabled={isRecording}
        >
          <Text style={styles.buttonText}>Copy SOAP notes</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    height: 120, // 120px is sufficient for small dimensions
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
});

export default RecordingControls; 