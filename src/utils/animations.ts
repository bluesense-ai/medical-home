/**
 * Animation Utilities
 * Reusable animation functions for consistent UI animations
 */
import { Animated } from 'react-native';

/**
 * Creates a shake animation sequence for error feedback
 * @param animValue - The Animated.Value to animate
 * @param duration - Duration of each animation step in ms
 * @param distance - Distance to shake in pixels
 * @returns Animation sequence function
 */
export const shakeAnimation = (
  animValue: Animated.Value,
  duration: number = 100,
  distance: number = 10
) => {
  return Animated.sequence([
    Animated.timing(animValue, {
      toValue: -distance,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: distance,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: -distance,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }),
  ]);
};

/**
 * Creates a fade in animation
 * @param animValue - The Animated.Value to animate
 * @param duration - Duration of animation in ms
 * @returns Animation function
 */
export const fadeInAnimation = (
  animValue: Animated.Value,
  duration: number = 800
) => {
  return Animated.timing(animValue, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

/**
 * Creates a fade out animation
 * @param animValue - The Animated.Value to animate
 * @param duration - Duration of animation in ms
 * @returns Animation function
 */
export const fadeOutAnimation = (
  animValue: Animated.Value,
  duration: number = 300
) => {
  return Animated.timing(animValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

/**
 * Creates a slide in animation from bottom
 * @param animValue - The Animated.Value to animate
 * @param duration - Duration of animation in ms
 * @returns Animation function
 */
export const slideInAnimation = (
  animValue: Animated.Value,
  duration: number = 800
) => {
  return Animated.timing(animValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

/**
 * Creates a slide out animation to bottom
 * @param animValue - The Animated.Value to animate
 * @param duration - Duration of animation in ms
 * @param distance - Distance to slide in pixels
 * @returns Animation function
 */
export const slideOutAnimation = (
  animValue: Animated.Value,
  duration: number = 300,
  distance: number = 100
) => {
  return Animated.timing(animValue, {
    toValue: distance,
    duration,
    useNativeDriver: true,
  });
};

/**
 * Creates a standard animation sequence for screen transitions
 * @param fadeAnim - Fade animation value
 * @param slideAnim - Slide animation value
 * @param callback - Function to call after animation completes
 */
export const transitionOutAnimation = (
  fadeAnim: Animated.Value,
  slideAnim: Animated.Value,
  callback: () => void
) => {
  Animated.parallel([
    fadeOutAnimation(fadeAnim),
    slideOutAnimation(slideAnim, 300, 50),
  ]).start(callback);
};

/**
 * Creates a standard animation sequence for screen entries
 * @param fadeAnim - Fade animation value
 * @param slideAnim - Slide animation value
 * @param inputAnim - Input elements fade animation value
 */
export const transitionInAnimation = (
  fadeAnim: Animated.Value,
  slideAnim: Animated.Value,
  inputAnim: Animated.Value
) => {
  Animated.parallel([
    fadeInAnimation(fadeAnim),
    slideInAnimation(slideAnim),
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 1000,
      delay: 400,
      useNativeDriver: true,
    }),
  ]).start();
};

export default {
  shakeAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  slideInAnimation,
  slideOutAnimation,
  transitionOutAnimation,
  transitionInAnimation,
}; 