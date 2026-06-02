import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';

const quickActions = [
  { label: 'Book Session', detail: 'Choose date, time, players, and nets' },
  { label: 'My Bookings', detail: 'Track confirmations and payments' },
  { label: 'Promotions', detail: 'View current offers' },
];

const availableSlots = [
  { time: '6:00 PM', nets: '2 nets', status: 'Available' },
  { time: '7:30 PM', nets: '1 net', status: 'Filling fast' },
  { time: '9:00 PM', nets: '3 nets', status: 'Available' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Welcome back</Text>
          <Text style={styles.title}>ACK Indoor Cricket</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Open</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Next available booking</Text>
        <Text style={styles.heroTime}>Today, 6:00 PM</Text>
        <Text style={styles.heroCopy}>2 nets available for a 90 minute indoor cricket session.</Text>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Book a Session</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionCard} activeOpacity={0.8}>
              <Text style={styles.actionTitle}>{action.label}</Text>
              <Text style={styles.actionDetail}>{action.detail}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Slots</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>
        <View style={styles.slotList}>
          {availableSlots.map((slot) => (
            <View key={slot.time} style={styles.slotRow}>
              <View>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <Text style={styles.slotMeta}>{slot.nets}</Text>
              </View>
              <View
                style={[
                  styles.statusPill,
                  slot.status === 'Filling fast' && styles.warningPill,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    slot.status === 'Filling fast' && styles.warningText,
                  ]}
                >
                  {slot.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.promo}>
        <Text style={styles.promoTitle}>Weekend Team Offer</Text>
        <Text style={styles.promoCopy}>Book 2 nets this weekend and get 10% off your session fee.</Text>
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
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  kicker: {
    color: colors.mutedText,
    fontFamily: fonts.medium,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 28,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  badgeText: {
    color: colors.primaryDark,
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.lg,
  },
  heroLabel: {
    color: '#BBF7D0',
    fontFamily: fonts.medium,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  heroTime: {
    color: colors.surface,
    fontFamily: fonts.bold,
    fontSize: 26,
    fontWeight: '700',
  },
  heroCopy: {
    color: '#DCFCE7',
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  primaryButtonText: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  sectionLink: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  actionGrid: {
    gap: spacing.md,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.md,
  },
  actionTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  actionDetail: {
    color: colors.mutedText,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  slotList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  slotRow: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  slotTime: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  slotMeta: {
    color: colors.mutedText,
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  statusPill: {
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  warningPill: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    color: colors.success,
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  warningText: {
    color: colors.warning,
  },
  promo: {
    backgroundColor: colors.surface,
    borderColor: colors.secondary,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  promoTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    fontWeight: '700',
  },
  promoCopy: {
    color: colors.mutedText,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
});
