import React from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const RegisterPage2 = ({ navigation }) => {
  return (
    <View style={styles.container}>

         <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />
        
      {/* Background Image covering only the bottom half */}
      <ImageBackground source={require('./image.jpg')} style={styles.imageBackground}>
        {/* Form Overlay */}
        <View style={styles.overlay}>
          {/* Heading */}
          <Text style={styles.title}>Register</Text>

       

          {/* First Name */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#ddd"
          />

          {/* Last Name */}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#ddd"
          />

          {/* Date of Birth */}
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#ddd"
            keyboardType="phone-pad"
          />

          {/* Choose Clinic */}
          <Text style={styles.label}>Choose Your Clinic</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Clinic"
            placeholderTextColor="#ddd"
          />

          {/* Register Button */}
          <Pressable 
            style={styles.registerButton} 
            onPress={()=>{navigation.navigate("RegisterVerification")}} // Change to the actual screen name
          >
            <Text style={styles.registerButtonText} >Register</Text>
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
    backgroundColor:'transparent',
  },
  imageBackground: {
    width: width,
    height: height * 0.73, // Cover only bottom half of the screen
    justifyContent: 'flex-end',
    position: 'absolute',
    alignItems: 'center',
  },
  topImage: {
    width: width*0.7,
    height: height * 0.7, // Covers 70% of the screen
    alignSelf: 'center', // Center the image horizontally
    position: 'absolute',
    top: 0, // No space on top
    resizeMode: "contain",
  },
  overlay: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    color: 'white',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: '5%',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 23,
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
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterPage2;
