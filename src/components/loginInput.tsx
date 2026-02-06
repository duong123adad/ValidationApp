import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface CustomInputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export const CustomInput = ({ label, name, control, error, style, ...props }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError, props.multiline && styles.textArea, style]}
            onBlur={onBlur}
            onChangeText={(text) => {
              const val = props.keyboardType === 'numeric' ? (text === '' ? 0 : text) : text;
              onChange(val);
            }}
            value={value?.toString() || ''}
            placeholderTextColor="#94A3B8"
            {...props}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#1E293B' },
  inputError: { borderColor: '#EF4444' },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
});