import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  scrollY?: Animated.Value;
  index?: number;
  isInitial?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0, 
  style, 
  scrollY,
  index = 0,
  isInitial = false
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (isInitial) {
      // Initial animation for first components
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          delay,
          useNativeDriver: true,
          damping: 15,
          stiffness: 100
        }),
      ]).start();
    } else if (scrollY) {
      // Scroll-based animation
      const startPosition = index * 150; // Increased for later start
      const scrollListener = scrollY.addListener(({ value }) => {
        const offset = value - startPosition;
        if (offset > 0 && offset < SCREEN_HEIGHT) {
          const progress = Math.min(1, offset / (SCREEN_HEIGHT / 3));
          translateY.setValue(50 * (1 - progress));
          fadeAnim.setValue(progress);
        } else if (offset <= 0) {
          translateY.setValue(50);
          fadeAnim.setValue(0);
        }
      });

      return () => {
        scrollY.removeListener(scrollListener);
      };
    }
  }, [delay, scrollY, index, isInitial]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedSection; 