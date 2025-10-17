import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/Login/Login.Screen';
import MainNavigator from './Main.Navigator';
import { useNativeInactivity as useInactivityTimer } from '../hooks/useInactivityTimer';
import { RootState } from '../store';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { resetTimer } = useInactivityTimer();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main">
          {() => <MainNavigator resetTimer={resetTimer} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
