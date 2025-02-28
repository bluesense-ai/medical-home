import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ScrollAnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollY: Animated.Value;
  index?: number;
}

const ScrollAnimatedView: React.FC<ScrollAnimatedViewProps> = ({ 
  children, 
  style, 
  scrollY, 
  index = 0 
}) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startPosition = index * 100;
    
    const scrollListener = scrollY.addListener(({ value }) => {
      const offset = value - startPosition;
      if (offset > 0 && offset < SCREEN_HEIGHT) {
        const progress = Math.min(1, offset / (SCREEN_HEIGHT / 2));
        translateY.setValue(50 * (1 - progress));
        opacity.setValue(progress);
      }
    });

    return () => {
      scrollY.removeListener(scrollListener);
    };
  }, [scrollY, index]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default ScrollAnimatedView; 