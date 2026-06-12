import { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { formatDiscount } from '../services/promotionRules';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');

const navItems = [
  { key: 'overview', short: 'OV', label: 'Overview', eyebrow: 'Operations' },
  { key: 'bookings', short: 'BK', label: 'Bookings', eyebrow: 'Scheduling' },
  { key: 'promotions', short: 'PR', label: 'Promotions', eyebrow: 'Growth' },
  { key: 'payments', short: 'PY', label: 'Payments', eyebrow: 'Finance' },
  { key: 'reports', short: 'RP', label: 'Reports', eyebrow: 'Insights' },
  { key: 'users', short: 'US', label: 'Users', eyebrow: 'Community' },
];

const commandStats = [
  {
    label: 'Bookings today',
    value: '28',
    note: '+6 vs yesterday',
    tone: '#E9D7A2',
  },
  {
    label: 'Pending approvals',
    value: '06',
    note: '2 high-priority requests',
    tone: '#F5C8D0',
  },
  {
    label: 'Revenue today',
    value: 'LKR 42K',
    note: 'Manual payments included',
    tone: '#CFEEDB',
  },
  {
    label: 'Offer conversion',
    value: '14%',
    note: 'Weekend push is trending up',
    tone: '#D9E3FF',
  },
];

const quickActions = [
  { key: 'bookings', title: 'Review queue', caption: 'Handle urgent booking changes' },
  { key: 'promotions', title: 'Campaign board', caption: 'Check live offers and performance' },
  { key: 'payments', title: 'Verify transfers', caption: 'Clear pending payment proofs' },
];

const alertCards = [
  {
    title: 'Manual payment backlog',
    body: '7 transfers still need confirmation before tonight’s prime slots lock in.',
    tag: 'Urgent',
  },
  {
    title: 'Morning slot pressure',
    body: '6 AM to 8 AM availability dropped below 12% for the next two days.',
    tag: 'Watch',
  },
  {
    title: 'Promo code momentum',
    body: 'First-time campaign is driving the highest repeat conversion this week.',
    tag: 'Growth',
  },
];

const bookingQueue = [
  {
    id: 'BK-2039',
    customer: 'Colombo Kings',
    slot: 'Today | 7:30 PM',
    surface: 'Indoor Net A',
    issue: 'Manual payment pending verification',
    status: 'Needs review',
  },
  {
    id: 'BK-2044',
    customer: 'Nadeesha Perera',
    slot: 'Tomorrow | 6:00 AM',
    surface: 'Main Arena',
    issue: 'Requested a reschedule to Friday evening',
    status: 'Action required',
  },
  {
    id: 'BK-2048',
    customer: 'Thunder XI',
    slot: 'Tomorrow | 8:00 PM',
    surface: 'Indoor Net B',
    issue: 'Confirmed and ready for check-in',
    status: 'On track',
  },
  {
    id: 'BK-2052',
    customer: 'Chamath Silva',
    slot: 'Friday | 5:30 PM',
    surface: 'Indoor Net A',
    issue: 'Needs captain confirmation for added players',
    status: 'Follow up',
  },
];

const bookingHealth = [
  { label: 'Prime-time occupancy', value: '91%' },
  { label: 'Reschedule requests', value: '04' },
  { label: 'Same-day cancellations', value: '01' },
];

const paymentRows = [
  {
    bookingId: 'BK-2039',
    customer: 'Colombo Kings',
    amount: 'LKR 8,500',
    state: 'Pending verification',
    note: 'Bank slip uploaded 12 mins ago',
  },
  {
    bookingId: 'BK-2042',
    customer: 'Hashan Fernando',
    amount: 'LKR 4,500',
    state: 'Partially paid',
    note: 'Balance due before slot release',
  },
  {
    bookingId: 'BK-2048',
    customer: 'Thunder XI',
    amount: 'LKR 11,000',
    state: 'Paid',
    note: 'Confirmed and ready for match pack',
  },
];

const financeStats = [
  { label: 'Cleared today', value: 'LKR 31K' },
  { label: 'Pending proof', value: 'LKR 13K' },
  { label: 'Refund exposure', value: 'LKR 2.5K' },
];

const reportCards = [
  {
    title: 'Peak hour demand',
    body: 'Demand is strongest between 6 PM and 9 PM, with indoor nets filling first and team bookings converting faster than individual sessions.',
  },
  {
    title: 'Weekend revenue mix',
    body: 'Weekend sessions contribute 48% of this week’s total revenue and show the strongest repeat-booking behavior among league teams.',
  },
  {
    title: 'Promotion lift',
    body: 'Promotions increased repeat bookings by 11% this month, especially among first-time players and off-peak trial bookings.',
  },
];

const performanceBars = [
  { label: 'Occupancy', value: 91, tone: '#C8961A' },
  { label: 'Collection rate', value: 84, tone: '#1F2F86' },
  { label: 'Offer adoption', value: 67, tone: '#9E1228' },
  { label: 'Repeat players', value: 73, tone: '#1D7A4E' },
];

const activityFeed = [
  'Payment proof received from Colombo Kings.',
  'Weekend promo code activated on the user dashboard.',
  'Reschedule request submitted for BK-2044.',
  'Main Arena inventory check marked complete.',
];

const userSegments = [
  { label: 'Active players', value: '1,284' },
  { label: 'Priority teams', value: '42' },
  { label: 'Pending reviews', value: '09' },
];

const userRows = [
  {
    name: 'Nadeesha Perera',
    role: 'Player',
    status: 'Active',
    note: 'Booked 3 sessions in the last 14 days',
  },
  {
    name: 'Colombo Kings',
    role: 'Team account',
    status: 'Priority',
    note: 'High-volume weekend customer',
  },
  {
    name: 'Hashan Fernando',
    role: 'Player',
    status: 'Pending review',
    note: 'Awaiting manual payment confirmation',
  },
];

const campaignOptions = [
  { label: 'Standard', value: 'standard' },
  { label: 'First-time', value: 'firstTime' },
  { label: 'Weekend', value: 'weekend' },
  { label: 'Seasonal', value: 'seasonal' },
];

const applyOptions = [
  { label: 'All slots', value: 'all' },
  { label: 'Peak hours', value: 'peak' },
  { label: 'Off-peak', value: 'offPeak' },
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

function SectionHeader({ eyebrow, title, caption, action, compact = false }) {
  return (
    <View style={[styles.sectionHeader, compact && styles.sectionHeaderCompact]}>
      <View style={styles.sectionHeaderCopy}>
        <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        {caption ? <Text style={styles.sectionCaption}>{caption}</Text> : null}
      </View>
      {action ? (
        <Text style={[styles.sectionAction, compact && styles.sectionActionCompact]}>
          {action}
        </Text>
      ) : null}
    </View>
  );
}

function StatCard({ label, value, note, tone }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statAccent, { backgroundColor: tone }]} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statNote}>{note}</Text>
    </View>
  );
}

