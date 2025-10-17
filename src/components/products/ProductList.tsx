import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { Product } from '../../api/productsApi';
import ProductCard from './ProductCard';
import { Loader } from '../common/Loader';
import { FlashList } from '@shopify/flash-list';
import { Header } from '../common/Header';
interface Props {
  screen?: string;
  data?: Product[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onDelete?: (id: number) => void;
  isSuperadmin?: boolean;
}

export const ProductList: React.FC<Props> = ({
  screen,
  data,
  loading,
  refreshing,
  onRefresh,
  onDelete,
  isSuperadmin,
}) => {
  if (loading) return <Loader />;
  if (!data) return <View style={styles.emptyView} />;

  return (
    <View style={styles.container}>
      <Header title={screen || 'Products'} onRefresh={onRefresh} />
      <FlashList
        data={data}
        keyExtractor={item => item && item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onDelete={onDelete}
            isSuperadmin={isSuperadmin}
          />
        )}
        ListEmptyComponent={<View style={styles.emptyView} />}
        contentContainerStyle={styles.contextContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contextContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyView: {
    padding: 20,
  },
});
