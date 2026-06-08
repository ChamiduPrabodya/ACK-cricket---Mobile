import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import { initialPromotions } from './src/services/promotionRules';
import { colors, spacing } from './src/theme';

const logo = require('./src/assets/ack-logo.webp');

export default function App() {
  const [activeRole, setActiveRole] = useState('user');
  const [promotions, setPromotions] = useState(initialPromotions);

  const handleCreatePromotion = (promotion) => {
    setPromotions((currentPromotions) => [
      {
        ...promotion,
        id: `promo-${Date.now()}`,
        code: promotion.code.trim().toUpperCase(),
        discountValue: Number(promotion.discountValue),
        isActive: true,
      },
      ...currentPromotions,
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>ACK Indoor Cricket</Text>
            <Text style={styles.brandSubtitle}>
              Branded frontend preview for user and admin dashboards
            </Text>
          </View>
        </View>

        <View style={styles.switcher}>
          <Pressable
            onPress={() => setActiveRole('user')}
            style={[
              styles.switchPill,
              activeRole === 'user' && styles.switchPillActive,
            ]}
          >
            <Text
              style={[
                styles.switchText,
                activeRole === 'user' && styles.switchTextActive,
              ]}
            >
              User
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveRole('admin')}
            style={[
              styles.switchPill,
              activeRole === 'admin' && styles.switchPillActive,
            ]}
          >
            <Text
              style={[
                styles.switchText,
                activeRole === 'admin' && styles.switchTextActive,
              ]}
            >
              Admin
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        {activeRole === 'admin' ? (
          <AdminDashboardScreen
            promotions={promotions}
            onCreatePromotion={handleCreatePromotion}
          />
        ) : (
          <HomeScreen promotions={promotions} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.brandBlack,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  brandBlock: {
    flex: 1,
    marginBottom: spacing.md,
  },
  brandTitle: {
    color: colors.surface,
    fontSize: 23,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#C7CBD4',
    fontSize: 14,
    marginTop: spacing.xs,
  },
  switcher: {
    flexDirection: 'row',
    backgroundColor: '#18181B',
    borderRadius: 999,
    padding: 4,
    gap: spacing.xs,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  switchPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  switchPillActive: {
    backgroundColor: colors.brandGold,
  },
  switchText: {
    color: '#B7BBC6',
    fontSize: 14,
    fontWeight: '700',
  },
  switchTextActive: {
    color: colors.brandBlack,
  },
  content: {
    flex: 1,
  },
});
