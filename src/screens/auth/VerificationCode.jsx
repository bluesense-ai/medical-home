import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useAuthStore } from '../../store/useAuthStore';

const { height, width } = Dimensions.get('window');

const VerificationCode = ({ navigation }) => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSubmit = async () => {
    await setIsAuthenticated(true); // First update authentication
    // Then navigate
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      {/* Background Image covering only the bottom half */}
      <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />

      <ImageBackground source={require('./image.jpg')} style={styles.imageBackground}>
        {/* Form Overlay */}
        <View style={styles.overlay}>
          {/* Heading */}
          <Text style={styles.title}>Verification</Text>

          {/* Health Card Number Field */}
          <Text style={styles.label}>Enter the access code provided</Text>
          <TextInput
            style={styles.input}
            placeholder="acccess code"
            placeholderTextColor="#ddd"
          // keyboardType="numeric"
          />


          {/* Register Button */}
          <Pressable
            style={styles.registerButton}
            onPress={handleSubmit}
          >
            <Text style={styles.registerButtonText}>Submit</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Push everything to the bottom
  },
  imageBackground: {
    width: width,
    height: height * 0.5, // Cover only bottom half of the screen
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  topImage: {
    width: width,
    height: height * 0.6, // Covers 60% of the screen
    position: 'absolute', // Keeps it fixed at the top
    top: 0,
    margin: '40px'
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 35,
    marginLeft: '5%',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 90,
    borderWidth: 1,
    borderColor: 'white',
  },
  registerButton: {
    width: '88%',        // Make button the same width as the TextInput
    height: 50,           // Adjust the height of the button
    backgroundColor: '#32CD32', // Parrot Green color
    justifyContent: 'center',
    borderRadius: 25,         // Apply border radius for rounded corners
    alignItems: 'center',
    marginTop: 0,        // Add space between button and previous field
    marginBottom: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerificationCode;
