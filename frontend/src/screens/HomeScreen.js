import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');

const upcomingBookings = [
  {
    id: 'BK-1024',
    title: 'Evening Net Practice',
    date: 'Today, 6:30 PM',
    court: 'Net A',
    status: 'Confirmed',
  },
  {
    id: 'BK-1031',
    title: 'Weekend Team Session',
    date: 'Sun, 8:00 AM',
    court: 'Full Indoor Arena',
    status: 'Pending Payment',
  },
];

const quickActions = [
  { label: 'Book a session', accent: colors.primary },
  { label: 'View time slots', accent: '#0F766E' },
  { label: 'Loyalty points', accent: '#B45309' },
  { label: 'Contact support', accent: '#4338CA' },
];

const promotions = [
  {
    title: 'Team Pack Offer',
    description: 'Book 3 sessions this month and get 15% off the 4th booking.',
  },
  {
    title: 'Morning Saver',
    description: 'Weekday morning slots now include bonus loyalty points.',
  },
];

const notifications = [
  'Your 6:30 PM booking has been confirmed.',
  'Two evening slots are now open for Friday.',
  'Your loyalty balance increased by 40 points.',
];

function SectionTitle({ eyebrow, title, caption }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
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
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <Image source={logo} style={styles.heroLogo} resizeMode="contain" />
          <View style={styles.heroRibbon}>
            <Text style={styles.heroRibbonText}>Indoor Cricket Club</Text>
          </View>
        </View>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Player Dashboard</Text>
        </View>
        <Text style={styles.heroTitle}>Welcome back, Kasun</Text>
        <Text style={styles.heroSubtitle}>
          Your next session is tonight. Track bookings, offers, and account
          activity in one place.
        </Text>

        <View style={styles.heroStatsRow}>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>03</Text>
            <Text style={styles.heroStatLabel}>Active bookings</Text>
          </View>
          <View style={[styles.heroStatCard, styles.heroStatCardAccent]}>
            <Text style={styles.heroStatValue}>240</Text>
            <Text style={styles.heroStatLabel}>Loyalty points</Text>
          </View>
        </View>
      </View>

      <SectionTitle
        eyebrow="Next Up"
        title="Upcoming bookings"
        caption="Keep an eye on session timing and payment status."
      />
      <View style={styles.stack}>
        {upcomingBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingTopRow}>
              <Text style={styles.bookingTitle}>{booking.title}</Text>
              <View
                style={[
                  styles.statusPill,
                  booking.status === 'Confirmed'
                    ? styles.statusSuccess
                    : styles.statusWarning,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    booking.status === 'Confirmed'
                      ? styles.statusTextSuccess
                      : styles.statusTextWarning,
                  ]}
                >
                  {booking.status}
                </Text>
              </View>
            </View>
            <Text style={styles.bookingMeta}>{booking.date}</Text>
            <Text style={styles.bookingMeta}>{booking.court}</Text>
            <Text style={styles.bookingId}>{booking.id}</Text>
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Explore"
        title="Quick actions"
        caption="Designed for the tasks players use most often."
      />
      <View style={styles.actionGrid}>
        {quickActions.map((action) => (
          <View key={action.label} style={styles.actionCard}>
            <View
              style={[styles.actionAccent, { backgroundColor: action.accent }]}
            />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Offers"
        title="Promotions for you"
        caption="Personalized discounts and value packs."
      />
      <View style={styles.stack}>
        {promotions.map((promotion) => (
          <View key={promotion.title} style={styles.promoCard}>
            <Text style={styles.promoTitle}>{promotion.title}</Text>
            <Text style={styles.promoDescription}>{promotion.description}</Text>
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Alerts"
        title="Recent notifications"
        caption="Latest updates from the stadium and booking system."
      />
      <View style={styles.stack}>
        {notifications.map((item) => (
          <View key={item} style={styles.notificationRow}>
            <View style={styles.notificationDot} />
            <Text style={styles.notificationText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    backgroundColor: colors.brandBlack,
    borderRadius: 28,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: '#23232A',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroLogo: {
    width: 96,
    height: 54,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },
  heroRibbon: {
    backgroundColor: colors.brandRed,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  heroRibbonText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200,150,26,0.16)',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  heroBadgeText: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(31,47,134,0.28)',
    borderRadius: 20,
    padding: spacing.md,
  },
  heroStatCardAccent: {
    backgroundColor: 'rgba(200,150,26,0.22)',
  },
  heroStatValue: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '800',
  },
  heroStatLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.brandRed,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  sectionCaption: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  stack: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  bookingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  bookingTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  bookingMeta: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  bookingId: {
    color: colors.brandBlue,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  statusSuccess: {
    backgroundColor: '#DCFCE7',
  },
  statusWarning: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextSuccess: {
    color: colors.success,
  },
  statusTextWarning: {
    color: colors.warning,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 108,
    justifyContent: 'space-between',
  },
  actionAccent: {
    width: 42,
    height: 10,
    borderRadius: 999,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  promoCard: {
    backgroundColor: '#FFF7EA',
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#EAC66B',
  },
  promoTitle: {
    color: '#8A121F',
    fontSize: 17,
    fontWeight: '800',
  },
  promoDescription: {
    color: '#564117',
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.brandRed,
    marginTop: 4,
  },
  notificationText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
