import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button as AppButton } from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import { unlock } from '../../store/lockSlice';
import { useBiometrics } from '../../hooks/useBiometrics';
import { useInactivityTimer } from '../../hooks/useInactivityTimer';

export const LockOverlay = () => {
  const dispatch = useDispatch();
  const { resetTimer } = useInactivityTimer();
  const { promptBiometricAuth } = useBiometrics();

  const handleUnlock = async () => {
    const success = await promptBiometricAuth();
    if (success) {
      console.log('Biometric success — unlocking app');
      dispatch(unlock());
      resetTimer(); //
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>🔒 App Locked</Text>
        <AppButton title="Unlock with Biometrics" onPress={handleUnlock} />
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
