import { api } from './axiosInstance';
import { storage } from '../utils/mmkv';

export interface LoginResponse {
  token: string;
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
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  storage.set('token', data.token);
  storage.set('username', data.username);
  return data;
};

export const getCurrentUser = async (): Promise<LoginResponse> => {
  const { data } = await api.get<LoginResponse>('/auth/me');
  return data;
};

export const logoutUser = async (): Promise<void> => {
  storage.delete('token');
  storage.delete('username');
};
