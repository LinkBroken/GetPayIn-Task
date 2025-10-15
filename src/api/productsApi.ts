import { api } from './axiosInstance';

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ProductsResponse>('/products');
  return data.products;
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const { data } = await api.get<ProductsResponse>(
    `/products/category/${category}`,
  );
  return data.products;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/products/categories');
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
