import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';

const ContactUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ContactUsScreen</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.text}>ContactUs Page...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  header: {
    padding: 16,
    backgroundColor: colors.main.secondary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.base.white,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.base.black,
  },
});

export default ContactUsScreen; 