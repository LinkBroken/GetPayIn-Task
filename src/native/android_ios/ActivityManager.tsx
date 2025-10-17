import { NativeModules, NativeEventEmitter } from 'react-native';

const { InactivityManager } = NativeModules;

const inactivityEmitter = InactivityManager
  ? new NativeEventEmitter(InactivityManager)
  : null;

export const startInactivityTimer = (timeoutMs: number = 10000) => {
  if (InactivityManager) {
    InactivityManager.startTimer(timeoutMs);
  } else {
    if (__DEV__) {
      console.warn('InactivityManager module not available');
    }
  }
};

export const resetInactivityTimer = () => {
  if (InactivityManager) {
    InactivityManager.resetTimer();
  } else {
    if (__DEV__) {
      console.warn('InactivityManager module not available');
    }
  }
};

export const stopInactivityTimer = () => {
  if (InactivityManager) {
    InactivityManager.stopTimer();
  } else {
    if (__DEV__) {
      console.warn('InactivityManager module not available');
    }
  }
};

export const listenForLock = (callback: () => void) => {
  if (!inactivityEmitter) {
    if (__DEV__) {
      console.warn('InactivityManager emitter not available');
    }
    return () => {};
  }

  const subscription = inactivityEmitter.addListener('AppLocked', callback);
  return () => subscription.remove();
};
