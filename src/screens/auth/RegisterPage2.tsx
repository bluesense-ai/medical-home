import React from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import AuthHeader from "../../components/Header/AuthHeader";

const { height, width } = Dimensions.get('window');

const RegisterPage2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
             <View style={styles.whiteBackground}>
      

      <AuthHeader
              navigation={navigation}
              currentStep={4} // You can dynamically set this value based on your logic
              totalSteps={4} // Total steps in your process
            />

            <View style={styles.topImageWrapper}>
            
         <ImageBackground source={require('../../../assets/bgimgrg2.jpg')} style={styles.topImage} />
        </View>
      {/* Background Image covering only the bottom half */}


                      <View style={styles.bottomImageWrapper}>
      
      <ImageBackground source={require('./image.jpg')} style={styles.bottomImage}>
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
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Push everything to the bottom
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7, // 70% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top:height*0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width ,
    height: height*0.85, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.12222, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: height*0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RegisterPage2;
