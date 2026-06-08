import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { formatDiscount } from '../services/promotionRules';
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

const paymentRows = [
  {
    bookingId: 'BK-2039',
    customer: 'Colombo Kings',
    amount: 'LKR 8,500',
    state: 'Pending verification',
  },
  {
    bookingId: 'BK-2042',
    customer: 'Hashan Fernando',
    amount: 'LKR 4,500',
    state: 'Partially paid',
  },
  {
    bookingId: 'BK-2048',
    customer: 'Thunder XI',
    amount: 'LKR 11,000',
    state: 'Paid',
  },
];

const userRows = [
  { name: 'Nadeesha Perera', role: 'Player', status: 'Active' },
  { name: 'Colombo Kings', role: 'Team account', status: 'Priority' },
  { name: 'Hashan Fernando', role: 'Player', status: 'Pending review' },
];

const sidebarItems = [
  { key: 'overview', short: 'OV', label: 'Overview' },
  { key: 'bookings', short: 'BK', label: 'Bookings' },
  { key: 'promotions', short: 'PR', label: 'Promotions' },
  { key: 'payments', short: 'PY', label: 'Payments' },
  { key: 'reports', short: 'RP', label: 'Reports' },
  { key: 'users', short: 'US', label: 'Users' },
];

const applyOptions = [
  { label: 'All slots', value: 'all' },
  { label: 'Peak hours', value: 'peak' },
  { label: 'Off-peak', value: 'offPeak' },
];

const campaignOptions = [
  { label: 'Standard', value: 'standard' },
  { label: 'First-time', value: 'firstTime' },
  { label: 'Weekend', value: 'weekend' },
  { label: 'Seasonal', value: 'seasonal' },
];

const defaultForm = {
  title: '',
  code: '',
  discountType: 'percentage',
  discountValue: '',
  validFrom: '2026-06-01',
  validUntil: '2026-12-31',
  appliesTo: 'all',
  campaignType: 'standard',
  description: '',
};

function SectionTitle({ eyebrow, title, caption }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
    </View>
  );
}

