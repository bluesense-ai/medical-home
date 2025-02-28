import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native'; // Add missing imports

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Pressable style={styles.button1}
      onPress={() => navigation.navigate('ProvideInformation')} // Navigate to the second screen
      >
      
        <Text>Click here to go</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    height: 50, // Height of the button
    width: 150, // Width of the button
    backgroundColor: "#FFFFFF", // Button background color
    borderColor: "black", // Border color
    borderWidth: 2, // Border width
    justifyContent: 'center', // Vertically center the text
    alignItems: 'center', // Horizontally center the text
    borderRadius: 10, // Rounded corners
  },
});

export default Home; // Correct export statement