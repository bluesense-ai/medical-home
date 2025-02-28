import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons (Use react-native-vector-icons if not using Expo)
import Svg from 'react-native-svg'; // Updated import

const { height, width } = Dimensions.get('window');

const WantToRegister = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image covering only bottom half */}

 <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />


      <ImageBackground source={require('./image.jpg')} style={styles.imageBackground}>
        {/* Uniform Bottom Overlay */}
        <View style={styles.overlay}>
          {/* Small Image */}
          {/* <Image source={require('../../../assets/titleanddescpwp.png')} style={styles.smallImage} /> */}
          <Svg
        width={50}
        height={30}
        style={{ marginBottom: 20,  padding: 0}}
        source={require('../../../assets/greenprofile.svg')} // Use the path to your SVG file
      />
           
          <Text style={styles.title}>Want to register?</Text>
          <Text style={styles.description}>Your health card is not in our database. If you are a current patient, you should try verifying and introducing your health card again. Otherwise, feel free to register!.</Text> 

          {/* Buttons Row */}
          <View style={styles.buttonRow}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="arrow-back" size={24} color="white" backgroundColor='transparent' />
                        <Text style={{ color: 'white', marginLeft: 5 }}>Back</Text>
                    </View>
                    </TouchableOpacity>


            {/* Register Button */}
            <Pressable style={styles.registerButton} onPress={() => navigation.navigate('RegisterPage')}>
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    width: width,
    height: height * 0.5, // Cover only bottom half of the screen
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topImage: {
    width: width,
    height: height * 0.6, // Covers 60% of the screen
    position: 'absolute', // Keeps it fixed at the top
    top: 0,
  },
  overlay: {
    width: '100%',
    height: '100%', // Ensure the overlay covers the entire bottom image
    alignItems: 'center',
    padding: 20,
  },
  smallImage: {
    width: '70%',
    height: '40%',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#32CD32',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight:'300',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  backButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    borderBlockColor:'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    width:'40%',
    alignItems:'center'
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WantToRegister;