function Sidebar({ activePage, onSelect }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarEyebrow}>Functions</Text>
      {sidebarItems.map((item) => {
        const active = item.key === activePage;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            style={[styles.sidebarItem, active && styles.sidebarItemActive]}
          >
            <View
              style={[
                styles.sidebarIcon,
                active && styles.sidebarIconActive,
              ]}
            >
              <Text
                style={[
                  styles.sidebarIconText,
                  active && styles.sidebarIconTextActive,
                ]}
              >
                {item.short}
              </Text>
            </View>
            <Text
              style={[
                styles.sidebarLabel,
                active && styles.sidebarLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function AdminDashboardScreen({
  promotions = [],
  onCreatePromotion,
}) {
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [formMessage, setFormMessage] = useState('');

  const updateForm = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleCreateOffer = () => {
    if (!form.title.trim() || !form.code.trim() || !form.discountValue) {
      setFormMessage('Add a title, promo code, and discount value.');
      return;
    }

    onCreatePromotion({
      ...form,
      description:
        form.description ||
        `${form.code.toUpperCase()} applies to ${form.appliesTo === 'all' ? 'all time slots' : form.appliesTo}.`,
    });
    setForm(defaultForm);
    setFormMessage('Offer created and visible to users.');
    setActivePage('promotions');
  };

  const renderMetrics = () => (
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
  );

  const renderBookingCards = () => (
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
  );

  const renderOverview = () => (
    <View>
      <SectionTitle
        eyebrow="Snapshot"
        title="Admin overview"
        caption="Daily numbers and the most important operational queues."
      />
      {renderMetrics()}

      <SectionTitle
        eyebrow="Bookings"
        title="Booking queue"
        caption="Tasks that need an admin decision first."
      />
      {renderBookingCards()}

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
    </View>
  );

  const renderBookings = () => (
    <View>
      <SectionTitle
        eyebrow="Bookings"
        title="Booking management"
        caption="Review changes, payment holds, and approval tasks."
      />
      {renderBookingCards()}

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
              style={[
                styles.statusIndicator,
                { backgroundColor: item.stateColor },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderPromotions = () => (
    <View>
      <SectionTitle
        eyebrow="Promotions"
        title="Promotion management"
        caption="Review active campaigns or open the builder to add a new offer."
      />
      <View style={styles.promoPanel}>
        <Text style={styles.promoHeading}>Active offers</Text>
        <Text style={styles.promoStat}>
          {promotions.length} campaigns configured
        </Text>
        <Text style={styles.promoDescription}>
          Maintain all promo codes and seasonal campaigns from one panel.
        </Text>
        <Pressable
          onPress={() => {
            setFormMessage('');
            setActivePage('promotionCreate');
          }}
          style={styles.addPromotionButton}
        >
          <Text style={styles.addPromotionButtonText}>Add promotion</Text>
        </Pressable>
        <View style={styles.offerList}>
          {promotions.map((promotion) => (
            <View key={promotion.id} style={styles.offerRow}>
              <View style={styles.offerIdentity}>
                <Text style={styles.offerCode}>{promotion.code}</Text>
                <Text style={styles.offerMeta}>
                  {formatDiscount(promotion)} . {promotion.appliesTo} .{' '}
                  {promotion.campaignType}
                </Text>
              </View>
              <Text style={styles.offerDates}>
                {promotion.validFrom} to {promotion.validUntil}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPromotionBuilder = () => (
    <View>
      <SectionTitle
        eyebrow="Promotions"
        title="Add new promotion"
        caption="Configure promo code, discount, validity, and campaign targeting."
      />
      <View style={styles.offerBuilder}>
        <Text style={styles.formCardTitle}>Promotion details</Text>
        <Text style={styles.formCardCaption}>
          Add every campaign detail in one place before publishing it to users.
        </Text>

        <View style={styles.formRow}>
          <TextInput
            value={form.title}
            onChangeText={(value) => updateForm('title', value)}
            placeholder="Offer title"
            placeholderTextColor="#8D9198"
            style={styles.input}
          />
          <TextInput
            value={form.code}
            onChangeText={(value) => updateForm('code', value.toUpperCase())}
            placeholder="CRICKET10"
            placeholderTextColor="#8D9198"
            autoCapitalize="characters"
            style={styles.input}
          />
        </View>

        <View style={styles.segmentRow}>
          {['percentage', 'fixed'].map((type) => (
            <Pressable
              key={type}
              onPress={() => updateForm('discountType', type)}
              style={[
                styles.segmentPill,
                form.discountType === type && styles.segmentPillActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  form.discountType === type && styles.segmentTextActive,
                ]}
              >
                {type === 'percentage' ? 'Percentage' : 'Fixed LKR'}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          value={form.discountValue}
          onChangeText={(value) => updateForm('discountValue', value)}
          placeholder={
            form.discountType === 'percentage'
              ? 'Discount %'
              : 'Discount amount'
          }
          placeholderTextColor="#8D9198"
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.formRow}>
          <TextInput
            value={form.validFrom}
            onChangeText={(value) => updateForm('validFrom', value)}
            placeholder="Valid from"
            placeholderTextColor="#8D9198"
            style={styles.input}
          />
          <TextInput
            value={form.validUntil}
            onChangeText={(value) => updateForm('validUntil', value)}
            placeholder="Valid until"
            placeholderTextColor="#8D9198"
            style={styles.input}
          />
        </View>

        <Text style={styles.optionLabel}>Apply to</Text>
        <View style={styles.chipWrap}>
          {applyOptions.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => updateForm('appliesTo', option.value)}
              style={[
                styles.optionChip,
                form.appliesTo === option.value && styles.optionChipActive,
              ]}
            >
              <Text
                style={[
                  styles.optionChipText,
                  form.appliesTo === option.value &&
                    styles.optionChipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.optionLabel}>Campaign type</Text>
        <View style={styles.chipWrap}>
          {campaignOptions.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => updateForm('campaignType', option.value)}
              style={[
                styles.optionChip,
                form.campaignType === option.value && styles.optionChipActive,
              ]}
            >
              <Text
                style={[
                  styles.optionChipText,
                  form.campaignType === option.value &&
                    styles.optionChipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          value={form.description}
          onChangeText={(value) => updateForm('description', value)}
          placeholder="Short offer description"
          placeholderTextColor="#8D9198"
          style={styles.input}
        />

        <View style={styles.builderActions}>
          <Pressable
            onPress={() => setActivePage('promotions')}
            style={styles.builderSecondaryButton}
          >
            <Text style={styles.builderSecondaryButtonText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleCreateOffer} style={styles.createButton}>
            <Text style={styles.createButtonText}>Create offer</Text>
          </Pressable>
        </View>
        {formMessage ? (
          <Text style={styles.formMessage}>{formMessage}</Text>
        ) : null}
      </View>
    </View>
  );

  const renderPayments = () => (
    <View>
      <SectionTitle
        eyebrow="Payments"
        title="Payment tracking"
        caption="Monitor manual payment status for each booking."
      />
      <View style={styles.stack}>
        {paymentRows.map((payment) => (
          <View key={payment.bookingId} style={styles.queueCard}>
            <View style={styles.queueHeader}>
              <View style={styles.queueIdentity}>
                <Text style={styles.queueCustomer}>{payment.customer}</Text>
                <Text style={styles.queueMeta}>{payment.bookingId}</Text>
              </View>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
            </View>
            <View style={styles.queueStatusPill}>
              <Text style={styles.queueStatusText}>{payment.state}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReports = () => (
    <View>
      <SectionTitle
        eyebrow="Reports"
        title="Analytics and reporting"
        caption="Read performance signals before you export full reports."
      />
      {renderMetrics()}
      <View style={styles.stack}>
        {reports.map((line) => (
          <View key={line} style={styles.reportCard}>
            <Text style={styles.reportText}>{line}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderUsers = () => (
    <View>
      <SectionTitle
        eyebrow="Users"
        title="User management"
        caption="Review account types and users needing attention."
      />
      <View style={styles.stack}>
        {userRows.map((user) => (
          <View key={user.name} style={styles.userCard}>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userMeta}>{user.role}</Text>
            </View>
            <View style={styles.userStatusPill}>
              <Text style={styles.userStatusText}>{user.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderActivePanel = () => {
    switch (activePage) {
      case 'bookings':
        return renderBookings();
      case 'promotions':
        return renderPromotions();
      case 'promotionCreate':
        return renderPromotionBuilder();
      case 'payments':
        return renderPayments();
      case 'reports':
        return renderReports();
      case 'users':
        return renderUsers();
      case 'overview':
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.root}>
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
            <View style={styles.heroActions}>
              <Pressable
                onPress={() => setSidebarOpen(true)}
                style={styles.burgerButton}
              >
                <View style={styles.burgerLine} />
                <View style={styles.burgerLine} />
                <View style={styles.burgerLineShort} />
              </Pressable>
              <View style={styles.livePill}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live</Text>
              </View>
            </View>
          </View>

          <Text style={styles.heroSubtitle}>
            Manage bookings, promotions, manual payments, and reporting from one
            admin workspace.
          </Text>
        </View>

        <View style={styles.workspaceContent}>{renderActivePanel()}</View>
      </ScrollView>

      {sidebarOpen ? (
        <View style={styles.drawerLayer}>
          <Pressable
            onPress={() => setSidebarOpen(false)}
            style={styles.drawerBackdrop}
          />
          <View style={styles.drawerPanel}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Admin Menu</Text>
              <Pressable
                onPress={() => setSidebarOpen(false)}
                style={styles.drawerCloseButton}
              >
                <Text style={styles.drawerCloseText}>Close</Text>
              </Pressable>
            </View>
            <Sidebar
              activePage={activePage}
              onSelect={(page) => {
                setActivePage(page);
                setSidebarOpen(false);
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  heroActions: {
    alignItems: 'flex-end',
    gap: spacing.sm,
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
  burgerButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#17171D',
    borderWidth: 1,
    borderColor: '#2A2A34',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  burgerLine: {
    width: 18,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  burgerLineShort: {
    width: 12,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.brandGold,
  },
  sidebar: {
    backgroundColor: 'transparent',
  },
  sidebarEyebrow: {
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  sidebarItem: {
    borderRadius: 18,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    alignItems: 'flex-start',
  },
  sidebarItemActive: {
    backgroundColor: '#1B1B22',
    borderWidth: 1,
    borderColor: '#2E2E39',
  },
  sidebarIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22222A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  sidebarIconActive: {
    backgroundColor: colors.brandGold,
  },
  sidebarIconText: {
    color: '#D7DAE0',
    fontSize: 11,
    fontWeight: '900',
  },
  sidebarIconTextActive: {
    color: colors.brandBlack,
  },
  sidebarLabel: {
    color: '#C5C9D1',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  sidebarLabelActive: {
    color: colors.surface,
  },
  workspaceContent: {
    width: '100%',
  },
  drawerLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawerPanel: {
    width: 240,
    height: '100%',
    backgroundColor: '#111115',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    padding: spacing.md,
    borderRightWidth: 1,
    borderRightColor: '#27272E',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  drawerTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '800',
  },
  drawerCloseButton: {
    borderRadius: 999,
    backgroundColor: '#1C1C23',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  drawerCloseText: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '800',
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
  addPromotionButton: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.brandRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  addPromotionButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '900',
  },
  offerBuilder: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  formCardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  formCardCaption: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    fontWeight: '600',
  },
  segmentRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: 4,
    gap: spacing.xs,
  },
  segmentPill: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  segmentPillActive: {
    backgroundColor: colors.brandGold,
  },
  segmentText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: colors.brandBlack,
  },
  optionLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipActive: {
    backgroundColor: '#F4E4B5',
    borderColor: colors.brandGold,
  },
  optionChipText: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
  },
  optionChipTextActive: {
    color: colors.brandBlack,
  },
  builderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  builderSecondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  builderSecondaryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  createButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.brandRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '900',
  },
  formMessage: {
    color: colors.brandBlue,
    fontSize: 13,
    fontWeight: '700',
  },
  offerList: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  offerRow: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#EAC66B',
  },
  offerIdentity: {
    marginBottom: spacing.xs,
  },
  offerCode: {
    color: colors.brandRed,
    fontSize: 16,
    fontWeight: '900',
  },
  offerMeta: {
    color: '#6A5314',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  offerDates: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
  },
  paymentAmount: {
    color: colors.brandRed,
    fontSize: 14,
    fontWeight: '900',
  },
  userCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  userName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  userMeta: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  userStatusPill: {
    borderRadius: 999,
    backgroundColor: '#F4E4B5',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  userStatusText: {
    color: colors.brandBlack,
    fontSize: 12,
    fontWeight: '800',
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
