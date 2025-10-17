import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from '../../api/productsApi';
import { ProductList } from '../../components/products/ProductList';
import { OfflineBanner } from '../../components/common/Offline';

const CATEGORY = 'smartphones';

export default function CategoryScreen() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['category-products', CATEGORY],
    queryFn: () => getProductsByCategory(CATEGORY),
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
