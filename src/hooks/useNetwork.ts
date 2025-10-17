// hooks/useNetworkSync.ts
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useNetworkSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        queryClient.invalidateQueries();
      } else {
        console.log('[useNetworkSync] Network disconnected');
      }
    });
    return () => unsubscribe();
  }, [queryClient]);
};
