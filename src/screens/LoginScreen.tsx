import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Pressable, 
  ActivityIndicator, Alert, KeyboardAvoidingView, 
  Platform, ScrollView, Image 
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loginSchema, LoginFormInput } from '../schemas/authSchema';
import { CustomInput } from '../components/loginInput';

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' }
  });

  const onSubmit = async (data: LoginFormInput) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thành công', `Chào mừng ${data.username}!`);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        >
          {/* Banner đưa vào trong ScrollView để có thể cuộn được */}
          <View style={styles.bannerContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000' }} 
              style={styles.bannerImage}
              resizeMode="cover"
            />
            {/* Overlay nhẹ để làm nổi bật Logo */}
            <View style={styles.overlay}>
              <Text style={styles.brandTitle}>FASHION AI</Text>
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.loginHeader}>Đăng nhập</Text>

              <CustomInput
                label="Tài khoản"
                name="username"
                control={control}
                error={errors.username}
                placeholder="Nhập tài khoản"
                autoCapitalize="none"
              />

              <CustomInput
                label="Mật khẩu"
                name="password"
                control={control}
                error={errors.password}
                placeholder="Nhập mật khẩu"
                secureTextEntry
              />

              <View style={styles.rowBetween}>
                <Pressable 
                  style={styles.checkboxContainer} 
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                    {rememberMe && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Ghi nhớ tôi</Text>
                </Pressable>

                <Pressable onPress={() => {}}>
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </Pressable>
              </View>

              <Pressable 
                style={[styles.loginBtn, loading && styles.btnDisabled]} 
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginBtnText}>ĐĂNG NHẬP</Text>}
              </Pressable>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Bạn chưa có tài khoản? </Text>
                <Pressable onPress={() => {}}>
                  <Text style={styles.signUpText}>Đăng ký ngay</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  flex: { flex: 1 },
  // Banner Container
  bannerContainer: {
    height: 250, // Chiều cao hợp lý hơn cho Mobile
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Làm tối ảnh để chữ trắng nổi bật
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 5,
  },
  // Form Wrapper & Container
  formWrapper: {
    paddingHorizontal: 20,
    marginTop: -40, // Hiệu ứng Card đè lên Banner
  },
  formContainer: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loginHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center'
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { 
    width: 20, height: 20, borderWidth: 1, borderColor: '#CBD5E1', 
    borderRadius: 6, marginRight: 8, justifyContent: 'center', alignItems: 'center'
  },
  checkboxActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  checkMark: { color: '#FFF', fontSize: 12 },
  rememberText: { fontSize: 14, color: '#64748B' },
  forgotText: { fontSize: 14, color: '#0F172A', fontWeight: '700' },
  loginBtn: { backgroundColor: '#0F172A', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnDisabled: { opacity: 0.7 },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#64748B' },
  signUpText: { color: '#0F172A', fontWeight: '800' }
});