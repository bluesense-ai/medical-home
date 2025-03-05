import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, Linking, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../navigation/BottomTabs';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import BackgroundShape from '../../components/BackgroundShape';
import ActionButton from '../../components/Buttons/ActionButton';
import DoctorCard from '../../components/DoctorCard';
import ScrollAnimatedView from '../../components/ScrollAnimatedView';
import { DOCTORS } from '../../data/doctors';
import AnimatedSection from '../../components/AnimatedSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_IMAGE_WIDTH = 522;
const HERO_IMAGE_HEIGHT = 447;

const HomeScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

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
                source={require('../../../assets/images/profile-placeholder.png')} 
                style={styles.profileImage}
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

          {/* Contact Section */}
          <AnimatedSection scrollY={scrollY} index={8} style={styles.contactSection}>
            <Text style={{...styles.sectionTitle, color: colors.main.primary}}>Contact</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Email: <Text style={styles.contactLink} onPress={() => Linking.openURL('mailto:reception@pacmc.com')}>reception@pacmc.com</Text></Text>
              <Text style={styles.contactText}>Mobile: 306-922-2002</Text>
            </View>

          {/* Locations Section */}
            <Text style={{...styles.sectionTitle, color: colors.main.primary}}>Locations</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>Hope Health Centre</Text>
              <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=1135 Central Avenue Prince Albert, SK S6V 4V7')}>
                1135 Central Avenue{'\n'}Prince Albert, SK S6V 4V7
              </Text>

              <Text style={[styles.locationTitle, styles.secondLocation]}>Walmart Clinic</Text>
              <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=100 – 800 15th Street East Prince Albert, SK S6V 8E3')}>
                100 – 800 15th Street East{'\n'}Prince Albert, SK S6V 8E3
              </Text>
            </View>

          {/* Socials Section */}
            <Text style={{...styles.sectionTitle, color: colors.main.primary}}>Socials</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://linkedin.com')}>
                <Image source={require('../../../assets/icons/linkedin.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com')}>
                <Image source={require('../../../assets/icons/x.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://instagram.com')}>
                <Image source={require('../../../assets/icons/instagram.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://facebook.com')}>
                <Image source={require('../../../assets/icons/facebook.png')} style={styles.socialIcon} />
              </TouchableOpacity>
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
    height: 58,
    overflow: 'hidden',
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
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