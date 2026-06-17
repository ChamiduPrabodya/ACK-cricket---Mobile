import { useMemo, useState } from 'react';
import {
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

const ui = {
  background: '#F5F6F8',
  card: '#FFFFFF',
  cardSoft: '#FBFBFC',
  border: '#E8E6E0',
  text: '#111827',
  muted: '#6B7280',
  softText: '#9AA1AC',
  shadow: 'rgba(12, 18, 28, 0.08)',
  tintGold: '#FFF5DA',
  tintRed: '#FDE8EA',
  tintBlue: '#EAF0FF',
  tintGreen: '#E8F7EF',
  dark: '#0E1116',
};

const bottomTabs = [
  { key: 'home', label: 'Home' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'payments', label: 'Payments' },
  { key: 'settings', label: 'Settings' },
];

const settingsTabs = [
  { key: 'users', label: 'Users' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'analytics', label: 'Reports' },
  { key: 'loyalty', label: 'Loyalty' },
  { key: 'promotions', label: 'Promotions' },
];

const bookingFilters = [
  { key: 'all', label: 'All (56)' },
  { key: 'pending', label: 'Pending (8)' },
  { key: 'today', label: 'Today (12)' },
  { key: 'completed', label: 'Completed (24)' },
];

const userFilters = [
  { key: 'all', label: 'All (128)' },
  { key: 'customers', label: 'Customers (112)' },
  { key: 'admins', label: 'Admins (16)' },
];

const notificationFilters = [
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'app', label: 'App Notifications' },
  { key: 'templates', label: 'Templates' },
];

const dashboardStats = [
  {
    label: "Today's Bookings",
    value: '24',
    accent: colors.brandBlue,
    tone: ui.tintBlue,
  },
  {
    label: 'Pending Requests',
    value: '8',
    accent: colors.brandGold,
    tone: ui.tintGold,
  },
  {
    label: "Today's Revenue",
    value: 'LKR 82,450',
    accent: colors.success,
    tone: ui.tintGreen,
  },
  {
    label: 'Active Promotions',
    value: '3',
    accent: '#8B5CF6',
    tone: '#F1E9FF',
  },
  {
    label: 'Loyalty Points Issued',
    value: '1,250',
    accent: colors.brandBlue,
    tone: ui.tintBlue,
  },
];

const progressCards = [
  {
    label: 'Bookings completed',
    value: '78%',
    detail: '18 / 23',
    progress: 78,
    accent: colors.success,
  },
  {
    label: 'Payments collected (manual)',
    value: '64%',
    detail: 'LKR 82,450 / LKR 128,000',
    progress: 64,
    accent: colors.brandBlue,
  },
];

const quickActions = [
  { id: 'add-booking', target: 'bookings', label: 'Add Booking' },
  { id: 'block-slot', target: 'bookings', label: 'Block Slot' },
  { id: 'add-promotion', target: 'promotions', label: 'Add Promotion' },
];

const upcomingBooking = {
  name: 'Rohit Warriors',
  slot: '10:00 AM - 12:00 PM',
  date: '24 May 2025',
  stadium: 'Indoor Turf 1',
  players: '12 Players',
  eta: 'In 45 mins',
};

const bookings = [
  {
    id: 'BK-2025-056',
    name: 'Rohit Warriors',
    date: '24 May 2025',
    time: '10:00 AM - 12:00 PM',
    stadium: 'Indoor Turf',
    players: '12 Players',
    payment: 'Pending',
    status: 'Pending',
    phone: '+91 98765 43210',
    notes: 'Need extra stumps and new balls. Arriving 15 mins early.',
  },
  {
    id: 'BK-2025-061',
    name: 'Strikers XI',
    date: '24 May 2025',
    time: '11:00 AM - 01:00 PM',
    stadium: 'Outdoor Ground',
    players: '18 Players',
    payment: 'Paid',
    status: 'Approved',
    phone: '+91 91234 56780',
    notes: 'Coach requested corner cone setup.',
  },
  {
    id: 'BK-2025-067',
    name: 'Thunder Bulls',
    date: '24 May 2025',
    time: '04:00 PM - 06:00 PM',
    stadium: 'Indoor Turf',
    players: '10 Players',
    payment: 'Paid',
    status: 'Completed',
    phone: '+91 99876 54321',
    notes: 'Completed with no issues.',
  },
  {
    id: 'BK-2025-070',
    name: 'Royal Challengers',
    date: '25 May 2025',
    time: '09:00 AM - 11:00 AM',
    stadium: 'Outdoor Ground',
    players: '20 Players',
    payment: 'Refunded',
    status: 'Rejected',
    phone: '+91 90012 34567',
    notes: 'Rejected due to weather hold.',
  },
  {
    id: 'BK-2025-074',
    name: 'Net Practice Group',
    date: '25 May 2025',
    time: '06:00 PM - 07:00 PM',
    stadium: 'Practice Nets',
    players: '6 Players',
    payment: 'Partial',
    status: 'Pending',
    phone: '+91 97654 32109',
    notes: 'Pending final headcount confirmation.',
  },
];

