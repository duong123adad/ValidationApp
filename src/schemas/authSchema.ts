import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
  password: z.string()
    .min(1, 'Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export type LoginFormInput = z.infer<typeof loginSchema>;