// BottomTabs.tsx
// A custom bottom tab navigator with modern design and smooth animations

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import colors from '../theme/colors';

// Import screens for tab navigation
import HomeScreen from '../screens/tabs/HomeScreen';
import HoursScreen from '../screens/tabs/HoursScreen';
import BookAppointmentScreen from '../screens/tabs/BookAppointmentScreen';
import ContactUsScreen from '../screens/tabs/ContactUsScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';

// Type definitions for tab navigation
export type BottomTabParamList = {
  Home: undefined;
  Hours: undefined;
  BookAppointment: undefined;
  ContactUs: undefined;
  Profile: undefined;
};

// Custom Tab Bar Component with animations
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // State to handle initial render animations
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Animation values for opacity, scale, and slide effects
  const fadeAnim = useRef(state.routes.map(() => new Animated.Value(0))).current;
  const scaleAnim = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const slideAnim = useRef(state.routes.map(() => new Animated.Value(0))).current;

  // Initialize animations on component mount
  useEffect(() => {
    // Set initial values for the selected tab
    state.routes.forEach((_, i) => {
      if (i === state.index) {
        fadeAnim[i].setValue(1);
        scaleAnim[i].setValue(1);
        slideAnim[i].setValue(0);
      } else {
        fadeAnim[i].setValue(0);
        scaleAnim[i].setValue(0.85);
        slideAnim[i].setValue(i < state.index ? -15 : 15);
      }
    });
    setIsFirstRender(false);
  }, [state.index]);

  // Handle tab press with animations
  const handlePress = useCallback((route: any, index: number) => {
    if (isFirstRender) return;

    // Provide haptic feedback for better UX
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate all tabs when one is selected
    state.routes.forEach((_, i) => {
      if (i === index) {
        // Animations for the selected tab
        Animated.parallel([
          // Scale up the selected tab
          Animated.spring(scaleAnim[i], {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          // Fade in the label
          Animated.timing(fadeAnim[i], {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          // Reset position
          Animated.spring(slideAnim[i], {
            toValue: 0,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Animations for unselected tabs
        Animated.parallel([
          // Scale down unselected tabs
          Animated.spring(scaleAnim[i], {
            toValue: 0.85,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          // Fade out labels
          Animated.timing(fadeAnim[i], {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          // Slide tabs away from the selected one
          Animated.spring(slideAnim[i], {
            toValue: i < index ? -15 : 15,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });

    // Handle navigation
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, [isFirstRender, navigation]);

  // Memoize tab rendering for better performance
  const renderTabs = useMemo(() => {
    return state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = typeof options.tabBarLabel === 'string'
        ? options.tabBarLabel
        : typeof options.title === 'string'
        ? options.title
        : route.name;

      const isFocused = state.index === index;

      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => handlePress(route, index)}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[
              styles.tabItem,
              isFocused && styles.tabItemFocused,
              {
                transform: [
                  { scale: scaleAnim[index] },
                  { translateX: slideAnim[index] },
                ],
              },
            ]}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={isFocused ? 18 : 23}
              color={isFocused ? colors.base.black : colors.base.white}
            />
            {isFocused && (
              <Animated.Text
                numberOfLines={1}
                style={[
                  styles.label,
                  { opacity: fadeAnim[index] }
                ]}
              >
                {label}
              </Animated.Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      );
    });
  }, [state.routes, state.index, handlePress]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBackground}>
        <View style={styles.tabRow}>
          {renderTabs}
        </View>
      </View>
    </View>
  );
}

// Get icon name based on route
function getIconName(routeName: string): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case 'Home':
      return 'home-outline'; //octions library home
    case 'Hours':
      return 'time-outline'; // FontAwesome6  clock-four
    case 'BookAppointment':
      return 'calendar-outline';
    case 'ContactUs': // octions calendar
      return 'call-outline';
    case 'Profile': 
      return 'person-outline'; // person-outline      MaterialIcons
      
    default:
      return 'help-outline';
  }
}

// ---------------------
// 3) Bottom Tabs Navigator
// ---------------------
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Hours" component={HoursScreen} />
      <Tab.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ tabBarLabel: 'Book Appointment' }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{ tabBarLabel: 'Contact us' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ---------------------
// 4) Styles
// ---------------------
const styles = StyleSheet.create({
  // Main container for the tab bar
  tabContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    height: 68,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  // Green rounded background
  tabBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary.green,
    borderRadius: 55,
    overflow: 'hidden',
  },
  // Horizontal row for tabs
  tabRow: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 19.38,
  },
  // Touchable area for each tab
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  // Container for icon and label
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    paddingHorizontal: 6,
  },
  // White pill for selected tab
  tabItemFocused: {
    backgroundColor: colors.base.white,
    borderRadius: 25,
    paddingHorizontal: 14.38,
    paddingVertical: 7.75,
  },
  // Label style for selected tab
  label: {
    color: colors.base.black,
    fontSize: 12,
    fontWeight: 'semibold',
    marginLeft: 8,
  },
});
