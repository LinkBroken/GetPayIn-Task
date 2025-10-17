import {
  isSensorAvailable,
  simplePrompt,
} from '@sbaiahmed1/react-native-biometrics';

export const useBiometrics = () => {
  const promptBiometricAuth = async () => {
    try {
      const sensorAvailable = await isSensorAvailable();
      if (!sensorAvailable) {
        console.log('Sensor not available');
        return false;
      }
      const { success } = await simplePrompt('Authenticate');
      return success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { promptBiometricAuth };
};
