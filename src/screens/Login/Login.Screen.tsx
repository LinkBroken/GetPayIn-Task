// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button as AppButton } from '../../components/common/Button';
import { Input as AppInput } from '../../components/common/Input';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/authApi';
import { setAuth } from '../../store/authSlice';
import { Loader } from '../../components/common/Loader';
import { getErrorMessage } from '../../utils/helpers';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const {
    mutate,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      dispatch(setAuth({ token: data.accessToken, username: data.username }));
    },
  });

  const handleLogin = () => {
    if (!username || !password) return;
    mutate({ username, password });
  };

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3-Page Store Login</Text>

      <AppInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton title="Login" onPress={handleLogin} />

      {error && <Text style={styles.error}>{getErrorMessage(error)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: '#d9534f',
    textAlign: 'center',
    marginTop: 10,
  },
});
