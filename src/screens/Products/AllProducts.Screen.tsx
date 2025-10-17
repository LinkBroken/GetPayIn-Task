import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProducts, deleteProduct } from '../../api/productsApi';
import { ProductList } from '../../components/products/ProductList';
import { OfflineBanner } from '../../components/common/Offline';
import { RootState } from '../../store';
import { Toast } from '../../components/common/Toast';

export default function AllProductsScreen() {
  const [visible, setVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error'>(
    'success',
  );
  const queryClient = useQueryClient();
  const { username } = useSelector((state: RootState) => state.auth);
  const isSuperadmin = username === 'emilys';

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setToastMessage('✅ Product deleted successfully');
      setToastType('success');
      setVisible(true);
    },
    onError: error => {
      console.error('Error deleting product:', error);
      setToastMessage('❌ Error deleting product');
      setToastType('error');
      setVisible(true);
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <View style={styles.container}>
      <OfflineBanner />
      <Toast
        visible={visible}
        message={toastMessage}
        duration={2000}
        onHide={() => setVisible(false)}
        type={toastType}
      />
      <ProductList
        screen="All Products"
        data={data}
        loading={isLoading}
        refreshing={isFetching}
        onRefresh={refetch}
        onDelete={handleDelete}
        isSuperadmin={isSuperadmin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
});
