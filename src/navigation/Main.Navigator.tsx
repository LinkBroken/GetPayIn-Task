import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import AllProductsScreen from '../screens/Products/AllProducts.Screen';
import CategoryScreen from '../screens/Products/Category.Screen';
import SignOutScreen from '../screens/SignOut/SignOut.Screen';
import { Home, ShoppingCart, LogOut } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

function ScreenWrapper({
  children,
  resetTimer,
}: {
  children: React.ReactElement;
  resetTimer: () => void;
}) {
  useFocusEffect(
    React.useCallback(() => {
      resetTimer();
    }, [resetTimer]),
  );

  return (
    <View style={{ flex: 1 }} onTouchStart={resetTimer}>
      {children}
    </View>
  );
}

export default function MainNavigator({
  resetTimer,
}: {
  resetTimer: () => void;
}) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="AllProducts" options={{ tabBarIcon: () => <Home /> }}>
        {() => (
          <ScreenWrapper resetTimer={resetTimer}>
            <AllProductsScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Category"
        options={{ tabBarIcon: () => <ShoppingCart /> }}
      >
        {() => (
          <ScreenWrapper resetTimer={resetTimer}>
            <CategoryScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>

      <Tab.Screen name="SignOut" options={{ tabBarIcon: () => <LogOut /> }}>
        {() => (
          <ScreenWrapper resetTimer={resetTimer}>
            <SignOutScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