const users = [
  {
    name: 'Rohit Sharma',
    contact: '+91 98765 43210',
    role: 'Customer',
    type: 'customers',
    status: 'Active',
  },
  {
    name: 'rahul.kapoor@email.com',
    contact: '+91 91234 56789',
    role: 'Customer',
    type: 'customers',
    status: 'Active',
  },
  {
    name: 'Amit Verma',
    contact: '+91 99876 54321',
    role: 'Admin',
    type: 'admins',
    status: 'Active',
  },
  {
    name: 'Sneha Iyer',
    contact: '+91 97654 32109',
    role: 'Customer',
    type: 'customers',
    status: 'Blocked',
  },
  {
    name: 'Vikram Singh',
    contact: '+91 90012 34567',
    role: 'Customer',
    type: 'customers',
    status: 'Active',
  },
];

const payments = [
  {
    name: 'Rohit Warriors',
    date: '24 May',
    stadium: 'Indoor Turf',
    amount: 'LKR 1,600',
    method: 'Cash',
    status: 'Paid',
  },
  {
    name: 'Strikers XI',
    date: '24 May',
    stadium: 'Outdoor Ground',
    amount: 'LKR 3,500',
    method: 'Bank Transfer',
    status: 'Partial',
  },
  {
    name: 'Thunder Bulls',
    date: '24 May',
    stadium: 'Indoor Turf',
    amount: 'LKR 1,600',
    method: 'Cash',
    status: 'Paid',
  },
  {
    name: 'Royal Challengers',
    date: '25 May',
    stadium: 'Outdoor Ground',
    amount: 'LKR 3,500',
    method: 'Cash',
    status: 'Pending',
  },
  {
    name: 'Net Practice Group',
    date: '25 May',
    stadium: 'Nets',
    amount: 'LKR 600',
    method: 'Cash',
    status: 'Refunded',
  },
];

const whatsappTemplates = [
  {
    title: 'Booking confirmation',
    body: 'Hi {name}, your booking at {stadium} on {date} at {time} is confirmed. See you on the field.',
  },
  {
    title: 'Payment reminder',
    body: 'Hi {name}, payment of {amount} for your booking on {date} is pending. Please confirm manually at the desk.',
  },
  {
    title: 'Booking reminder',
    body: 'Reminder: your practice session starts at {time}. Please arrive 15 minutes early.',
  },
  {
    title: 'Promotion message',
    body: 'Weekend slots are filling fast. Use your latest ACK offer before it expires.',
  },
];

const appNotifications = [
  {
    title: 'Weekend Slots Open',
    message: 'Prime evening slots are now available for Sunday bookings.',
    target: 'All users',
    type: 'Booking',
  },
  {
    title: 'Manual Payment Reminder',
    message: 'Please complete your offline payment confirmation before arrival.',
    target: 'Customers',
    type: 'Payment',
  },
];

const reviews = [
  {
    name: 'Rohit Sharma',
    rating: 5,
    date: '24 May 2025',
    message: 'Excellent turf and lighting. Great experience.',
  },
  {
    name: 'Amit Verma',
    rating: 4,
    date: '22 May 2025',
    message: 'Good ground. More parking space needed.',
  },
  {
    name: 'Sneha Iyer',
    rating: 5,
    date: '20 May 2025',
    message: 'Very well maintained. Will book again.',
  },
];

const analyticsStats = [
  { label: 'Total bookings', value: '156', note: '+16% vs last week', accent: colors.brandBlue },
  { label: 'Revenue (manual)', value: 'LKR 1,28,000', note: '+22% vs last week', accent: colors.success },
  { label: 'Active users', value: '94', note: '+12% vs last week', accent: colors.brandGold },
  { label: 'New users', value: '23', note: '+8% vs last week', accent: colors.brandRed },
];

const loyaltyLeaders = [
  { name: 'Rohit Sharma', points: '320 pts', tier: 'Gold' },
  { name: 'Amit Verma', points: '280 pts', tier: 'Silver' },
  { name: 'Sneha Iyer', points: '210 pts', tier: 'Silver' },
  { name: 'Vikram Singh', points: '180 pts', tier: 'Bronze' },
  { name: 'Karan Mehta', points: '140 pts', tier: 'Bronze' },
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



  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}


  if (normalized.includes('approved') || normalized.includes('paid') || normalized.includes('active') || normalized.includes('available') || normalized.includes('gold')) {
    return { bg: ui.tintGreen, color: colors.success };
  }

  if (normalized.includes('pending') || normalized.includes('partial') || normalized.includes('watch') || normalized.includes('silver')) {
    return { bg: ui.tintGold, color: colors.brandGold };
  }

  if (normalized.includes('rejected') || normalized.includes('blocked') || normalized.includes('refunded') || normalized.includes('urgent') || normalized.includes('bronze')) {
    return { bg: ui.tintRed, color: colors.brandRed };
  }

  if (normalized.includes('completed') || normalized.includes('admin')) {
    return { bg: ui.tintBlue, color: colors.brandBlue };
  }

  return { bg: '#F3F4F6', color: ui.muted };
}

