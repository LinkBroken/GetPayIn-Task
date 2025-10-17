import { api } from './axiosInstance';

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<ProductsResponse>('/products');
    return data.products;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  try {
    const { data } = await api.get<ProductsResponse>(
      `/products/category/${category}`,
    );
    return data.products;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const { data } = await api.get<string[]>('/products/categories');
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
