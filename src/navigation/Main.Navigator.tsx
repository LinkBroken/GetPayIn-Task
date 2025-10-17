import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllProductsScreen from '../screens/Products/AllProducts.Screen';
import CategoryScreen from '../screens/Products/Category.Screen';
import SignOutScreen from '../screens/SignOut/SignOut.Screen';
import { Home, ShoppingCart, LogOut } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function MainNavigator({
  resetTimer,
}: {
  resetTimer: () => void;
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        focus: resetTimer, // resets when any tab gains focus
        tabPress: resetTimer, // resets when switching tabs
        tabLongPress: resetTimer, // resets when long-pressing a tab
      }}
    >
      <Tab.Screen
        name="AllProducts"
        options={{ tabBarIcon: () => <Home /> }}
        children={() => <AllProductsScreen />}
      />
      <Tab.Screen
        name="Category"
        options={{ tabBarIcon: () => <ShoppingCart /> }}
        children={() => <CategoryScreen />}
      />
      <Tab.Screen
        name="SignOut"
        options={{ tabBarIcon: () => <LogOut /> }}
        children={() => <SignOutScreen />}
      />
    </Tab.Navigator>
  );
}
