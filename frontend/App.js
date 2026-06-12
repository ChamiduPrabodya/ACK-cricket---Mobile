import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const phone = width < 430;

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
      <View style={styles.headerShell}>
        <View pointerEvents="none" style={styles.headerGlow} />
        <View style={[styles.header, phone && styles.headerPhone]}>
          <View style={[styles.brandRow, phone && styles.brandRowPhone]}>
            <Image
              source={logo}
              style={[styles.logo, phone && styles.logoPhone, compact && styles.logoCompact]}
              resizeMode="contain"
            />
            <View style={styles.brandBlock}>
              <Text
                style={[
                  styles.brandTitle,
                  phone && styles.brandTitlePhone,
                  compact && styles.brandTitleCompact,
                ]}
              >
                ACK Indoor Cricket
              </Text>
              <Text
                style={[
                  styles.brandSubtitle,
                  phone && styles.brandSubtitlePhone,
                  compact && styles.brandSubtitleCompact,
                ]}
              >
                Switch between the player experience and the admin workspace
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.switcher,
              phone && styles.switcherPhone,
              compact && styles.switcherCompact,
            ]}
          >
            <Pressable
              onPress={() => setActiveRole('user')}
              style={[
                styles.switchPill,
                compact && styles.switchPillCompact,
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
                compact && styles.switchPillCompact,
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
      </View>

      <View style={styles.content}>
        {activeRole === 'admin' ? (
          <AdminDashboardScreen
            promotions={promotions}
            onCreatePromotion={handleCreatePromotion}
          />
        ) : (
          <HomeScreen
            promotions={promotions}
            onOpenAdmin={() => setActiveRole('admin')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.brandBlack,
  },
  headerShell: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.brandBlack,
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: -50,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(200,150,26,0.16)',
  },
  header: {
    backgroundColor: '#101115',
    borderRadius: 28,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#1D2027',
    zIndex: 2,
    elevation: 2,
  },
  headerPhone: {
    borderRadius: 24,
    padding: spacing.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  brandRowPhone: {
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  logoPhone: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  logoCompact: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  brandBlock: {
    flex: 1,
    marginBottom: spacing.md,
  },
  brandTitle: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '900',
  },
  brandTitlePhone: {
    fontSize: 18,
    lineHeight: 22,
  },
  brandTitleCompact: {
    fontSize: 20,
  },
  brandSubtitle: {
    color: '#B7BDC8',
    fontSize: 14,
    marginTop: spacing.xs,
  },
  brandSubtitlePhone: {
    fontSize: 11,
    lineHeight: 16,
  },
  brandSubtitleCompact: {
    fontSize: 12,
  },
  switcher: {
    flexDirection: 'row',
    backgroundColor: '#15161A',
    borderRadius: 999,
    padding: 4,
    gap: spacing.xs,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#252830',
  },
  switcherPhone: {
    width: '100%',
    marginTop: spacing.xs,
  },
  switcherCompact: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  switchPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  switchPillCompact: {
    flex: 1,
    alignItems: 'center',
  },
  switchPillActive: {
    backgroundColor: colors.brandGold,
  },
  switchText: {
    color: '#B7BBC6',
    fontSize: 14,
    fontWeight: '800',
  },
  switchTextActive: {
    color: colors.brandBlack,
  },
  content: {
    flex: 1,
  },
});
