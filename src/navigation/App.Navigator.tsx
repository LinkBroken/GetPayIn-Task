import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/Login.Screen';
import MainNavigator from './Main.Navigator';
import { useInactivityTimer } from '../hooks/useInactivityTimer';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { resetTimer } = useInactivityTimer();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Main"
        component={() => <MainNavigator resetTimer={resetTimer} />}
      />
    </Stack.Navigator>
  );
}
