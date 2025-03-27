import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../navigation/BottomTabs';
import { colors } from '../../theme/colors';
import { usePatientStore } from '../../store/useUserStore';
import BackgroundShape from '../../components/BackgroundShape';
import ActionButton from '../../components/Buttons/ActionButton';
import DoctorCard from '../../components/DoctorCard';
import { DOCTORS } from '../../data/doctors';
import AnimatedSection from '../../components/AnimatedSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_IMAGE_WIDTH = 522;
const HERO_IMAGE_HEIGHT = 447;

const HomeScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const patient = usePatientStore((state) => state.patient);

  const handlePhysicianPress = () => {
    // Navigate to physicians list
  };

  return (
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
          <BackgroundShape />
        </View>

        {/* Header */}
        <AnimatedSection isInitial delay={100} style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
            <Image
              source={patient?.picture ? { uri: patient.picture } : require("../../../assets/icons/avatar.png")}
              style={patient?.picture ? styles.profileImage : styles.profileIcon}
            />
            </TouchableOpacity>
          </View>
        </AnimatedSection>

        <AnimatedSection isInitial delay={200} style={styles.headerContent}>
          <Text style={styles.title}>Hope Health Centre</Text>
          <Text style={styles.subtitle}>Welcome!</Text>
        </AnimatedSection>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Image */}
          <AnimatedSection isInitial delay={300} style={styles.heroContainer}>
            <Image 
              source={require('../../../assets/images/doctor-patient.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </AnimatedSection>

          {/* Action Button */}
          <AnimatedSection scrollY={scrollY} index={3} style={styles.buttonContainer}>
            <ActionButton 
              title="See our Physicians"
              onPress={handlePhysicianPress}
            />
          </AnimatedSection>

          {/* Physicians Section */}
          <AnimatedSection scrollY={scrollY} index={4} style={styles.physiciansSection}>
            <Text style={styles.sectionTitle}>Our physicians</Text>
            <Text style={styles.sectionDescription}>
              I'm not sure what you would put in this description but I'm pretty sure it could be something interesting that says something about the clinic
            </Text>

            {/* Doctor Cards */}
            <View style={styles.doctorsContainer}>
              {DOCTORS.map((doctor, index) => (
                <AnimatedSection key={doctor.id} scrollY={scrollY} index={5 + index} style={{ width: '100%' }}>
                  <DoctorCard
                    name={doctor.name}
                    title={doctor.title}
                    imageUrl={doctor.imageUrl}
                  />
                </AnimatedSection>
              ))}
            </View>
          </AnimatedSection>
        </View>
      </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 800,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 19,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'light',
    color: colors.base.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  profileButton: {
    width: 58,
    justifyContent: 'center',
    backgroundColor: colors.main.secondary,
    borderRadius: 50,
    alignItems: 'center',
    height: 58,
    overflow: 'hidden',
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileIcon: {
    width: 28,
    height: 28,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 200,
  },
  heroContainer: {
    width: HERO_IMAGE_WIDTH,
    height: HERO_IMAGE_HEIGHT,
    marginBottom: 24,
    marginLeft: -(HERO_IMAGE_WIDTH - SCREEN_WIDTH) / 2,
    overflow: 'visible',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    transform: [{scale: 1.2}],
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  physiciansSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'medium',
    color: colors.base.white,
    marginBottom: 24,
    paddingTop: 74,
  },
  sectionDescription: {
    fontSize: 16,
    color: colors.base.white,
    opacity: 0.9,
    fontWeight: 'semibold',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 32,
  },
  doctorsContainer: {
    paddingTop: 32,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  contactSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  contactInfo: {
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: colors.main.primary,
    marginBottom: 8,
  },
  contactLink: {
    textDecorationLine: 'underline',
    color: colors.alternativeLight.info,
  },
  locationsSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  locationInfo: {
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.main.primary,
    marginBottom: 8,
  },
  secondLocation: {
    marginTop: 24,
  },
  locationLink: {
    fontSize: 16,
    color: colors.alternativeLight.info,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 8,
  },
  socialsSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  socialButton: {
    width: 32,
    height: 32,
  },
  socialIcon: {
    width: 20,
    height: 20,
    tintColor: colors.main.info,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
});

export default HomeScreen; 