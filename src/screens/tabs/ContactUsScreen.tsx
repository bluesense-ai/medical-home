import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, StatusBar, Platform } from 'react-native';
import { colors } from '../../theme/colors';

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require('../../../assets/images/doctor-patient.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>Contact Us</Text>
            
            <View style={styles.contacts}>
              <View style={styles.emailContainer}>
                <Image source={require('../../../assets/icons/mail.png')} style={[styles.icon, { tintColor: 'white' }]} />
                <Text style={styles.emailText}>reception@pacmc.com</Text>
              </View>

              <View style={styles.phoneContainer}>
                <Image source={require('../../../assets/icons/call.png')} style={[styles.icon, { tintColor: 'white' }]} />
                <Text style={styles.phoneText}>306-922-2002</Text>
              </View>

              <View style={styles.locationContainer}>
                <Image source={require('../../../assets/icons/distance.png')} style={[styles.icon, { tintColor: 'white' }]} />
                <Text style={styles.locationText}>1135 Central Avenue</Text>
              </View>
            </View>

            <View style={styles.socialMediaContainer}>
              <Image source={require('../../../assets/icons/linkedin.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]} />
              <Image source={require('../../../assets/icons/x.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]} />
              <Image source={require('../../../assets/icons/instagram.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]} />
              <Image source={require('../../../assets/icons/facebook.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.3,
    transform: [{ scale: 1.2 }, { translateY: 100 }],
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    top: 55,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingBottom: 100,
    marginTop: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
    resizeMode: 'contain',
  },
  emailText: {
    fontSize: 22.5,
    fontWeight: 'medium',
    color: 'white',
  },
  phoneText: {
    fontSize: 22.5,
    fontWeight: 'medium',
    color: 'white',
  },
  locationText: {
    fontSize: 22.5,
    fontWeight: 'medium',
    color: 'white',
  },
  contacts: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  socialMediaIcons: {
    marginRight: 20,
    width: 26,
    height: 26,
  },
});

export default ContactUsScreen; 