import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');

const promos = [
  {
    title: 'Gear Up and Play!',
    subtitle: 'Secure your evening slot in just a few taps.',
    cta: 'Book Now',
    tone: '#17130A',
    accent: colors.brandGold,
  },
  {
    title: 'Holiday Season Promo',
    subtitle: 'Enjoy 10% off on all weekend bookings this month.',
    cta: 'Claim Offer',
    tone: '#241015',
    accent: colors.brandRed,
  },
  {
    title: 'Unlock Excellence',
    subtitle: 'Join premium membership and earn priority benefits.',
    cta: 'Get Membership',
    tone: '#10131F',
    accent: colors.brandBlue,
  },
];

const quickLinks = [
  { label: 'Bookings', caption: '3 active', accent: colors.brandGold },
  { label: 'Classes', caption: '2 open', accent: colors.brandBlue },
  { label: 'Teams', caption: '1 joined', accent: colors.brandRed },
  { label: 'League', caption: 'Register', accent: '#6E6E73' },
];

const myTeams = [
  { name: 'Diamond Team', role: 'Captain', members: '11 players' },
  { name: 'ACK Warriors', role: 'Member', members: '14 players' },
];

const bookingHighlights = [
  { label: 'Upcoming', value: '03' },
  { label: 'Points', value: '240' },
  { label: 'Offers', value: '05' },
];

function PromoCard({ item, featured = false }) {
  return (
    <View
      style={[
        styles.promoCard,
        { backgroundColor: item.tone },
        featured && styles.featuredPromoCard,
      ]}
    >
      <View style={[styles.promoGlow, { backgroundColor: item.accent }]} />
      <View style={styles.promoPattern} />
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
        <View style={styles.promoButton}>
          <Text style={styles.promoButtonText}>{item.cta}</Text>
        </View>
      </View>
      <View style={styles.playerSilhouette}>
        <View style={styles.playerAura} />
        <View style={styles.playerBody} />
        <View style={styles.playerBat} />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroShell}>
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View>
              <Text style={styles.brandName}>ACK Turf</Text>
              <Text style={styles.greeting}>Hello, good evening</Text>
            </View>
          </View>
          <View style={styles.notificationBubble}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroPattern} />
          <Text style={styles.heroTitle}>Play Indoor Cricket Like a Pro</Text>
          <Text style={styles.heroSubtitle}>
            Book premium grounds, track sessions, and unlock member rewards.
          </Text>

          <View style={styles.heroStats}>
            {bookingHighlights.map((item) => (
              <View key={item.label} style={styles.heroStatChip}>
                <Text style={styles.heroStatValue}>{item.value}</Text>
                <Text style={styles.heroStatLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <PromoCard item={promos[0]} featured />

    

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Special for you</Text>
        <Text style={styles.sectionAction}>View all</Text>
      </View>
      <View style={styles.cardStack}>
        {promos.slice(1).map((item) => (
          <PromoCard key={item.title} item={item} />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My teams</Text>
        <Text style={styles.sectionAction}>Manage</Text>
      </View>
      <View style={styles.teamsPanel}>
        {myTeams.map((team) => (
          <View key={team.name} style={styles.teamRow}>
            <View style={styles.teamAvatar}>
              <Text style={styles.teamAvatarText}>
                {team.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)}
              </Text>
            </View>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamMeta}>
                {team.role} . {team.members}
              </Text>
            </View>
            <Text style={styles.teamArrow}>...</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brandBlack,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroShell: {
    marginBottom: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  brandName: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  greeting: {
    color: '#A8ACB3',
    fontSize: 13,
    marginTop: 2,
  },
  notificationBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A30',
  },
  notificationText: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: '#0C0C0F',
    borderRadius: 30,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#26262D',
    overflow: 'hidden',
  },
  heroPattern: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(200,150,26,0.10)',
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 31,
    fontWeight: '900',
    lineHeight: 37,
    textTransform: 'uppercase',
    maxWidth: 260,
  },
  heroSubtitle: {
    color: '#C3C7CD',
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  heroStats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  heroStatChip: {
    flex: 1,
    backgroundColor: '#141419',
    borderRadius: 18,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: '#24242B',
  },
  heroStatValue: {
    color: colors.brandGold,
    fontSize: 18,
    fontWeight: '900',
  },
  heroStatLabel: {
    color: '#8D9198',
    fontSize: 12,
    marginTop: 2,
  },
  promoCard: {
    minHeight: 190,
    borderRadius: 28,
    padding: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: spacing.md,
  },
  featuredPromoCard: {
    minHeight: 225,
  },
  promoGlow: {
    position: 'absolute',
    bottom: -40,
    right: -10,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.22,
  },
  promoPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    opacity: 0.08,
    backgroundColor: colors.surface,
  },
  promoContent: {
    maxWidth: '62%',
    zIndex: 2,
  },
  promoTitle: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 31,
    textTransform: 'uppercase',
  },
  promoSubtitle: {
    color: '#D8DADF',
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  promoButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.lg,
  },
  promoButtonText: {
    color: colors.brandBlack,
    fontSize: 13,
    fontWeight: '800',
  },
  playerSilhouette: {
    position: 'absolute',
    right: 12,
    bottom: 0,
    width: 118,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  playerAura: {
    position: 'absolute',
    bottom: 12,
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  playerBody: {
    width: 72,
    height: 118,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ skewX: '-8deg' }],
  },
  playerBat: {
    position: 'absolute',
    top: 8,
    right: 34,
    width: 10,
    height: 82,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.42)',
    transform: [{ rotate: '-24deg' }],
  },
  quickLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickLinkCard: {
    width: '47%',
    backgroundColor: '#111115',
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#24242B',
  },
  quickLinkAccent: {
    width: 36,
    height: 8,
    borderRadius: 999,
    marginBottom: spacing.md,
  },
  quickLinkLabel: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
  quickLinkCaption: {
    color: '#92959C',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.surface,
    fontSize: 21,
    fontWeight: '800',
  },
  sectionAction: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '700',
  },
  cardStack: {
    marginBottom: spacing.xl,
  },
  teamsPanel: {
    backgroundColor: '#F7F2E7',
    borderRadius: 28,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  teamAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.brandGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  teamAvatarText: {
    color: colors.brandBlack,
    fontSize: 14,
    fontWeight: '900',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  teamMeta: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: 2,
  },
  teamArrow: {
    color: '#A0A0A5',
    fontSize: 18,
    fontWeight: '800',
  },
  bottomNavMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F2E7',
    borderRadius: 26,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  bottomNavItem: {
    color: '#7A7A80',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomNavItemActive: {
    color: colors.brandGold,
  },
});
