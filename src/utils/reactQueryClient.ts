import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { storage } from './mmkv';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: {
    getItem: key => {
      const value = storage.getString(key);

      console.log('getItem', key, value);
      if (!value) return null;
      try {
        console.log('getItem', key, JSON.parse(value));
        return value;
      } catch {
        console.log('getItem', key, value);
        return value;
      }
    },
    setItem: (key, value) => {
      console.log('setItem', key, value);
      const toStore = typeof value === 'string' ? value : JSON.stringify(value);
      console.log('setItem', key, toStore);
      storage.set(key, toStore);
    },

    removeItem: key => {
      console.log('removeItem', key);
      storage.delete(key);
    },
  },
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24,
});
