import { z } from 'zod';

export const productSchema = z.object({
  productName: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  price: z.string().refine((val) => Number(val) >= 90000, 'Giá phải từ 90.000 VNĐ'),
  category: z.string().min(1, 'Vui lòng chọn danh mục'),
  tags: z.array(z.string()).min(1, 'Chọn ít nhất 1 thẻ tag'),
  images: z.array(z.any()).max(5, 'Tối đa 5 hình ảnh'),
  stockQuantity: z.string().min(1, 'Vui lòng nhập số lượng'),
  sku: z.string().min(3, 'SKU tối thiểu 3 ký tự'),
});

export type ProductFormInput = z.infer<typeof productSchema>;