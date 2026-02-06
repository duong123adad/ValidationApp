import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Pressable, 
  ActivityIndicator, Alert, KeyboardAvoidingView, 
  Platform, ScrollView 
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loginSchema, LoginFormInput } from '../schemas/authSchema';
import { CustomInput } from '../components/loginInput';

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginFormInput) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thành công', `Chào mừng ${data.email}`);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Đăng Nhập</Text>
          <Text style={styles.subtitle}>Xây dựng hệ thống Form với Zod</Text>
        </View>

        <View style={styles.card}>
          <CustomInput
            label="Email"
            name="email"
            control={control}
            error={errors.email}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Mật khẩu"
            name="password"
            control={control}
            error={errors.password}
            placeholder="Mật khẩu trên 8 ký tự"
            secureTextEntry
          />

          <Pressable 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Đăng nhập</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 24 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E293B' },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});