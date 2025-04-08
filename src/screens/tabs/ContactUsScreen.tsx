import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, StatusBar, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { FontAwesome, MaterialIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';

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
                <MaterialIcons name="email" size={35} color="white" style={styles.icon} />
                <Text style={styles.emailText}>reception@pacmc.com</Text>
              </View>

              <View style={styles.phoneContainer}>
                <MaterialIcons name="phone" size={35} color="white" style={styles.icon} />
                <Text style={styles.phoneText}>306-922-2002</Text>
              </View>

              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={35} color="white" style={styles.icon} />
                <Text style={styles.locationText}>1135 Central Avenue</Text>
              </View>
            </View>

            <View style={styles.socialMediaContainer}>
              <FontAwesome name="linkedin-square" size={28} color="white" style={styles.socialMediaIcons} />
              <FontAwesome6 name="x-twitter" size={28} color="white" style={styles.socialMediaIcons} />
              <FontAwesome name="instagram" size={28} color="white" style={styles.socialMediaIcons} />
              <FontAwesome name="facebook-square" size={28} color="white" style={styles.socialMediaIcons} />
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
    marginRight: 10,
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
  },
});

export default ContactUsScreen; 