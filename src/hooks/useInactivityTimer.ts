import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { lockApp, updateActivity } from '../store/lockSlice';

const TIMEOUT = 10 * 1000;

export const useInactivityTimer = () => {
  const dispatch = useDispatch();
  const timerRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch(updateActivity());
    timerRef.current = setTimeout(() => dispatch(lockApp()), TIMEOUT);
  }, [dispatch]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        console.log('background');
        dispatch(lockApp());
      } else if (nextAppState === 'active') {
        console.log('active');
        resetTimer();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      subscription.remove();
    };
  }, [dispatch, resetTimer]);

  return { resetTimer };
};
