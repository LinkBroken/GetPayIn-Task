import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, ViewStyle } from 'react-native';

interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  onHide: () => void;
  type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  duration = 2000,
  onHide,
  type = 'success',
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current; // 👈 start below the screen

  useEffect(() => {
    if (visible) {
      // 👇 Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        // 👇 Animate out
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 30,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide, opacity, translateY]);

  // 👇 Always mounted, visibility controlled by animation
  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateY }],
          bottom: 60, // appears above bottom bar
        },
        type === 'error' ? styles.error : styles.success,
      ]}
      pointerEvents="none" // allows touches to pass through
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 999, // ensures visibility
  } as ViewStyle,
  text: {
    color: '#fff',
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#D9534F',
  },
});
