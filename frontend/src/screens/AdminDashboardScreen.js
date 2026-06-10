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

export default function AdminDashboardScreen({ promotions, onCreatePromotion }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [form, setForm] = useState(defaultForm);
  const [formMessage, setFormMessage] = useState('');

  const updateForm = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleCreateOffer = () => {
    const isComplete = Boolean(
      form.title.trim() &&
        form.code.trim() &&
        form.discountValue &&
        form.validFrom.trim() &&
        form.validUntil.trim() &&
        form.description.trim()
    );

    if (!isComplete) {
      setFormMessage('Please fill all promotion fields before creating the offer.');
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
  };

  const isFormComplete = Boolean(
    form.title.trim() &&
      form.code.trim() &&
      form.discountValue &&
      form.validFrom.trim() &&
      form.validUntil.trim() &&
      form.description.trim()
  );

  if (activePage === 'promotionCreate') {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Pressable
            onPress={() => setActivePage('dashboard')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <View style={styles.pageTitleBlock}>
            <Text style={styles.eyebrow}>Promotions</Text>
            <Text style={styles.sectionTitle}>Add new promotion</Text>
            <Text style={styles.sectionCaption}>
              Add every campaign detail in one place before publishing it to users.
            </Text>
          </View>
        </View>

        <View style={styles.offerBuilder}>
          <Text style={styles.formCardTitle}>Promotion details</Text>
          <Text style={styles.formCardCaption}>
            Configure promo code, discount, validity dates, slot targeting, and campaign type.
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
            placeholder={form.discountType === 'percentage' ? 'Discount %' : 'Discount amount'}
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
                    form.appliesTo === option.value && styles.optionChipTextActive,
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
                    form.campaignType === option.value && styles.optionChipTextActive,
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

          <Pressable
            onPress={handleCreateOffer}
            disabled={!isFormComplete}
            style={[styles.createButton, !isFormComplete && styles.createButtonDisabled]}
          >
            <Text style={[styles.createButtonText, !isFormComplete && styles.createButtonTextDisabled]}>
              Create offer
            </Text>
          </Pressable>
          {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
        </View>
      </ScrollView>
    );
  }

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
        title="Promotion management"
        caption="Review active campaigns or open the promotion page to add a new offer."
      />
      <View style={styles.promoPanel}>
        <Text style={styles.promoHeading}>Active offers</Text>
        <Text style={styles.promoStat}>{promotions.length} campaigns configured</Text>
        <Text style={styles.promoDescription}>
          Add a new promotion from the dedicated page so dashboard operations stay easy to scan.
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
                  {formatDiscount(promotion)} . {promotion.appliesTo} . {promotion.campaignType}
                </Text>
              </View>
              <Text style={styles.offerDates}>
                {promotion.validFrom} to {promotion.validUntil}
              </Text>
            </View>
          ))}
        </View>
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
  pageHeader: {
    marginBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 40,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.brandBlack,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '800',
  },
  pageTitleBlock: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
  createButton: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.brandRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  createButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '900',
  },
  createButtonDisabled: {
    backgroundColor: colors.border,
  },
  createButtonTextDisabled: {
    color: colors.mutedText,
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
