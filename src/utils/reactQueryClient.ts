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

      if (!value) return null;
      try {
        return value;
      } catch {
        return value;
      }
    },
    setItem: (key, value) => {
      const toStore = typeof value === 'string' ? value : JSON.stringify(value);
      storage.set(key, toStore);
    },

    removeItem: key => {
      storage.delete(key);
    },
  },
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24,
});
