import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: FieldError;
}

export const CustomInput = ({ control, name, label, error, ...props }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholderTextColor="#94a3b8"
          {...props}
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8 },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1.5, 
    borderColor: '#e2e8f0', 
    borderRadius: 14, 
    padding: 16, 
    fontSize: 16,
    color: '#0f172a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 6, fontWeight: '600' }
});