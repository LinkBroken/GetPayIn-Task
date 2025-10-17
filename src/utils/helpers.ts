import NetInfo from '@react-native-community/netinfo';

interface errorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !!state.isConnected;
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if ((error as errorResponse)?.response?.data?.message)
    return (
      (error as errorResponse).response?.data?.message ||
      'Something went wrong.'
    );
  return 'Something went wrong.';
};
