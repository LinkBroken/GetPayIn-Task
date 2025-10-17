import { useEffect } from 'react';
import {
  stopInactivityTimer,
  startInactivityTimer,
  resetInactivityTimer,
  listenForLock,
} from '../native/android_ios/ActivityManager';
import { useDispatch } from 'react-redux';
import { lockApp } from '../store/lockSlice';

export function useNativeInactivity() {
  const dispatch = useDispatch();

  useEffect(() => {
    startInactivityTimer(10000);
    const unsubscribe = listenForLock(() => {
      dispatch(lockApp());
    });

    return () => {
      unsubscribe();
      stopInactivityTimer();
    };
  }, [dispatch]);

  return { resetTimer: resetInactivityTimer };
}
