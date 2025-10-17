import { api } from './axiosInstance';
import { storage } from '../utils/mmkv';

export interface LoginResponse {
  accessToken: string;
  username: string;
  email?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    storage.set('token', data.accessToken);
    storage.set('username', data.username);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<LoginResponse> => {
  try {
    const { data } = await api.get<LoginResponse>('/auth/me');
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  storage.delete('token');
  storage.delete('username');
};
