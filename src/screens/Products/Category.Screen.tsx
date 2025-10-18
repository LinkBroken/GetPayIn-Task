import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from '../../api/productsApi';
import { ProductList } from '../../components/products/ProductList';
import { OfflineBanner } from '../../components/common/Offline';
import { useRoute } from '@react-navigation/native';

type CategoryParams = {
  category: string;
};
export default function CategoryScreen() {
  const route = useRoute() as { params: CategoryParams };

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['category-products', route.params?.category],
    queryFn: () => getProductsByCategory(route.params?.category),
  });

  return (
    <View style={styles.container}>
      <OfflineBanner />
      <ProductList
        screen="Category"
        data={data}
        loading={isLoading}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
});
