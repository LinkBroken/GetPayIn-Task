import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Trash2, Star, Eye } from 'lucide-react-native';
import { Product } from '../../api/productsApi';

interface Props {
  item: Product;
  onDelete?: (id: number) => void;
  onNavigateToProductCategory?: (product: Product) => void;
  isSuperadmin?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ProductCard: React.FC<Props> = ({
  item,
  onDelete,
  onNavigateToProductCategory,
  isSuperadmin,
}) => {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);
  const deleteScale = useSharedValue(1);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.97);
      pressed.value = withTiming(1, { duration: 150 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      pressed.value = withTiming(0, { duration: 150 });
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(pressed.value, [0, 1], [0.15, 0.25]);
    const elevation = interpolate(pressed.value, [0, 1], [4, 8]);

    return {
      transform: [{ scale: scale.value }],
      shadowOpacity,
      elevation,
    };
  });

  const animatedDeleteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
  }));

  const handleDeletePress = () => {
    if (Platform.OS !== 'web') {
      deleteScale.value = withSpring(0.9, {}, () => {
        deleteScale.value = withSpring(1);
      });
    }
    onDelete?.(item?.id);
  };

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            {item.rating && (
              <View style={styles.ratingBadge}>
                <Star size={12} color="#FFA500" fill="#FFA500" />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              {item.category && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              )}
            </View>

            {item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            <View style={styles.footer}>
              {item.price && (
                <View style={styles.priceContainer}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <Text style={styles.price}>{item.price.toFixed(2)}</Text>
                </View>
              )}

              <View style={styles.actions}>
                {onNavigateToProductCategory && (
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => onNavigateToProductCategory(item)}
                    activeOpacity={0.7}
                  >
                    <Eye size={18} color="#ffffff" />
                  </TouchableOpacity>
                )}

                {isSuperadmin && (
                  <AnimatedTouchable
                    style={[styles.deleteButton, animatedDeleteStyle]}
                    onPress={handleDeletePress}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={18} color="#ffffff" />
                  </AnimatedTouchable>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1976d2',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    alignItems: 'center',
    marginTop: 'auto',
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  priceSymbol: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2ecc71',
    marginRight: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2ecc71',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cartButton: {
    backgroundColor: '#2ecc71',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default ProductCard;
