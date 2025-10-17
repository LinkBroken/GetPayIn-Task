import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/store';
import { queryClient } from './src/utils/reactQueryClient';
import AppNavigator from './src/navigation/App.Navigator';
import { useNetworkSync } from './src/hooks/useNetwork';
import { useNativeInactivity as useInactivityTimer } from './src/hooks/useInactivityTimer';
import { LockOverlay } from './src/screens/Lock/LockOverlay';

function RootApp() {
  const { resetTimer } = useInactivityTimer();
  useNetworkSync(); //

  return (
    <View
      style={styles.container}
      pointerEvents="box-none"
      onTouchStart={resetTimer}
      onResponderGrant={resetTimer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer onStateChange={resetTimer}>
        <AppNavigator />
      </NavigationContainer>
      <LockOverlay />
    </View>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RootApp />
      </QueryClientProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
