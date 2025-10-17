import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button as AppButton } from '../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { unlock } from '../../store/lockSlice';
import { useBiometrics } from '../../hooks/useBiometrics';
import { useNativeInactivity as useInactivityTimer } from '../../hooks/useInactivityTimer';
import { RootState } from '../../store';

export const LockOverlay = () => {
  const dispatch = useDispatch();
  const { locked } = useSelector((state: RootState) => state.lock);
  const { resetTimer } = useInactivityTimer();
  const { promptBiometricAuth } = useBiometrics();

  // Automatically prompt biometric when lock appears
  useEffect(() => {
    const autoUnlock = async () => {
      if (locked) {
        const success = await promptBiometricAuth();
        if (success) {
          dispatch(unlock());
          resetTimer();
        }
      }
    };
    autoUnlock();
  }, [locked, dispatch, resetTimer, promptBiometricAuth]);

  if (!locked) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>🔒 App Locked</Text>
        <AppButton
          title="Unlock with Biometrics"
          onPress={async () => {
            const success = await promptBiometricAuth();
            if (success) {
              dispatch(unlock());
              resetTimer();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});
