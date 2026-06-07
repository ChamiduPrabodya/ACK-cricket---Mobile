import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');

const metrics = [
  { label: 'Today bookings', value: '28', tone: '#DBEAFE', text: '#1D4ED8' },
  { label: 'Pending approvals', value: '06', tone: '#FEF3C7', text: '#B45309' },
  { label: 'Revenue today', value: 'LKR 42K', tone: '#DCFCE7', text: '#15803D' },
  { label: 'Offer conversions', value: '14%', tone: '#F3E8FF', text: '#7E22CE' },
];

const bookingQueue = [
  {
    id: 'BK-2039',
    customer: 'Colombo Kings',
    slot: 'Today, 7:30 PM',
    issue: 'Manual payment pending verification',
    status: 'Needs review',
  },
  {
    id: 'BK-2044',
    customer: 'Nadeesha Perera',
    slot: 'Tomorrow, 6:00 AM',
    issue: 'Reschedule request received',
    status: 'Action required',
  },
  {
    id: 'BK-2048',
    customer: 'Thunder XI',
    slot: 'Tomorrow, 8:00 PM',
    issue: 'Confirmed and ready',
    status: 'On track',
  },
];

const stadiumStatus = [
  { name: 'Net A', state: 'Booked', stateColor: colors.danger },
  { name: 'Net B', state: 'Available', stateColor: colors.success },
  {
    name: 'Arena Lights',
    state: 'Maintenance at 5 PM',
    stateColor: colors.warning,
  },
];

const reports = [
  'Peak demand is strongest between 6 PM and 9 PM.',
  "Weekend sessions contribute 48% of this week's revenue.",
  'Promotions increased repeat bookings by 11% this month.',
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

export default function AdminDashboardScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroIdentity}>
            <Image source={logo} style={styles.heroLogo} resizeMode="contain" />
            <View>
            <Text style={styles.heroEyebrow}>Admin Control Center</Text>
            <Text style={styles.heroTitle}>Indoor cricket operations</Text>
            </View>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        <Text style={styles.heroSubtitle}>
          Monitor bookings, payment follow-ups, stadium readiness, and business
          performance from one dashboard.
        </Text>
      </View>

      <View style={styles.metricGrid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricCard}>
            <View style={[styles.metricAccent, { backgroundColor: metric.tone }]}>
              <Text style={[styles.metricValue, { color: metric.text }]}>
                {metric.value}
              </Text>
            </View>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Operations"
        title="Booking queue"
        caption="Tasks that need an admin decision first."
      />
      <View style={styles.stack}>
        {bookingQueue.map((item) => (
          <View key={item.id} style={styles.queueCard}>
            <View style={styles.queueHeader}>
              <View style={styles.queueIdentity}>
                <Text style={styles.queueCustomer}>{item.customer}</Text>
                <Text style={styles.queueMeta}>{item.slot}</Text>
              </View>
              <Text style={styles.queueId}>{item.id}</Text>
            </View>
            <Text style={styles.queueIssue}>{item.issue}</Text>
            <View style={styles.queueStatusPill}>
              <Text style={styles.queueStatusText}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Facility"
        title="Stadium status"
        caption="Operational snapshot for courts and support systems."
      />
      <View style={styles.stack}>
        {stadiumStatus.map((item) => (
          <View key={item.name} style={styles.statusRow}>
            <View>
              <Text style={styles.statusName}>{item.name}</Text>
              <Text style={[styles.statusState, { color: item.stateColor }]}>
                {item.state}
              </Text>
            </View>
            <View
              style={[styles.statusIndicator, { backgroundColor: item.stateColor }]}
            />
          </View>
        ))}
      </View>

      <SectionTitle
        eyebrow="Promotions"
        title="Campaign watch"
        caption="Track how current offers are influencing demand."
      />
      <View style={styles.promoPanel}>
        <Text style={styles.promoHeading}>June Power Play Campaign</Text>
        <Text style={styles.promoStat}>126 redemptions this month</Text>
        <Text style={styles.promoDescription}>
          Highest traction is coming from weekday team sessions and repeat
          customers booking after 5 PM.
        </Text>
      </View>

      <SectionTitle
        eyebrow="Reporting"
        title="Analytics highlights"
        caption="Quick insights you can later expand into reports."
      />
      <View style={styles.stack}>
        {reports.map((line) => (
          <View key={line} style={styles.reportCard}>
            <Text style={styles.reportText}>{line}</Text>
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
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#23232A',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  heroLogo: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  heroEyebrow: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginTop: spacing.xs,
    maxWidth: 220,
  },
  heroSubtitle: {
    color: '#CDD2DA',
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(158,18,40,0.22)',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#22C55E',
  },
  liveText: {
    color: '#F5D9DE',
    fontSize: 12,
    fontWeight: '700',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  metricCard: {
    width: '47%',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 136,
    justifyContent: 'space-between',
  },
  metricAccent: {
    alignSelf: 'flex-start',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
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
  queueCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  queueIdentity: {
    flex: 1,
  },
  queueCustomer: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  queueMeta: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  queueId: {
    color: colors.brandBlue,
    fontSize: 12,
    fontWeight: '700',
  },
  queueIssue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  queueStatusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8ECFF',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginTop: spacing.md,
  },
  queueStatusText: {
    color: colors.brandBlue,
    fontSize: 12,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  statusState: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 999,
  },
  promoPanel: {
    backgroundColor: '#FFF7EA',
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EAC66B',
    marginBottom: spacing.xl,
  },
  promoHeading: {
    color: colors.brandRed,
    fontSize: 20,
    fontWeight: '800',
  },
  promoStat: {
    color: '#6A5314',
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  promoDescription: {
    color: '#564117',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  reportCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },
});
