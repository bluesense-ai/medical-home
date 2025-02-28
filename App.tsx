import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/screens/Loading/LoadingScreen';
import Router from './src/navigation/Router';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const loadAssets = async () => {
    try {
      const imageAssets = [
        require('./assets/images/welcome.png'),
        require('./assets/images/logo.png'),
      ];

      const loadImages = imageAssets.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });

      await Promise.all(loadImages);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    } catch (error) {
      console.warn('Yükleme sırasında hata:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingScreen />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Router />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

