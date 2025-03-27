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
import { colors } from '../theme/colors';
import { ProviderBottomTabParamList, RootStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';

// Dashboard Screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DashboardEventsScreen from '../screens/dashboard/DashboardEventsScreen';
import YearlyCalendarScreen from '../screens/dashboard/YearlyCalendarScreen';
import EventFormScreen from '../screens/dashboard/EventFormScreen';
import EventDetailScreen from '../screens/dashboard/EventDetailScreen';

// AI Visits Screens
import Landing from '../screens/ai-visits/Landing';
import VisitPatient from '../screens/ai-visits/VisitPatient';
import VisitsPage from '../screens/ai-visits/VisitsPage';
import Dashboard from '../screens/ai-visits/Dashboard';

// Patient Database Screen
import PatientDBScreen from '../screens/patient-db/PatientDBScreen';
import PatientDetailScreen from '../screens/patient-db/components/PatientDetailScreen';
import PatientHistoryScreen from '../screens/patient-db/components/PatientHistoryScreen';
import PatientHistoryDetailScreen from '../screens/patient-db/components/PatientHistoryDetailScreen';
import PatientSoapNotesScreen from '../screens/patient-db/components/PatientSoapNotesScreen';

// AIVisitPatient type helper
type AIVisitPatientProps = {
  route: { params: { id: string } };
  navigation: any;
};

// Create stack navigators for each tab
const DashboardStack = createStackNavigator();
const DashboardStackScreen = () => (
  <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
    <DashboardStack.Screen name="DashboardMain" component={DashboardEventsScreen} />
    <DashboardStack.Screen name="EventDetail" component={EventDetailScreen} />
    <DashboardStack.Screen name="YearlyCalendar" component={YearlyCalendarScreen} />
    <DashboardStack.Screen name="EventForm" component={EventFormScreen} />
  </DashboardStack.Navigator>
);

const AIVisitsStack = createStackNavigator();
const AIVisitsStackScreen = () => (
  <AIVisitsStack.Navigator screenOptions={{ headerShown: false }}>
    <AIVisitsStack.Screen name="AIVisitsMain" component={Landing} />
    <AIVisitsStack.Screen name="VisitsPage" component={VisitsPage} />
    <AIVisitsStack.Screen 
      name="VisitPatient" 
      component={VisitPatient as React.ComponentType<any>} 
      initialParams={{ id: '' }} 
    />
    <AIVisitsStack.Screen name="Dashboard" component={Dashboard} />
  </AIVisitsStack.Navigator>
);

const PatientDatabaseStack = createStackNavigator();
const PatientDatabaseStackScreen = () => (
  <PatientDatabaseStack.Navigator screenOptions={{ headerShown: false }}>
    <PatientDatabaseStack.Screen name="PatientDatabaseMain" component={PatientDBScreen} />
    <PatientDatabaseStack.Screen name="PatientDetail" component={PatientDetailScreen} />
    <PatientDatabaseStack.Screen name="PatientHistory" component={PatientHistoryScreen} />
    <PatientDatabaseStack.Screen name="PatientHistoryDetail" component={PatientHistoryDetailScreen} />
    <PatientDatabaseStack.Screen name="PatientSoapNotes" component={PatientSoapNotesScreen} />
  </PatientDatabaseStack.Navigator>
);

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
        fadeAnim[i]!.setValue(1);
        scaleAnim[i]!.setValue(1);
        slideAnim[i]!.setValue(0);
      } else {
        fadeAnim[i]!.setValue(0);
        scaleAnim[i]!.setValue(0.85);
        slideAnim[i]!.setValue(i < state.index ? -15 : 15);
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
          Animated.spring(scaleAnim[i]!, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          // Fade in the label
          Animated.timing(fadeAnim[i]!, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          // Reset position
          Animated.spring(slideAnim[i]!, {
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
          Animated.spring(scaleAnim[i]!, {
            toValue: 0.85,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          // Fade out labels
          Animated.timing(fadeAnim[i]!, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          // Slide tabs away from the selected one
          Animated.spring(slideAnim[i]!, {
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

  // Get icon name based on route
  const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case 'Visits':
        return 'newspaper-outline';
      case 'Dashboard':
        return 'home-outline';
      case 'Database':
        return 'people-outline';
      default:
        return 'help-outline';
    }
  };

  // Memoize tab rendering for better performance
  const renderTabs = useMemo(() => {
    return state.routes.map((route, index) => {
      const descriptor = descriptors[route.key];
      const options = descriptor ? descriptor.options : {};
      
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
        >
          <Animated.View
            style={[
              styles.tabItem,
              isFocused && styles.tabItemFocused,
              {
                transform: [
                  { scale: scaleAnim[index] || new Animated.Value(1) },
                  { translateX: slideAnim[index] || new Animated.Value(0) },
                ] as any,
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
                style={styles.label}
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

const Tab = createBottomTabNavigator<ProviderBottomTabParamList>();

const ProviderBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen 
        name="Visits" 
        component={AIVisitsStackScreen} 
        options={{ tabBarLabel: 'Visits' }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardStackScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Database" 
        component={PatientDatabaseStackScreen}
        options={{ tabBarLabel: 'Database' }}
      />
    </Tab.Navigator>
  );
};

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
    backgroundColor: colors.main.secondary,
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

export default ProviderBottomTabs; 