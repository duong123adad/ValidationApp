import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { productSchema, ProductFormInput } from '../schemas/productSchema';
import { CustomInput } from '../components/loginInput';

const CATEGORIES = ['Áo', 'Quần', 'Phụ kiện'];
const TAGS = ['Bán chạy', 'Mới về', 'Giảm giá', 'Hàng hiệu', 'Unisex'];

const TSHIRT_SAMPLES = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500',
  'https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=500',
];

export const ProductFormScreen = () => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      category: '',
      tags: [],
      images: [],
      stockQuantity: '',
      sku: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const currentCategory = watch('category');
  const selectedTags = watch('tags');

  const toggleTag = (tag: string) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setValue('tags', nextTags, { shouldValidate: true });
  };

  const addSampleImage = () => {
    if (fields.length < 5) {
      const tshirtImg = TSHIRT_SAMPLES[fields.length];
      append({ uri: tshirtImg });
    } else {
      Alert.alert('Thông báo', 'Chỉ được thêm tối đa 5 ảnh');
    }
  };

  const onSubmit = (data: ProductFormInput) => {
    Alert.alert('Thành công', `Đã lưu sản phẩm: ${data.productName}`);
    console.log('Submit Data:', data);
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
          <View style={styles.bannerContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000',
              }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>THÔNG TIN SẢN PHẨM</Text>
              <Text style={styles.bannerSubtitle}>
                Cập nhật chi tiết kho hàng của bạn
              </Text>
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>Thông tin cơ bản</Text>
              <CustomInput
                label="Tên sản phẩm *"
                name="productName"
                control={control}
                error={errors.productName}
                placeholder="Ví dụ: Áo thun Oversize"
              />
              <CustomInput
                label="Mã SKU *"
                name="sku"
                control={control}
                error={errors.sku}
                placeholder="Ví dụ: TS-001-BLA"
              />

              <Text style={styles.label}>Danh mục sản phẩm *</Text>
              <View style={styles.row}>
                {CATEGORIES.map(cat => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.chip,
                      currentCategory === cat && styles.chipActive,
                    ]}
                    onPress={() =>
                      setValue('category', cat, { shouldValidate: true })
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        currentCategory === cat && styles.chipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.category && (
                <Text style={styles.errorText}>{errors.category.message}</Text>
              )}

              <CustomInput
                label="Mô tả chi tiết *"
                name="description"
                control={control}
                error={errors.description}
                multiline
                numberOfLines={4}
                placeholder="Nhập đặc điểm nổi bật..."
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Hình ảnh (Tối đa 5) *</Text>
              <View style={styles.imageGrid}>
                {fields.map((item, index) => (
                  <View key={item.id} style={styles.imageBox}>
                    <Image
                      source={{ uri: (item as any).uri }}
                      style={styles.img}
                    />
                    <Pressable
                      style={styles.delBtn}
                      onPress={() => remove(index)}
                    >
                      <Text style={styles.delText}>✕</Text>
                    </Pressable>
                  </View>
                ))}

                {fields.length < 5 && (
                  <Pressable style={styles.addBox} onPress={addSampleImage}>
                    <Text style={styles.addText}>+ Thêm ảnh áo</Text>
                  </Pressable>
                )}
              </View>
              {errors.images && (
                <Text style={styles.errorText}>{errors.images.message}</Text>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Thẻ sản phẩm *</Text>
              <View style={styles.tagGrid}>
                {TAGS.map(tag => (
                  <Pressable
                    key={tag}
                    style={[
                      styles.tagChip,
                      selectedTags.includes(tag) && styles.tagChipActive,
                    ]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.includes(tag) && styles.tagTextActive,
                      ]}
                    >
                      {tag}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {errors.tags && (
                <Text style={styles.errorText}>{errors.tags.message}</Text>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Giá & Tồn kho</Text>
              <View style={styles.grid}>
                <View style={styles.half}>
                  <CustomInput
                    label="Giá bán (VNĐ)"
                    name="price"
                    control={control}
                    error={errors.price}
                    keyboardType="numeric"
                    placeholder="90.000"
                  />
                </View>
                <View style={styles.half}>
                  <CustomInput
                    label="Số lượng kho"
                    name="stockQuantity"
                    control={control}
                    error={errors.stockQuantity}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
              </View>
            </View>

            <Pressable
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitBtnText}>XÁC NHẬN LƯU SẢN PHẨM</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  flex: { flex: 1 },
  bannerContainer: { height: 160, width: '100%' },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerSubtitle: { color: '#CBD5E1', fontSize: 14, marginTop: 4 },
  formWrapper: { paddingHorizontal: 16, marginTop: -20 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
  chipText: { fontSize: 14, color: '#64748B' },
  chipTextActive: { color: '#FFF', fontWeight: '700' },
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  tagChipActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
    borderWidth: 1,
  },
  tagText: { fontSize: 13, color: '#64748B' },
  tagTextActive: { color: '#2563EB', fontWeight: '600' },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  imageBox: { width: 75, height: 75, position: 'relative' },
  img: { width: '100%', height: '100%', borderRadius: 12 },
  delBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  delText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  addBox: {
    width: 75,
    height: 75,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  addText: { fontSize: 11, color: '#94A3B8', textAlign: 'center' },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, marginBottom: 10 },
  submitBtn: {
    backgroundColor: '#0F172A',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  submitBtnText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
});
