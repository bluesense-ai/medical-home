import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Animated, ViewStyle, Vibration } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';

// Screens
import HomeScreen from '../screens/tabs/HomeScreen';
import CalendarScreen from '../screens/tabs/CalendarScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  name: any;
  focused: boolean;
  title: string;
}

const ICON_SIZE = 24;
const SELECTED_ICON_SIZE = 18;
const TAB_HEIGHT = 68;
const TAB_PADDING = 17;
const TAB_HORIZONTAL_PADDING = 27.5;
const TAB_WIDTH = 60;
const SELECTED_TAB_WIDTH = 88;

const CustomTabBarIcon: React.FC<TabBarIconProps> = ({ name, focused, title }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (focused) {
      // Hafif dokunsal geri bildirim
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Bounce ve fade animasyonu
      Animated.sequence([
        // Önce küçült
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        // Sonra yukarı zıplat
        Animated.spring(bounceAnim, {
          toValue: 0,
          tension: 80,
          friction: 5,
          useNativeDriver: true,
        })
      ]).start();

      // Fade ve scale animasyonu
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Seçili değilse normal boyuta dön
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.9,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [focused]);

  return (
    <View style={styles.tabItem}>
      <Animated.View 
        style={[
          styles.iconContainer, 
          { 
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim }
            ] 
          }
        ]}
      >
        {focused ? (
          <View style={styles.tabItemFocused}>
            <Ionicons 
              name={name} 
              size={SELECTED_ICON_SIZE} 
              color={colors.base.black}
            />
            <Animated.View 
              style={[
                styles.labelContainer,
                { 
                  opacity: fadeAnim,
                  transform: [
                    { 
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0]
                      })
                    }
                  ]
                }
              ]}
            >
              <Text style={styles.label}>{title}</Text>
            </Animated.View>
          </View>
        ) : (
          <Ionicons 
            name={name} 
            size={ICON_SIZE} 
            color={colors.base.white}
          />
        )}
      </Animated.View>
    </View>
  );
};

const tabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    height: TAB_HEIGHT,
    backgroundColor: colors.primary.green,
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 10,
    borderRadius: 50,
    paddingVertical: TAB_PADDING,
    paddingHorizontal: TAB_HORIZONTAL_PADDING,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  tabBarShowLabel: false,
  headerShown: false,
};

const BottomTabs = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={tabBarOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon name="home-outline" focused={focused} title="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon name="time-outline" focused={focused} title="History" />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon name="calendar-outline" focused={focused} title="Calendar" />
            ),
          }}
        />
        <Tab.Screen
          name="Call"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon name="call-outline" focused={focused} title="Call" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon name="person-outline" focused={focused} title="Profile" />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TAB_WIDTH,
    height: 36,
    marginBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  tabItemFocused: {
    backgroundColor: colors.base.white,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SELECTED_TAB_WIDTH,
    height: '100%',
  },
  labelContainer: {
    marginLeft: 8,
  },
  label: {
    color: colors.base.black,
    fontSize: 12,
    fontWeight: 'semibold',
    textAlign: 'left',
  },
});

export default BottomTabs; 