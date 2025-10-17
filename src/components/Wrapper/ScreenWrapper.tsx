import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useInactivityTimer } from '../../hooks/useInactivityTimer';
import { View } from 'react-native';

const ScreenWrapper = ({ children }: { children: React.ReactElement }) => {
  const { resetTimer } = useInactivityTimer();
  useFocusEffect(
    useCallback(() => {
      resetTimer(); //
    }, [resetTimer]),
  );

  return (
    <View style={{ flex: 1 }} onTouchStart={resetTimer}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
