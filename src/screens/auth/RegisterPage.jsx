import React from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import Svg from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const RegisterPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Image covering upper part */}
      <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />


      {/* Bottom Image overlapping top image */}
      <ImageBackground source={require('./image.jpg')} style={styles.bottomImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Register</Text>
          <Text style={{ marginRight: '90', marginBottom: '20', color: 'white' }}>Provide your health card number</Text>
          <TextInput
            style={styles.input}
            placeholder="Health Card Number"
            placeholderTextColor="#ddd"
          />
          <Text style={{ marginRight: '180', marginBottom: '20', color: 'white' }}>Choose your clinic</Text>

          <TextInput
            style={styles.input}
            placeholder="Choose Your Clinic"
            placeholderTextColor="#ddd"
          />
          <Svg
            width={250}
            height={50}
            style={{ marginBottom: 20, padding: 0 }}
            source={require('../../../assets/statusadv.svg')} // Use the path to your SVG file
          />
          <Pressable style={styles.registerButton} onPress={() => navigation.navigate('RegisterPage2')}>
            <Text style={styles.registerButtonText}>Next</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topImage: {
    width: width * 0.7,
    height: height * 0.7, // Covers 70% of the screen
    alignSelf: 'center', // Center the image horizontally
    marginTop: 0, // No space on top
  },
  bottomImage: {
    width: width,
    height: height * 0.6, // Covers bottom half
    position: 'absolute',
    bottom: 0, // Anchored at the bottom
  },
  overlay: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
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

export default RegisterPage;
