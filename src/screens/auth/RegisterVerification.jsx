import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Svg, { Path } from 'react-native-svg'; // Updated import




const { height, width } = Dimensions.get('window');

const RegisterVerification = ({ navigation }) => {

    const [selectedId, setselectedId ] = useState('null');
    const radioButtons = [
        {
          id: '1', // Unique ID for the radio button
          label: 'Phone Number',
          value: 'Phone Number',
          marginBottom: 10,
          marginLeft: 20,
          color: 'white', // Set radio button color to white
          labelStyle: { color: 'white' }, // Set label color to white
        },
        {
          id: '2',
          label: 'Email address',
          value: 'Email address',
          marginBottom: 10,

          color: 'white', // Set radio button color to white
          labelStyle: { color: 'white' }, // Set label color to white
        },
      ];



  return (
    <View style={styles.container}>
      {/* Background Image covering only the bottom half */}

               <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />
      
      <ImageBackground source={require('./image.jpg')} style={styles.imageBackground}>
        {/* Form Overlay */}
        <View style={styles.overlay}>
          {/* Heading */}
          <Text style={styles.title}>Register</Text>

          {/* Health Card Number Field */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ddd"
            // keyboardType="numeric"
          />

          {/* First Name */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#ddd"
            keyboardType="numeric"
          />

          {/* Last Name */}
          <Text style={styles.label}>How would you like to verify your account</Text>
          <View style={{ marginBottom: 80, alignItems: 'flex-start', width: '100%' , marginLeft:30 }}>
  <RadioGroup
    radioButtons={radioButtons}
    onPress={setselectedId}
    selectedId={selectedId}
    layout="column"  // Ensures layout is column, radio buttons will stack vertically
    containerStyle={{
      gap: 6,
      flexDirection: 'column', // Explicitly set the flexDirection to 'column'
      alignItems: 'flex-start', // Align the radio buttons to the start of the container
    }}
  />
</View>

          {/* Register Button */}
          <Pressable 
            style={styles.registerButton} 
            onPress={() => navigation.navigate('VerificationCode')} // Change to the actual screen name
          >
            <Text style={styles.registerButtonText}>Register</Text>
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
    height: height * 0.7, // Cover only bottom half of the screen
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  topImage: {
    width: width*0.7,
    height: height * 0.7, // Covers 70% of the screen
    alignSelf: 'center', // Center the image horizontally
    marginTop: 0, // No space on top
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: '5%',
    marginBottom:10,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    
  },
  registerButton: {
    width: '88%',        // Make button the same width as the TextInput
    height: 50,           // Adjust the height of the button
    backgroundColor: '#32CD32', // Parrot Green color
    justifyContent: 'center',
    borderRadius: 20,         // Apply border radius for rounded corners
    alignItems: 'center',
    marginTop: 0,        // Add space between button and previous field
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterVerification;