function ActionCard({ title, caption, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.actionCard}>
      <Text style={styles.actionCardTitle}>{title}</Text>
      <Text style={styles.actionCardText}>{caption}</Text>
    </Pressable>
  );
}

function AlertCard({ title, body, tag }) {
  return (
    <View style={styles.alertCard}>
      <Text style={styles.alertTag}>{tag}</Text>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertText}>{body}</Text>
    </View>
  );
}

function ProgressRow({ label, value, tone }) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>{value}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${value}%`, backgroundColor: tone },
          ]}
        />
      </View>
    </View>
  );
}

function DataRow({ title, meta, right, note, light = false, compact = false }) {
  return (
    <View
      style={[
        styles.dataRow,
        compact && styles.dataRowCompact,
        light && styles.dataRowLight,
      ]}
    >
      <View style={styles.dataCopy}>
        <Text style={[styles.dataTitle, light && styles.dataTitleLight]}>{title}</Text>
        <Text style={[styles.dataMeta, light && styles.dataMetaLight]}>{meta}</Text>
        {note ? <Text style={[styles.dataNote, light && styles.dataNoteLight]}>{note}</Text> : null}
      </View>
      <View
        style={[
          styles.dataPill,
          compact && styles.dataPillCompact,
          light && styles.dataPillLight,
        ]}
      >
        <Text style={[styles.dataPillText, light && styles.dataPillTextLight]}>
          {right}
        </Text>
      </View>
    </View>
  );
}

function Sidebar({ activePage, onSelect }) {
  return (
    <View>
      <Text style={styles.sidebarEyebrow}>Workspaces</Text>
      {navItems.map((item) => {
        const active = item.key === activePage;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            style={[styles.sidebarItem, active && styles.sidebarItemActive]}
          >
            <View style={[styles.sidebarIcon, active && styles.sidebarIconActive]}>
              <Text
                style={[
                  styles.sidebarIconText,
                  active && styles.sidebarIconTextActive,
                ]}
              >
                {item.short}
              </Text>
            </View>
            <View style={styles.sidebarCopy}>
              <Text style={[styles.sidebarLabel, active && styles.sidebarLabelActive]}>
                {item.label}
              </Text>
              <Text
                style={[
                  styles.sidebarMeta,
                  active && styles.sidebarMetaActive,
                ]}
              >
                {item.eyebrow}
              </Text>
            </View>
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
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const phone = width < 430;
  const tablet = width >= 760;
  const contentPadding = compact ? spacing.md : spacing.lg;
  const drawerWidth = Math.min(width * 0.78, 300);
  const statWidth = compact ? '100%' : tablet ? '23.5%' : '48%';

  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [formMessage, setFormMessage] = useState('');

  const activeItem = useMemo(() => {
    const match = navItems.find((item) => item.key === activePage);
    return match || navItems[0];
  }, [activePage]);

  const promoCountLabel = `${promotions.length} live`;

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openWorkspace = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
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
        `${form.code.toUpperCase()} applies to ${
          form.appliesTo === 'all' ? 'all time slots' : form.appliesTo
        }.`,
    });

    setForm(defaultForm);
    setFormMessage('Offer created and visible to users.');
    setActivePage('promotions');
  };

  const renderOverview = () => (
    <View>
      <SectionHeader
        eyebrow="Overview"
        title="Live operations board"
        caption="High-clarity monitoring for bookings, collections, promotions, and service pressure."
        action="Refreshing now"
        compact={phone}
      />

      <View style={styles.statGrid}>
        {commandStats.map((metric) => (
          <View key={metric.label} style={{ width: statWidth }}>
            <StatCard {...metric} />
          </View>
        ))}
      </View>

      <View style={[styles.panelRow, !tablet && styles.panelColumn]}>
        <View style={styles.commandPanel}>
          <SectionHeader
            eyebrow="Command"
            title="Immediate action lanes"
            caption="Shortcuts for the most common admin decisions."
            compact={phone}
          />
          <View style={styles.actionGrid}>
            {quickActions.map((item) => (
              <ActionCard
                key={item.key}
                title={item.title}
                caption={item.caption}
                onPress={() => openWorkspace(item.key)}
              />
            ))}
          </View>

          <View style={styles.healthStrip}>
            {bookingHealth.map((item) => (
              <View key={item.label} style={styles.healthTile}>
                <Text style={styles.healthValue}>{item.value}</Text>
                <Text style={styles.healthLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.activityPanel}>
          <SectionHeader
            eyebrow="Attention"
            title="What needs an admin now"
            caption="Quick scan before you drill into a workspace."
            compact={phone}
          />
          <View style={styles.alertStack}>
            {alertCards.map((item) => (
              <AlertCard key={item.title} {...item} />
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.panelRow, !tablet && styles.panelColumn]}>
        <View style={styles.surfacePanel}>
          <SectionHeader
            eyebrow="Queue"
            title="Booking priority list"
            caption="Fast triage for requests that can affect occupancy and customer confidence."
            action="4 items"
            compact={phone}
          />
          <View style={styles.stackedList}>
            {bookingQueue.slice(0, 3).map((item) => (
              <DataRow
                key={item.id}
                title={`${item.customer} | ${item.id}`}
                meta={`${item.slot} | ${item.surface}`}
                right={item.status}
                note={item.issue}
                compact={phone}
              />
            ))}
          </View>
        </View>

        <View style={styles.surfacePanel}>
          <SectionHeader
            eyebrow="Performance"
            title="Operational scorecard"
            caption="Simple reporting that works well on mobile and desktop."
            compact={phone}
          />
          <View style={styles.progressStack}>
            {performanceBars.map((item) => (
              <ProgressRow key={item.label} {...item} />
            ))}
          </View>

          <View style={styles.feedPanel}>
            <Text style={styles.feedTitle}>Recent activity</Text>
            {activityFeed.map((item) => (
              <View key={item} style={styles.feedRow}>
                <View style={styles.feedDot} />
                <Text style={styles.feedText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderBookings = () => (
    <View>
      <SectionHeader
        eyebrow="Bookings"
        title="Scheduling and booking control"
        caption="Manage exceptions, prepare peak slots, and keep the day running cleanly."
        action="3 urgent"
        compact={phone}
      />

      <View style={styles.surfacePanel}>
        <View style={styles.healthStrip}>
          {bookingHealth.map((item) => (
            <View key={item.label} style={styles.healthTileLight}>
              <Text style={styles.healthValueDark}>{item.value}</Text>
              <Text style={styles.healthLabelDark}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stackedList}>
        {bookingQueue.map((item) => (
          <DataRow
            key={item.id}
            title={`${item.customer} | ${item.id}`}
            meta={`${item.slot} | ${item.surface}`}
            right={item.status}
            note={item.issue}
            compact={phone}
          />
        ))}
      </View>
    </View>
  );

  const renderPromotions = () => (
    <View>
      <SectionHeader
        eyebrow="Promotions"
        title="Campaign management"
        caption="Professional promotion controls with stronger visibility into live campaigns and growth levers."
        action={promoCountLabel}
        compact={phone}
      />

      <View style={styles.heroPromoPanel}>
        <View style={styles.heroPromoCopy}>
          <Text style={styles.heroPromoTitle}>Shape demand, not just discounts</Text>
          <Text style={styles.heroPromoText}>
            Use the admin workspace to push off-peak occupancy, onboard first-time
            players, and keep weekend demand priced intelligently.
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setFormMessage('');
            setActivePage('promotionCreate');
          }}
          style={styles.primaryInlineButton}
        >
          <Text style={styles.primaryInlineButtonText}>Create campaign</Text>
        </Pressable>
      </View>

      <View style={styles.cardGrid}>
        {promotions.map((promotion) => (
          <View key={promotion.id} style={styles.campaignCard}>
            <View style={styles.campaignHeader}>
              <Text style={styles.campaignCode}>{promotion.code}</Text>
              <View style={styles.campaignStatusPill}>
                <Text style={styles.campaignStatusText}>
                  {promotion.isActive ? 'Live' : 'Draft'}
                </Text>
              </View>
            </View>
            <Text style={styles.campaignValue}>{formatDiscount(promotion)}</Text>
            <Text style={styles.campaignMeta}>
              {promotion.appliesTo} | {promotion.campaignType}
            </Text>
            <Text style={styles.campaignDates}>
              {promotion.validFrom} - {promotion.validUntil}
            </Text>
            <Text style={styles.campaignDescription}>
              {promotion.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPromotionBuilder = () => (
    <View>
      <SectionHeader
        eyebrow="Promotions"
        title="Campaign builder"
        caption="Create a polished offer with the details an admin team actually needs."
        action="Draft mode"
        compact={phone}
      />

      <View style={[styles.panelRow, !tablet && styles.panelColumn]}>
        <View style={styles.builderPanel}>
          <View style={[styles.formRow, compact && styles.formColumn]}>
            <TextInput
              value={form.title}
              onChangeText={(value) => updateForm('title', value)}
              placeholder="Offer title"
              placeholderTextColor="#8B9098"
              style={styles.input}
            />
            <TextInput
              value={form.code}
              onChangeText={(value) => updateForm('code', value.toUpperCase())}
              placeholder="CRICKET10"
              placeholderTextColor="#8B9098"
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
                  styles.segmentButton,
                  form.discountType === type && styles.segmentButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentButtonText,
                    form.discountType === type && styles.segmentButtonTextActive,
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
                ? 'Discount percentage'
                : 'Discount amount'
            }
            placeholderTextColor="#8B9098"
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={[styles.formRow, compact && styles.formColumn]}>
            <TextInput
              value={form.validFrom}
              onChangeText={(value) => updateForm('validFrom', value)}
              placeholder="Valid from"
              placeholderTextColor="#8B9098"
              style={styles.input}
            />
            <TextInput
              value={form.validUntil}
              onChangeText={(value) => updateForm('validUntil', value)}
              placeholder="Valid until"
              placeholderTextColor="#8B9098"
              style={styles.input}
            />
          </View>

          <Text style={styles.fieldLabel}>Apply to</Text>
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

          <Text style={styles.fieldLabel}>Campaign type</Text>
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
            placeholderTextColor="#8B9098"
            style={[styles.input, styles.descriptionInput]}
            multiline
          />

          <View style={[styles.builderActions, compact && styles.formColumn]}>
            <Pressable
              onPress={() => setActivePage('promotions')}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Back to campaigns</Text>
            </Pressable>
            <Pressable onPress={handleCreateOffer} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Publish offer</Text>
            </Pressable>
          </View>

          {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}
        </View>

        <View style={styles.builderAside}>
          <Text style={styles.builderAsideEyebrow}>Preview</Text>
          <Text style={styles.builderAsideTitle}>
            {form.title || 'Your campaign title will appear here'}
          </Text>
          <Text style={styles.builderAsideValue}>
            {form.discountValue
              ? form.discountType === 'percentage'
                ? `${form.discountValue}% off`
                : `LKR ${form.discountValue} off`
              : 'Add the discount amount'}
          </Text>
          <Text style={styles.builderAsideText}>
            Code: {form.code || 'PROMO'} | Audience: {form.appliesTo}
          </Text>
          <Text style={styles.builderAsideText}>
            Campaign: {form.campaignType} | Active: {form.validFrom} - {form.validUntil}
          </Text>
          <View style={styles.builderPreviewCard}>
            <Text style={styles.builderPreviewCardTitle}>What this helps with</Text>
            <Text style={styles.builderPreviewCardText}>
              Strong admin campaigns are clear, time-bound, and attached to a real
              demand goal such as off-peak fill, first booking conversion, or team
              retention.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderPayments = () => (
    <View>
      <SectionHeader
        eyebrow="Payments"
        title="Finance and verification"
        caption="Keep incoming payments, pending proofs, and refund exposure visible at a glance."
        action="Manual review"
        compact={phone}
      />

      <View style={styles.surfacePanel}>
        <View style={styles.healthStrip}>
          {financeStats.map((item) => (
            <View key={item.label} style={styles.healthTileLight}>
              <Text style={styles.healthValueDark}>{item.value}</Text>
              <Text style={styles.healthLabelDark}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stackedList}>
        {paymentRows.map((payment) => (
          <DataRow
            key={payment.bookingId}
            title={`${payment.customer} | ${payment.bookingId}`}
            meta={payment.amount}
            right={payment.state}
            note={payment.note}
            compact={phone}
          />
        ))}
      </View>
    </View>
  );

  const renderReports = () => (
    <View>
      <SectionHeader
        eyebrow="Reports"
        title="Reporting and trend reading"
        caption="A sharper daily dashboard for checking capacity, collections, and campaign performance."
        action="This week"
        compact={phone}
      />

      <View style={styles.statGrid}>
        {commandStats.map((metric) => (
          <View key={metric.label} style={{ width: statWidth }}>
            <StatCard {...metric} />
          </View>
        ))}
      </View>

      <View style={styles.reportGrid}>
        {reportCards.map((item) => (
          <View key={item.title} style={styles.reportCard}>
            <Text style={styles.reportTitle}>{item.title}</Text>
            <Text style={styles.reportText}>{item.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.surfacePanel}>
        <SectionHeader
          eyebrow="Trend"
          title="Performance bars"
          caption="Quick reading for team check-ins and operational standups."
          compact={phone}
        />
        <View style={styles.progressStack}>
          {performanceBars.map((item) => (
            <ProgressRow key={item.label} {...item} />
          ))}
        </View>
      </View>
    </View>
  );

  const renderUsers = () => (
    <View>
      <SectionHeader
        eyebrow="Users"
        title="Account and community management"
        caption="Track account quality, priority teams, and users that need intervention."
        action="Community"
        compact={phone}
      />

      <View style={styles.surfacePanel}>
        <View style={styles.healthStrip}>
          {userSegments.map((item) => (
            <View key={item.label} style={styles.healthTileLight}>
              <Text style={styles.healthValueDark}>{item.value}</Text>
              <Text style={styles.healthLabelDark}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stackedList}>
        {userRows.map((user) => (
          <DataRow
            key={user.name}
            title={user.name}
            meta={user.role}
            right={user.status}
            note={user.note}
            light
            compact={phone}
          />
        ))}
      </View>
    </View>
  );

  const renderPanel = () => {
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
      <View pointerEvents="none" style={styles.backgroundLayer}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />
      </View>

      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: contentPadding, paddingBottom: spacing.xxl },
        ]}
        scrollEnabled={!sidebarOpen}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroCard, phone && styles.heroCardPhone]}>
          <View pointerEvents="none" style={styles.heroGlow} />

          <View style={[styles.heroTopRow, phone && styles.heroTopRowPhone]}>
            <View style={styles.heroUtilityPill}>
              <Text style={styles.heroUtilityText}>Professional admin workspace</Text>
            </View>

            <View style={[styles.heroControls, phone && styles.heroControlsPhone]}>
              <View style={styles.livePill}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live board</Text>
              </View>
              <Pressable onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLineShort} />
              </Pressable>
            </View>
          </View>

          <View style={[styles.heroBrandRow, phone && styles.heroBrandRowPhone]}>
            <Image
              source={logo}
              style={[styles.heroLogo, phone && styles.heroLogoPhone]}
              resizeMode="contain"
            />
            <View style={styles.heroBrandCopy}>
              <Text style={styles.heroBrandTitle}>ACK Indoor Cricket</Text>
              <Text style={styles.heroBrandMeta}>Admin operations panel</Text>
            </View>
          </View>

          <Text
            style={[
              styles.heroTitle,
              phone && styles.heroTitlePhone,
              compact && styles.heroTitleCompact,
            ]}
          >
            Stadium operations, reporting, and growth in one control room.
          </Text>

          <Text style={[styles.heroSubtitle, phone && styles.heroSubtitlePhone]}>
            A cleaner admin panel for bookings, finance checks, promotions,
            reports, and customer oversight across mobile and wider screens.
          </Text>

          <View style={[styles.heroMetaRow, !tablet && styles.heroMetaColumn]}>
            <View style={styles.heroPanelTag}>
              <Text style={styles.heroPanelTagText}>Active workspace</Text>
              <Text style={styles.heroPanelValue}>{activeItem.label}</Text>
              <Text style={styles.heroPanelSubtext}>{activeItem.eyebrow}</Text>
            </View>

            <View style={styles.heroMiniStat}>
              <Text style={styles.heroMiniStatValue}>07</Text>
              <Text style={styles.heroMiniStatLabel}>Manual checks pending</Text>
            </View>

            <View style={styles.heroMiniStat}>
              <Text style={styles.heroMiniStatValue}>91%</Text>
              <Text style={styles.heroMiniStatLabel}>Prime-time occupancy</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.workspacePills}
          >
            {navItems.map((item) => {
              const active = item.key === activePage;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => setActivePage(item.key)}
                  style={[styles.workspacePill, active && styles.workspacePillActive]}
                >
                  <Text
                    style={[
                      styles.workspacePillText,
                      active && styles.workspacePillTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {renderPanel()}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={sidebarOpen}
        onRequestClose={() => setSidebarOpen(false)}
      >
        <View style={styles.drawerLayer}>
          <Pressable
            onPress={() => setSidebarOpen(false)}
            style={styles.drawerBackdrop}
          />
          <View style={[styles.drawerPanel, { width: drawerWidth }]}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerTitle}>Admin menu</Text>
                <Text style={styles.drawerSubtitle}>Choose a workspace</Text>
              </View>
              <Pressable
                onPress={() => setSidebarOpen(false)}
                style={styles.drawerClose}
              >
                <Text style={styles.drawerCloseText}>Close</Text>
              </Pressable>
            </View>

            <Sidebar activePage={activePage} onSelect={openWorkspace} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3EFE6',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -100,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(200,150,26,0.12)',
  },
  backgroundGlowBottom: {
    position: 'absolute',
    left: -90,
    bottom: 120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(31,47,134,0.08)',
  },
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingTop: spacing.lg,
  },
  heroCard: {
    backgroundColor: '#0F1116',
    borderRadius: 34,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#1E222D',
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  heroCardPhone: {
    borderRadius: 26,
    padding: spacing.md,
  },
  heroGlow: {
    position: 'absolute',
    top: -20,
    right: -10,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(200,150,26,0.15)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    alignItems: 'center',
  },
  heroTopRowPhone: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: spacing.sm,
  },
  heroUtilityPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    backgroundColor: 'rgba(200,150,26,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(200,150,26,0.24)',
  },
  heroUtilityText: {
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  heroBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  heroBrandRowPhone: {
    gap: spacing.sm,
  },
  heroLogo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  heroLogoPhone: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  heroBrandCopy: {
    flex: 1,
  },
  heroBrandTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '900',
  },
  heroBrandMeta: {
    color: '#929AA5',
    fontSize: 12,
    marginTop: 3,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: spacing.md,
    maxWidth: '100%',
  },
  heroTitlePhone: {
    fontSize: 22,
    lineHeight: 27,
  },
  heroTitleCompact: {
    fontSize: 22,
    lineHeight: 27,
  },
  heroSubtitle: {
    color: '#C5CAD3',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
    maxWidth: '100%',
  },
  heroSubtitlePhone: {
    fontSize: 13,
    lineHeight: 19,
  },
  heroControls: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  heroControlsPhone: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#171A21',
    borderWidth: 1,
    borderColor: '#262A34',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  menuLine: {
    width: 18,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  menuLineShort: {
    width: 12,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.brandGold,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: 999,
    backgroundColor: 'rgba(158,18,40,0.22)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  liveText: {
    color: '#F2DADF',
    fontSize: 12,
    fontWeight: '900',
  },
  heroMetaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  heroMetaColumn: {
    flexDirection: 'column',
  },
  heroPanelTag: {
    flex: 1.2,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: '#262B36',
  },
  heroPanelTagText: {
    color: '#8E95A1',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  heroPanelValue: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 5,
  },
  heroPanelSubtext: {
    color: '#9AA1AC',
    fontSize: 12,
    marginTop: 4,
  },
  heroMiniStat: {
    flex: 1,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: '#171A21',
    borderWidth: 1,
    borderColor: '#252934',
  },
  heroMiniStatValue: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
  },
  heroMiniStatLabel: {
    color: '#98A0AB',
    fontSize: 12,
    marginTop: 5,
  },
  workspacePills: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  workspacePill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#171A20',
    borderWidth: 1,
    borderColor: '#242933',
  },
  workspacePillActive: {
    backgroundColor: colors.brandGold,
    borderColor: colors.brandGold,
  },
  workspacePillText: {
    color: '#CCD1D9',
    fontSize: 13,
    fontWeight: '800',
  },
  workspacePillTextActive: {
    color: colors.brandBlack,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sectionHeaderCompact: {
    flexDirection: 'column',
    gap: spacing.xs,
  },
  sectionHeaderCopy: {
    flex: 1,
  },
  sectionEyebrow: {
    color: colors.brandRed,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  sectionCaption: {
    color: '#6A6E78',
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  sectionAction: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionActionCompact: {
    marginTop: 0,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    minHeight: 156,
    borderRadius: 26,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  statAccent: {
    width: 42,
    height: 8,
    borderRadius: 999,
    marginBottom: spacing.md,
  },
  statLabel: {
    color: '#696E78',
    fontSize: 13,
    fontWeight: '800',
  },
  statValue: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 33,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  statNote: {
    color: '#7B8089',
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  panelRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  panelColumn: {
    flexDirection: 'column',
  },
  commandPanel: {
    flex: 1.3,
    borderRadius: 30,
    padding: spacing.md,
    backgroundColor: '#111319',
    borderWidth: 1,
    borderColor: '#1F2330',
  },
  activityPanel: {
    flex: 0.9,
    borderRadius: 30,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  actionGrid: {
    gap: spacing.sm,
  },
  actionCard: {
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: '#191C24',
    borderWidth: 1,
    borderColor: '#272B37',
  },
  actionCardTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
  actionCardText: {
    color: '#AEB5BF',
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  healthStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  healthTile: {
    flex: 1,
    minWidth: 120,
    borderRadius: 20,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: '#272B35',
  },
  healthTileLight: {
    flex: 1,
    minWidth: 120,
    borderRadius: 20,
    padding: spacing.md,
    backgroundColor: '#F7F2E8',
    borderWidth: 1,
    borderColor: '#E7DFCF',
  },
  healthValue: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
  },
  healthLabel: {
    color: '#98A0AA',
    fontSize: 12,
    marginTop: 5,
  },
  healthValueDark: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  healthLabelDark: {
    color: '#6D726F',
    fontSize: 12,
    marginTop: 5,
  },
  alertStack: {
    gap: spacing.sm,
  },
  alertCard: {
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#EBE2CF',
  },
  alertTag: {
    color: colors.brandRed,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  alertTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  alertText: {
    color: '#656A74',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  surfacePanel: {
    flex: 1,
    borderRadius: 30,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  stackedList: {
    gap: spacing.sm,
  },
  dataRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  dataRowCompact: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dataRowLight: {
    backgroundColor: '#FBF8F1',
  },
  dataCopy: {
    flex: 1,
  },
  dataTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  dataTitleLight: {
    color: colors.text,
  },
  dataMeta: {
    color: '#666C75',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  dataMetaLight: {
    color: '#666C75',
  },
  dataNote: {
    color: '#8A9099',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  dataNoteLight: {
    color: '#8A9099',
  },
  dataPill: {
    borderRadius: 999,
    backgroundColor: '#101217',
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  dataPillCompact: {
    alignSelf: 'flex-start',
  },
  dataPillLight: {
    backgroundColor: '#F1DEA5',
  },
  dataPillText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '900',
  },
  dataPillTextLight: {
    color: colors.brandBlack,
  },
  progressStack: {
    gap: spacing.md,
  },
  progressRow: {
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  progressLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  progressValue: {
    color: '#5E6470',
    fontSize: 13,
    fontWeight: '900',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ECE5D7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  feedPanel: {
    marginTop: spacing.lg,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: '#F8F4EB',
    borderWidth: 1,
    borderColor: '#E9E0CF',
  },
  feedTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  feedRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },
  feedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandGold,
    marginTop: 5,
  },
  feedText: {
    flex: 1,
    color: '#676D77',
    fontSize: 13,
    lineHeight: 18,
  },
  heroPromoPanel: {
    borderRadius: 30,
    padding: spacing.lg,
    backgroundColor: '#111319',
    borderWidth: 1,
    borderColor: '#202430',
    marginBottom: spacing.lg,
  },
  heroPromoCopy: {
    maxWidth: 520,
  },
  heroPromoTitle: {
    color: colors.surface,
    fontSize: 26,
    lineHeight: 29,
    fontWeight: '900',
  },
  heroPromoText: {
    color: '#C2C8D1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  primaryInlineButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    minHeight: 48,
    borderRadius: 18,
    backgroundColor: colors.brandGold,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryInlineButtonText: {
    color: colors.brandBlack,
    fontSize: 14,
    fontWeight: '900',
  },
  cardGrid: {
    gap: spacing.md,
  },
  campaignCard: {
    borderRadius: 26,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    alignItems: 'center',
  },
  campaignCode: {
    color: colors.brandRed,
    fontSize: 20,
    fontWeight: '900',
  },
  campaignStatusPill: {
    borderRadius: 999,
    backgroundColor: '#E9F6EC',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  campaignStatusText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '900',
  },
  campaignValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  campaignMeta: {
    color: '#6A6F78',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  campaignDates: {
    color: colors.brandBlue,
    fontSize: 12,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  campaignDescription: {
    color: '#7C818A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  builderPanel: {
    flex: 1.25,
    borderRadius: 30,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
    gap: spacing.sm,
  },
  builderAside: {
    flex: 0.75,
    borderRadius: 30,
    padding: spacing.lg,
    backgroundColor: '#111319',
    borderWidth: 1,
    borderColor: '#202430',
  },
  builderAsideEyebrow: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  builderAsideTitle: {
    color: colors.surface,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  builderAsideValue: {
    color: colors.brandGold,
    fontSize: 18,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  builderAsideText: {
    color: '#B6BCC5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  builderPreviewCard: {
    marginTop: spacing.lg,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: '#292D38',
  },
  builderPreviewCardTitle: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
  },
  builderPreviewCardText: {
    color: '#BBC1CB',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  formColumn: {
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1DBCF',
    backgroundColor: '#F8F5EE',
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    fontWeight: '700',
  },
  descriptionInput: {
    minHeight: 110,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  segmentRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: '#F4EFE4',
    borderRadius: 18,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.brandGold,
  },
  segmentButtonText: {
    color: '#747A84',
    fontSize: 13,
    fontWeight: '800',
  },
  segmentButtonTextActive: {
    color: colors.brandBlack,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
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
    backgroundColor: '#F8F5EE',
    borderWidth: 1,
    borderColor: '#E1DBCF',
  },
  optionChipActive: {
    backgroundColor: '#F3E2AF',
    borderColor: '#DDBE61',
  },
  optionChipText: {
    color: '#747A84',
    fontSize: 12,
    fontWeight: '800',
  },
  optionChipTextActive: {
    color: colors.brandBlack,
  },
  builderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: colors.brandRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: '#F8F5EE',
    borderWidth: 1,
    borderColor: '#E1DBCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  formMessage: {
    color: colors.brandBlue,
    fontSize: 13,
    fontWeight: '700',
  },
  reportGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  reportCard: {
    borderRadius: 26,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  reportTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  reportText: {
    color: '#686D77',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  drawerLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,7,12,0.48)',
  },
  drawerPanel: {
    height: '100%',
    backgroundColor: '#0E1015',
    padding: spacing.md,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderRightWidth: 1,
    borderRightColor: '#212633',
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  drawerTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '900',
  },
  drawerSubtitle: {
    color: '#9EA5B0',
    fontSize: 12,
    marginTop: 4,
  },
  drawerClose: {
    borderRadius: 999,
    backgroundColor: '#181B24',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  drawerCloseText: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
  },
  sidebarEyebrow: {
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  sidebarItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: 18,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  sidebarItemActive: {
    backgroundColor: '#171A22',
    borderWidth: 1,
    borderColor: '#272B37',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#232733',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarIconActive: {
    backgroundColor: colors.brandGold,
  },
  sidebarIconText: {
    color: '#D7DCE4',
    fontSize: 11,
    fontWeight: '900',
  },
  sidebarIconTextActive: {
    color: colors.brandBlack,
  },
  sidebarCopy: {
    flex: 1,
    justifyContent: 'center',
  },
  sidebarLabel: {
    color: '#D7DCE4',
    fontSize: 13,
    fontWeight: '800',
  },
  sidebarLabelActive: {
    color: colors.surface,
  },
  sidebarMeta: {
    color: '#8D95A1',
    fontSize: 11,
    marginTop: 2,
  },
  sidebarMetaActive: {
    color: '#B0B7C0',
  },
});