function AppHeader({ title, subtitle, onBack, rightLabel }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </Pressable>
        ) : null}
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      <View style={styles.headerRight}>
        <Pressable style={styles.iconButton}>
          <Text style={styles.iconButtonText}>O</Text>
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Text style={styles.iconButtonText}>=</Text>
        </Pressable>
        {rightLabel ? (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{rightLabel}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function StatusBadge({ label }) {
  const tone = badgeTone(label);



function SegmentTabs({ items, value, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.segmentTabs}
    >
      {items.map((item) => {
        const active = value === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.segmentTab, active && styles.segmentTabActive]}
          >
            <Text style={[styles.segmentTabText, active && styles.segmentTabTextActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function SearchBar({ placeholder }) {
  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchIcon}>O</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={ui.softText}
        style={styles.searchInput}
      />
      <Pressable style={styles.searchFilter}>
        <Text style={styles.searchFilterText}>=</Text>
      </Pressable>
    </View>
  );
}

function StatCard({ label, value, accent, tone }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: tone }]}>
        <View style={[styles.statIconDot, { backgroundColor: accent }]} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProgressCard({ label, value, detail, progress, accent }) {
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressTop}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>{value}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: accent },
          ]}
        />
      </View>
      <Text style={styles.progressDetail}>{detail}</Text>
    </View>
  );
}

function QuickActionButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.quickActionButton}>
      <Text style={styles.quickActionButtonText}>{label}</Text>
    </Pressable>
  );
}

function BookingCard({ booking, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.listCard}>
      <View style={styles.listCardTop}>
        <View style={styles.listIdentity}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initialsFromName(booking.name)}</Text>
          </View>
          <View style={styles.listCopy}>
            <Text style={styles.listTitle}>{booking.name}</Text>
            <Text style={styles.listMeta}>
              {booking.date} | {booking.time}
            </Text>
          </View>
        </View>
        <StatusBadge label={booking.status} />
      </View>

      <View style={styles.bookingMetaRow}>
        <Text style={styles.bookingMetaItem}>{booking.stadium}</Text>
        <Text style={styles.bookingMetaItem}>{booking.players}</Text>
      </View>

      <View style={styles.bookingBottomRow}>
        <StatusBadge label={booking.payment} />
        <Text style={styles.moreText}>View</Text>
      </View>
    </Pressable>
  );
}

function UserCard({ user }) {
  return (
    <View style={styles.listCard}>
      <View style={styles.listCardTop}>
        <View style={styles.listIdentity}>
          <View style={[styles.avatarCircle, styles.avatarCircleSoft]}>
            <Text style={[styles.avatarText, styles.avatarTextDark]}>
              {initialsFromName(user.name)}
            </Text>
          </View>
          <View style={styles.listCopy}>
            <Text style={styles.listTitle}>{user.name}</Text>
            <Text style={styles.listMeta}>{user.contact}</Text>
          </View>
        </View>
        <Text style={styles.moreText}>...</Text>
      </View>

      <View style={styles.rowBetween}>
        <StatusBadge label={user.role} />
        <StatusBadge label={user.status} />
      </View>
    </View>
  );
}

function PaymentCard({ item }) {
  return (
    <View style={styles.listCard}>
      <View style={styles.listCardTop}>
        <View style={styles.listIdentity}>
          <View style={[styles.avatarCircle, styles.avatarCircleSoft]}>
            <Text style={[styles.avatarText, styles.avatarTextDark]}>
              {initialsFromName(item.name)}
            </Text>
          </View>
          <View style={styles.listCopy}>
            <Text style={styles.listTitle}>{item.name}</Text>
            <Text style={styles.listMeta}>
              {item.date} | {item.stadium}
            </Text>
          </View>
        </View>
        <StatusBadge label={item.status} />
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
        <Text style={styles.listMeta}>{item.method}</Text>
      </View>
    </View>
  );
}

