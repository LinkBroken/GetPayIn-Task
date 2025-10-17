import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

export const Input: React.FC<TextInputProps> = props => (
  <View style={styles.container}>
    <TextInput placeholderTextColor="#999" style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
});
