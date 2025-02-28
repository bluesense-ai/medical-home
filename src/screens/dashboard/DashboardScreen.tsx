import React, { useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Router';
import { colors } from '../../theme/colors';
import DashboardBackground from '../../components/DashboardBackground';
import AnimatedSection from '../../components/AnimatedSection';
import DashboardMenuButtons from '../../components/DashboardMenuButtons';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Background Shape */}
        <View style={styles.backgroundContainer}>
          <DashboardBackground />
        </View>

        {/* Profile Image */}
        <AnimatedSection isInitial delay={100} style={styles.header}>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Image
              source={require('../../../assets/images/profile-placeholder.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </AnimatedSection>

        {/* Menu Buttons */}
        <View style={styles.content}>
          <DashboardMenuButtons />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 40,
  },
  backgroundContainer: {
    position: 'absolute',
    top: -100,
    left: -20,
    right: -20,
    height: "100%",
    zIndex: -1,
    transform: [{ scale: 1.2 }],
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 74,
    paddingBottom: 19,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  profileButton: {
    width: 58,
    height: 58,
    overflow: 'hidden',
    borderRadius: 29,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 29,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:70,
  },
});

export default DashboardScreen; 