function ReviewCard({ item }) {
  return (
    <View style={styles.listCard}>
      <View style={styles.listCardTop}>
        <View>
          <Text style={styles.listTitle}>{item.name}</Text>
          <Text style={styles.listMeta}>{item.date}</Text>
        </View>
        <Text style={styles.ratingText}>{`${item.rating}.0 / 5`}</Text>
      </View>

      <Text style={styles.reviewText}>{item.message}</Text>

      <View style={styles.actionRow}>
        <Pressable style={styles.approveButton}>
          <Text style={styles.approveButtonText}>Approve</Text>
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PromotionCard({ item }) {
  return (
    <View style={styles.listCard}>
      <View style={styles.listCardTop}>
        <Text style={styles.promoCode}>{item.code}</Text>
        <StatusBadge label={item.isActive ? 'Active' : 'Inactive'} />
      </View>
      <Text style={styles.promoValue}>{formatDiscount(item)}</Text>
      <Text style={styles.listMeta}>
        {item.validFrom} - {item.validUntil}
      </Text>
      <Text style={styles.reviewText}>
        {item.description || `${item.campaignType} campaign for ${item.appliesTo}.`}
      </Text>

      <View style={styles.actionRow}>
        <Pressable style={styles.inlineButton}>
          <Text style={styles.inlineButtonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FloatingActionButton({ label = '+' }) {
  return (
    <Pressable style={styles.fab}>
      <Text style={styles.fabText}>{label}</Text>
    </Pressable>
  );
}

function BottomTabs({ value, onChange }) {
  return (
    <View style={styles.bottomTabs}>
      {bottomTabs.map((tab) => {
        const active = value === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={styles.bottomTab}
          >
            <View
              style={[
                styles.bottomTabDot,
                active && styles.bottomTabDotActive,
              ]}
            />
            <Text
              style={[
                styles.bottomTabText,
                active && styles.bottomTabTextActive,
              ]}
            >
              {tab.label}
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
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  const [activeTab, setActiveTab] = useState('home');
  const [settingsTab, setSettingsTab] = useState('users');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [notificationFilter, setNotificationFilter] = useState('whatsapp');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [promotionMode, setPromotionMode] = useState('list');
  const [form, setForm] = useState(defaultForm);
  const [formMessage, setFormMessage] = useState('');

  const bookingRows = useMemo(() => {
    if (bookingFilter === 'all') {
      return bookings;
    }

    if (bookingFilter === 'today') {
      return bookings.filter((item) => item.date === '24 May 2025');
    }

    return bookings.filter(
      (item) => item.status.toLowerCase() === bookingFilter.toLowerCase()
    );
  }, [bookingFilter]);

  const visibleUsers = useMemo(() => {
    if (userFilter === 'all') {
      return users;
    }

    return users.filter((item) => item.type === userFilter);
  }, [userFilter]);

  const dashboardStatWidth = isWide ? '31.5%' : '48%';

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
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
    setFormMessage('Promotion created successfully.');
    setPromotionMode('list');
  };

  const renderDashboard = () => (
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.contentBody}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingCard}>
        <Text style={styles.greetingTitle}>Good morning, Admin!</Text>
        <Text style={styles.greetingText}>Here is what is happening today.</Text>
      </View>

      <View style={styles.statGrid}>
        {dashboardStats.map((item) => (
          <View key={item.label} style={{ width: dashboardStatWidth }}>
            <StatCard {...item} />
          </View>
        ))}
      </View>

      <View style={styles.progressStack}>
        {progressCards.map((item) => (
          <ProgressCard key={item.label} {...item} />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionCardTitle}>Upcoming booking</Text>
        <View style={styles.upcomingCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.listTitle}>{upcomingBooking.slot}</Text>
            <StatusBadge label={upcomingBooking.eta} />
          </View>
          <Text style={styles.listMeta}>{upcomingBooking.stadium}</Text>
          <View style={styles.listIdentityCompact}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {initialsFromName(upcomingBooking.name)}
              </Text>
            </View>
            <View>
              <Text style={styles.listTitle}>{upcomingBooking.name}</Text>
              <Text style={styles.listMeta}>
                {upcomingBooking.players} | {upcomingBooking.date}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionCardTitle}>Quick actions</Text>
        <View style={styles.quickActionsRow}>
          {quickActions.map((item) => (
            <QuickActionButton
              key={item.id}
              label={item.label}
              onPress={() => {
                if (item.target === 'promotions') {
                  setActiveTab('settings');
                  setSettingsTab('promotions');
                } else {
                  setActiveTab(item.target);
                }
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderBookings = () => {
    if (selectedBooking) {
      return (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentBody}
          showsVerticalScrollIndicator={false}
        >
          <AppHeader
            title="Booking Details"
            subtitle={selectedBooking.id}
            onBack={() => setSelectedBooking(null)}
          />

          <View style={styles.sectionCard}>
            <View style={styles.rowBetween}>
              <StatusBadge label={selectedBooking.status} />
              <Text style={styles.listMeta}>Booking ID: {selectedBooking.id}</Text>
            </View>

            <View style={[styles.listIdentityCompact, styles.spacingTop]}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {initialsFromName(selectedBooking.name)}
                </Text>
              </View>
              <View>
                <Text style={styles.sectionCardTitle}>{selectedBooking.name}</Text>
                <Text style={styles.listMeta}>{selectedBooking.phone}</Text>
              </View>
            </View>

            <View style={styles.detailsStack}>
              <Text style={styles.detailLine}>{selectedBooking.date}</Text>
              <Text style={styles.detailLine}>{selectedBooking.time}</Text>
              <Text style={styles.detailLine}>{selectedBooking.stadium}</Text>
              <Text style={styles.detailLine}>{selectedBooking.players}</Text>
              <Text style={styles.detailLine}>Payment: {selectedBooking.payment}</Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionCardTitle}>Notes</Text>
            <Text style={styles.reviewText}>{selectedBooking.notes}</Text>
          </View>

          <View style={styles.actionStack}>
            <Pressable style={styles.primaryAction}>
              <Text style={styles.primaryActionText}>Approve Booking</Text>
            </Pressable>
            <Pressable style={styles.secondaryActionRed}>
              <Text style={styles.secondaryActionRedText}>Reject Booking</Text>
            </Pressable>
            <Pressable style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Block This Slot</Text>
            </Pressable>
            <Pressable style={styles.secondaryActionBlue}>
              <Text style={styles.secondaryActionBlueText}>Mark as Confirmed</Text>
            </Pressable>
            <Pressable style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Mark Payment as Paid</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentBody}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader title="Bookings" subtitle="Track and manage booking requests" />
        <SegmentTabs
          items={bookingFilters}
          value={bookingFilter}
          onChange={setBookingFilter}
        />

        <View style={styles.listStack}>
          {bookingRows.map((item) => (
            <BookingCard
              key={item.id}
              booking={item}
              onPress={() => setSelectedBooking(item)}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderPayments = () => (
    <View style={styles.flexFill}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentBody}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader title="Payments" subtitle="Manual and offline collection tracking" />

        <View style={styles.collectionCard}>
          <Text style={styles.listMeta}>Today's collections</Text>
          <Text style={styles.collectionValue}>LKR 82,450</Text>
          <Text style={styles.progressDetail}>From 18 manual bookings today</Text>
          <View style={styles.barChartRow}>
            {[22, 40, 58, 36, 74, 52].map((height, index) => (
              <View
                key={index}
                style={[
                  styles.barChartBar,
                  {
                    height,
                    backgroundColor:
                      index % 2 === 0 ? colors.success : colors.brandBlue,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <SegmentTabs
          items={[
            { key: 'all', label: 'All (82)' },
            { key: 'paid', label: 'Paid (48)' },
            { key: 'pending', label: 'Pending (19)' },
            { key: 'partial', label: 'Partial (9)' },
          ]}
          value="all"
          onChange={() => {}}
        />

        <View style={styles.listStack}>
          {payments.map((item) => (
            <PaymentCard key={`${item.name}-${item.date}`} item={item} />
          ))}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            All payments are offline. Manual confirmation required.
          </Text>
        </View>
      </ScrollView>
      <FloatingActionButton />
    </View>
  );

  const renderUsersPanel = () => (
    <View style={styles.settingsBody}>
      <SegmentTabs items={userFilters} value={userFilter} onChange={setUserFilter} />
      <SearchBar placeholder="Search users" />
      <View style={styles.listStack}>
        {visibleUsers.map((item) => (
          <UserCard key={`${item.name}-${item.contact}`} user={item} />
        ))}
      </View>
      <FloatingActionButton />
    </View>
  );

  const renderNotificationsPanel = () => (
    <View style={styles.settingsBody}>
      <SegmentTabs
        items={notificationFilters}
        value={notificationFilter}
        onChange={setNotificationFilter}
      />

      {notificationFilter === 'app' ? (
        <View style={styles.listStack}>
          {appNotifications.map((item) => (
            <View key={item.title} style={styles.listCard}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.reviewText}>{item.message}</Text>
              <View style={styles.rowBetween}>
                <StatusBadge label={item.target} />
                <StatusBadge label={item.type} />
              </View>
            </View>
          ))}

          <View style={styles.formCard}>
            <Text style={styles.sectionCardTitle}>Create notification</Text>
            <TextInput placeholder="Title" placeholderTextColor={ui.softText} style={styles.formInput} />
            <TextInput placeholder="Message" placeholderTextColor={ui.softText} style={[styles.formInput, styles.formTextarea]} multiline />
            <TextInput placeholder="Target users" placeholderTextColor={ui.softText} style={styles.formInput} />
            <TextInput placeholder="Notification type" placeholderTextColor={ui.softText} style={styles.formInput} />
            <Pressable style={styles.primaryAction}>
              <Text style={styles.primaryActionText}>Create Notification</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.listStack}>
          {whatsappTemplates.map((item) => (
            <View key={item.title} style={styles.listCard}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.reviewText}>{item.body}</Text>
              <Pressable style={styles.approveButton}>
                <Text style={styles.approveButtonText}>Send</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderReviewsPanel = () => (
    <View style={styles.settingsBody}>
      <View style={styles.ratingSummaryCard}>
        <Text style={styles.ratingAverage}>4.6</Text>
        <Text style={styles.progressDetail}>Based on 128 reviews</Text>
        <View style={styles.breakdownStack}>
          {[
            { stars: '5', percent: 78 },
            { stars: '4', percent: 16 },
            { stars: '3', percent: 4 },
            { stars: '2', percent: 1 },
            { stars: '1', percent: 1 },
          ].map((item) => (
            <View key={item.stars} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{item.stars}</Text>
              <View style={styles.breakdownTrack}>
                <View
                  style={[
                    styles.breakdownFill,
                    { width: `${item.percent}%` },
                  ]}
                />
              </View>
              <Text style={styles.breakdownValue}>{item.percent}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.listStack}>
        {reviews.map((item) => (
          <ReviewCard key={`${item.name}-${item.date}`} item={item} />
        ))}
      </View>
    </View>
  );

  const renderAnalyticsPanel = () => (
    <View style={styles.settingsBody}>
      <View style={styles.statGrid}>
        {analyticsStats.map((item) => (
          <View key={item.label} style={{ width: '48%' }}>
            <View style={styles.miniStatCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={[styles.statValue, styles.statValueSmall]}>{item.value}</Text>
              <Text style={[styles.progressDetail, { color: item.accent }]}>
                {item.note}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.listCard}>
        <Text style={styles.sectionCardTitle}>Bookings trend</Text>
        <View style={styles.lineChart}>
          {[28, 30, 46, 50, 41, 38, 56, 62, 53, 48, 66].map((point, index) => (
            <View
              key={index}
              style={[
                styles.linePoint,
                { bottom: point, left: index * 24, backgroundColor: colors.brandBlue },
              ]}
            />
          ))}
        </View>
        <View style={styles.analyticsFooter}>
          <StatusBadge label="Peak hour 06 PM - 09 PM" />
          <StatusBadge label="Most booked Indoor Turf" />
          <StatusBadge label="Cancellation rate 6.4%" />
        </View>
      </View>
    </View>
  );

  const renderLoyaltyPanel = () => (
    <View style={styles.settingsBody}>
      <View style={styles.collectionCard}>
        <Text style={styles.listMeta}>Total points issued</Text>
        <Text style={styles.collectionValue}>1,250</Text>
        <Text style={styles.progressDetail}>Reward activity is rising with repeat bookings</Text>
      </View>

      <View style={styles.listStack}>
        {loyaltyLeaders.map((item) => (
          <View key={item.name} style={styles.listCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.paymentAmount}>{item.points}</Text>
            </View>
            <StatusBadge label={item.tier} />
          </View>
        ))}
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Bonus offer</Text>
        <Text style={styles.noteText}>
          Earn 100 points on every 5 completed bookings. Manual reward confirmation required.
        </Text>
      </View>
      <FloatingActionButton />
    </View>
  );

  const renderPromotionBuilder = () => (
    <View style={styles.formCard}>
      <Text style={styles.sectionCardTitle}>Create promotion</Text>
      <TextInput
        value={form.title}
        onChangeText={(value) => updateForm('title', value)}
        placeholder="Offer title"
        placeholderTextColor={ui.softText}
        style={styles.formInput}
      />
      <TextInput
        value={form.code}
        onChangeText={(value) => updateForm('code', value.toUpperCase())}
        placeholder="Promo code"
        placeholderTextColor={ui.softText}
        style={styles.formInput}
      />
      <View style={styles.formRow}>
        <TextInput
          value={form.validFrom}
          onChangeText={(value) => updateForm('validFrom', value)}
          placeholder="Valid from"
          placeholderTextColor={ui.softText}
          style={[styles.formInput, styles.formInputHalf]}
        />
        <TextInput
          value={form.validUntil}
          onChangeText={(value) => updateForm('validUntil', value)}
          placeholder="Valid until"
          placeholderTextColor={ui.softText}
          style={[styles.formInput, styles.formInputHalf]}
        />
      </View>
      <View style={styles.segmentWrap}>
        {['percentage', 'fixed'].map((item) => {
          const active = form.discountType === item;
          return (
            <Pressable
              key={item}
              onPress={() => updateForm('discountType', item)}
              style={[styles.optionPill, active && styles.optionPillActive]}
            >
              <Text style={[styles.optionPillText, active && styles.optionPillTextActive]}>
                {item === 'percentage' ? 'Percentage' : 'Fixed'}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <TextInput
        value={form.discountValue}
        onChangeText={(value) => updateForm('discountValue', value)}
        placeholder="Discount value"
        placeholderTextColor={ui.softText}
        style={styles.formInput}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentWrap}>
        {applyOptions.map((item) => {
          const active = form.appliesTo === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => updateForm('appliesTo', item.value)}
              style={[styles.optionPill, active && styles.optionPillActive]}
            >
              <Text style={[styles.optionPillText, active && styles.optionPillTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentWrap}>
        {campaignOptions.map((item) => {
          const active = form.campaignType === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => updateForm('campaignType', item.value)}
              style={[styles.optionPill, active && styles.optionPillActive]}
            >
              <Text style={[styles.optionPillText, active && styles.optionPillTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <TextInput
        value={form.description}
        onChangeText={(value) => updateForm('description', value)}
        placeholder="Description"
        placeholderTextColor={ui.softText}
        style={[styles.formInput, styles.formTextarea]}
        multiline
      />

      {formMessage ? <Text style={styles.formMessage}>{formMessage}</Text> : null}

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => setPromotionMode('list')}
          style={styles.secondaryAction}
        >
          <Text style={styles.secondaryActionText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleCreateOffer} style={styles.primaryAction}>
          <Text style={styles.primaryActionText}>Publish</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderPromotionsPanel = () => (
    <View style={styles.settingsBody}>
      {promotionMode === 'create' ? (
        renderPromotionBuilder()
      ) : (
        <>
          <View style={styles.collectionCard}>
            <Text style={styles.listMeta}>Promotions and offers</Text>
            <Text style={styles.collectionValue}>{promotions.length}</Text>
            <Text style={styles.progressDetail}>Active campaigns currently available in the user dashboard</Text>
          </View>
          <View style={styles.listStack}>
            {promotions.map((item) => (
              <PromotionCard key={item.id} item={item} />
            ))}
          </View>
          <FloatingActionButton label="+" />
        </>
      )}
    </View>
  );

  const renderSettings = () => (
    <View style={styles.flexFill}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentBody}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader title={settingsTabs.find((item) => item.key === settingsTab)?.label || 'Settings'} subtitle="Admin tools and support workspaces" />
        <SegmentTabs items={settingsTabs} value={settingsTab} onChange={setSettingsTab} />

        {settingsTab === 'users' && renderUsersPanel()}
        {settingsTab === 'notifications' && renderNotificationsPanel()}
        {settingsTab === 'reviews' && renderReviewsPanel()}
        {settingsTab === 'analytics' && renderAnalyticsPanel()}
        {settingsTab === 'loyalty' && renderLoyaltyPanel()}
        {settingsTab === 'promotions' && renderPromotionsPanel()}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.root}>
      {activeTab === 'home' && renderDashboard()}
      {activeTab === 'bookings' && renderBookings()}
      {activeTab === 'payments' && renderPayments()}
      {activeTab === 'settings' && renderSettings()}

      <BottomTabs
        value={selectedBooking ? 'bookings' : activeTab}
        onChange={(nextTab) => {
          setSelectedBooking(null);
          setActiveTab(nextTab);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ui.background,
  },
  flexFill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentBody: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  headerCopy: {
    flex: 1,
  },
  headerTitle: {
    color: ui.text,
    fontSize: 22,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: ui.muted,
    fontSize: 13,
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    color: ui.text,
    fontSize: 12,
    fontWeight: '900',
  },
  headerBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    backgroundColor: ui.tintGold,
  },
  headerBadgeText: {
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '900',
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: ui.text,
    fontSize: 13,
    fontWeight: '900',
  },
  greetingCard: {
    borderRadius: 22,
    backgroundColor: colors.success,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  greetingTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '900',
  },
  greetingText: {
    color: '#E9FFF0',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    minHeight: 118,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statValue: {
    color: ui.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  statValueSmall: {
    fontSize: 20,
  },
  statLabel: {
    color: ui.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: spacing.xs,
  },
  progressStack: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  progressCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    alignItems: 'center',
  },
  progressLabel: {
    color: ui.text,
    fontSize: 13,
    fontWeight: '800',
  },
  progressValue: {
    color: ui.text,
    fontSize: 12,
    fontWeight: '900',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#EEF0F3',
    overflow: 'hidden',
    marginTop: spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressDetail: {
    color: ui.muted,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  sectionCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionCardTitle: {
    color: ui.text,
    fontSize: 16,
    fontWeight: '900',
  },
  upcomingCard: {
    marginTop: spacing.md,
    borderRadius: 16,
    backgroundColor: ui.cardSoft,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  listIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  listIdentityCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.brandBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircleSoft: {
    backgroundColor: ui.tintBlue,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '900',
  },
  avatarTextDark: {
    color: colors.brandBlue,
  },
  listCopy: {
    flex: 1,
  },
  listTitle: {
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
  },
  listMeta: {
    color: ui.muted,
    fontSize: 12,
    marginTop: 3,
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  quickActionButton: {
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: ui.tintGold,
  },
  quickActionButtonText: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
  },
  segmentTabs: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  segmentTab: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  segmentTabActive: {
    borderBottomColor: colors.success,
  },
  segmentTabText: {
    color: ui.softText,
    fontSize: 12,
    fontWeight: '700',
  },
  segmentTabTextActive: {
    color: colors.success,
    fontWeight: '900',
  },
  listStack: {
    gap: spacing.sm,
  },
  listCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  listCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '900',
  },
  bookingMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  bookingMetaItem: {
    color: ui.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  bookingBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  moreText: {
    color: ui.softText,
    fontSize: 12,
    fontWeight: '900',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 16,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    marginBottom: spacing.sm,
  },
  searchIcon: {
    color: ui.softText,
    fontSize: 12,
    fontWeight: '900',
  },
  searchInput: {
    flex: 1,
    color: ui.text,
    fontSize: 14,
  },
  searchFilter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ui.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFilterText: {
    color: ui.text,
    fontSize: 12,
    fontWeight: '900',
  },
  inlineButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: ui.border,
  },
  inlineButtonText: {
    color: ui.text,
    fontSize: 12,
    fontWeight: '800',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 98,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ui.shadow,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  fabText: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '900',
    marginTop: -2,
  },
  collectionCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  collectionValue: {
    color: ui.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
    height: 82,
    marginTop: spacing.md,
  },
  barChartBar: {
    width: 10,
    borderRadius: 999,
  },
  noteCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  noteTitle: {
    color: ui.text,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  noteText: {
    color: ui.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  settingsBody: {
    paddingBottom: spacing.lg,
  },
  ratingSummaryCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  ratingAverage: {
    color: ui.text,
    fontSize: 42,
    fontWeight: '900',
  },
  breakdownStack: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  breakdownLabel: {
    width: 12,
    color: ui.text,
    fontSize: 12,
    fontWeight: '800',
  },
  breakdownTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#EEF0F3',
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.success,
  },
  breakdownValue: {
    width: 34,
    textAlign: 'right',
    color: ui.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  ratingText: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '900',
  },
  reviewText: {
    color: ui.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  approveButton: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: ui.tintGreen,
  },
  approveButtonText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '900',
  },
  deleteButton: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: ui.tintRed,
  },
  deleteButtonText: {
    color: colors.brandRed,
    fontSize: 12,
    fontWeight: '900',
  },
  miniStatCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    minHeight: 120,
  },
  lineChart: {
    height: 132,
    marginTop: spacing.md,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: ui.border,
  },
  linePoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  analyticsFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  promoCode: {
    color: colors.brandRed,
    fontSize: 18,
    fontWeight: '900',
  },
  promoValue: {
    color: ui.text,
    fontSize: 22,
    fontWeight: '900',
  },
  formCard: {
    borderRadius: 18,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: ui.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  formInput: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#FAFAFB',
    borderWidth: 1,
    borderColor: ui.border,
    color: ui.text,
    paddingHorizontal: spacing.md,
    fontSize: 14,
  },
  formTextarea: {
    minHeight: 96,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  formInputHalf: {
    flex: 1,
  },
  segmentWrap: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: ui.border,
  },
  optionPillActive: {
    backgroundColor: ui.tintGold,
    borderColor: '#F1D58A',
  },
  optionPillText: {
    color: ui.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  optionPillTextActive: {
    color: colors.brandGold,
  },
  formMessage: {
    color: colors.brandBlue,
    fontSize: 12,
    fontWeight: '800',
  },
  detailsStack: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  detailLine: {
    color: ui.text,
    fontSize: 14,
    fontWeight: '700',
  },
  spacingTop: {
    marginTop: spacing.md,
  },
  actionStack: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryAction: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  primaryActionText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '900',
  },

  },
  secondaryActionText: {
    color: ui.text,
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryActionRed: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: '#F1C2C8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  secondaryActionRedText: {
    color: colors.brandRed,
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryActionBlue: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: ui.card,
    borderWidth: 1,
    borderColor: '#CFE0FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  secondaryActionBlueText: {
    color: colors.brandBlue,
    fontSize: 13,
    fontWeight: '900',
  },
  paymentAmount: {
    color: ui.text,
    fontSize: 13,
    fontWeight: '900',
  },
  bottomTabs: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ui.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: ui.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  bottomTabDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#D1D5DB',
  },
  bottomTabDotActive: {
    backgroundColor: colors.success,
  },
  bottomTabText: {
    color: ui.softText,
    fontSize: 11,
    fontWeight: '700',
  },
  bottomTabTextActive: {
    color: colors.success,
    fontWeight: '900',
  },
});
