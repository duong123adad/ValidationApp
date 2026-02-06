import { z } from 'zod'; 
export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Tài khoản không được để trống')
    .min(5, 'Tài khoản phải có ít nhất 5 ký tự')
    .max(20, 'Tài khoản không được vượt quá 20 ký tự')
    .regex(/^[a-zA-Z0-9]+$/, 'Tài khoản chỉ được chứa chữ cái và số, không có ký tự đặc biệt'),
    
  password: z.string()
    .min(1, 'Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(32, 'Mật khẩu tối đa 32 ký tự')
    .regex(/[A-Z]/, 'Cần ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Cần ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Cần ít nhất 1 chữ số')
    .regex(/[@$!%*?&]/, 'Cần ít nhất 1 ký tự đặc biệt (@$!%*?&)'),
});

export type LoginFormInput = z.infer<typeof loginSchema>;