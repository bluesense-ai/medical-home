import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import { colors } from '../../theme/colors';

const ContactUsScreen = () => {
  return (
    <ImageBackground source={require('../../../assets/images/doctor-patient.png')} style={styles.container}>
      <View style={styles.overlay}></View>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contact Us</Text>
        </View>

        <View style={styles.contacts}>
          <View style={styles.emailContainer}>
            <Image source={require('../../../assets/icons/x.png')} style={[styles.emailIcon, { tintColor: 'white' }]} />
            <Text style={styles.emailText}>reception@pacmc.com</Text>
          </View>

          <View style={styles.phoneContainer}>
            <Image source={require('../../../assets/icons/x.png')} style={[styles.phoneIcon, { tintColor: 'white' }]} />

            <Text style={styles.phoneText}>306-922-2002</Text>
          </View>

          <View style={styles.locationContainer}>
            <Image source={require('../../../assets/icons/x.png')} style={[styles.locationIcon, { tintColor: 'white' }]} />

            <Text style={styles.locationText}>1135 Central Avenue</Text>
          </View>
        </View>

        <View style={styles.socialMediaContainer}>
          <Image source={require('../../../assets/icons/linkedin.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]}></Image>
          <Image source={require('../../../assets/icons/x.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]}></Image>
          <Image source={require('../../../assets/icons/instagram.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]}></Image>
          <Image source={require('../../../assets/icons/facebook.png')} style={[styles.socialMediaIcons, { tintColor: 'white' }]}></Image>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.main.primary,
    opacity: 0.8,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },
  title: {
    color: 'white',
    fontSize: 38,
  },
  emailContainer: {
    flexDirection: 'row',  // Display the icon and text in a row
    alignItems: 'center',  // Vertically center the text and icon
    marginBottom: 50,
  },
  emailIcon: {
    width: 24,  // Adjust the size of the icon
    height: 24,
    marginRight: 10,  // Space between icon and text
  },
  emailText: {
    fontSize: 24,
    color: 'white',  // Change text color to white for better readability
  },
  phoneContainer: {
    flexDirection: 'row',  // Display the icon and text in a row
    alignItems: 'center',  // Vertically center the text and icon
    marginBottom: 50,
  },
  phoneIcon: {
    width: 24,  // Adjust the size of the icon
    height: 24,
    marginRight: 10,  // Space between icon and text
  },
  phoneText: {
    fontSize: 24,
    color: 'white',  // Change text color to white for better readability
  },
  locationContainer: {
    flexDirection: 'row',  // Display the icon and text in a row
    alignItems: 'center',  // Vertically center the text and icon
    marginBottom: 50,
  },
  locationIcon: {
    width: 24,  // Adjust the size of the icon
    height: 24,
    marginRight: 10,  // Space between icon and text
  },
  locationText: {
    fontSize: 24,
    color: 'white',  // Change text color to white for better readability
  },
  contacts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 150,
    // backgroundColor: 'red',
    marginRight: 20,
    marginLeft: 60,
  },
  socialMediaContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 220,
    // backgroundColor: 'green',
  },
  socialMediaIcons: {
    marginRight: 20,
    width: 24,
    height: 24,

  },
});

export default ContactUsScreen; 