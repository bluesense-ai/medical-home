import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default AppNavigator; 