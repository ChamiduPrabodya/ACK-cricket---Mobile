import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  calculatePromotionQuote,
  canApplyPromotion,
  formatDiscount,
  getSlotType,
  isPromotionActive,
} from '../services/promotionRules';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');
const gearUpImage = require('../assets/promo-gear-up.png');
const holidayPromoImage = require('../assets/promo-holiday-season.png');

const promoCards = [
  {
    title: 'Gear Up and Play',
    subtitle: 'Secure your next indoor slot in just a few taps.',
    cta: 'Book now',
    image: gearUpImage,
    accent: colors.brandGold,
  },
  {
    title: 'Holiday Season Promo',
    subtitle: 'Save on selected weekend bookings this month.',
    cta: 'Use offer',
    image: holidayPromoImage,
    accent: colors.brandRed,
  },
];

const quickActions = [
  { title: 'Book turf', caption: 'Reserve a court fast', tag: 'Fast' },
  { title: 'My bookings', caption: 'Track upcoming slots', tag: 'Live' },
  { title: 'Teams', caption: 'View lineups and squads', tag: 'Club' },
  { title: 'Rewards', caption: 'Use points and promos', tag: 'Bonus' },
];

const bookings = [
  {
    id: 'BK-1024',
    title: 'Practice Session',
    slot: 'Today | 6:30 PM',
    court: 'Indoor Net A',
    status: 'Confirmed',
  },
  {
    id: 'BK-1038',
    title: 'Weekend Match Prep',
    slot: 'Saturday | 8:00 AM',
    court: 'Main Arena',
    status: 'Pending',
  },
];

const teamRows = [
  { name: 'Diamond Team', meta: 'Captain | 11 players' },
  { name: 'ACK Warriors', meta: 'Member | 14 players' },
];

function PromoCard({ item, compact }) {
  return (
    <ImageBackground
      source={item.image}
      style={[styles.promoCard, compact && styles.promoCardCompact]}
      imageStyle={styles.promoImage}
    >
      <View style={styles.promoShade} />
      <View style={styles.promoAccentWrap}>
        <View style={[styles.promoAccent, { backgroundColor: item.accent }]} />
      </View>
      <View style={styles.promoContent}>
        <Text style={[styles.promoTitle, compact && styles.promoTitleCompact]}>
          {item.title}
        </Text>
        <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
        <View style={styles.promoButton}>
          <Text style={styles.promoButtonText}>{item.cta}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

function SectionHeader({ title, action }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
}

export default function HomeScreen({ promotions = [], onOpenAdmin }) {
  const { width } = useWindowDimensions();
  const compact = width < 390;
  const horizontalPadding = compact ? spacing.md : spacing.lg;
  const cardGap = spacing.md;
  const quickCardWidth = (width - horizontalPadding * 2 - cardGap) / 2;
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [appliedQuote, setAppliedQuote] = useState(null);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    pulseLoop.start();

    return () => {
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [floatAnim, pulseAnim]);

  const bookingPreview = {
    basePrice: 4500,
    bookingDate: '2026-06-13',
    slotTime: '18:00',
    slotType: getSlotType('18:00'),
    isFirstTimeUser: true,
  };

  const activePromotions = useMemo(
    () =>
      promotions.filter((promotion) =>
        isPromotionActive(promotion, bookingPreview.bookingDate)
      ),
    [promotions]
  );

  const floatingStyle = {
    transform: [
      {
        translateY: floatAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -14],
        }),
      },
    ],
  };

  const glowStyle = {
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.12],
        }),
      },
    ],
    opacity: pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.25, 0.45],
    }),
  };

  const handleApplyPromo = (code = promoCode) => {
    const normalizedCode = code.trim().toUpperCase();
    const promotion = promotions.find((item) => item.code === normalizedCode);

    if (!promotion) {
      setAppliedQuote(null);
      setPromoMessage('Promo code was not found.');
      return;
    }

    const result = canApplyPromotion(promotion, bookingPreview);

    if (!result.allowed) {
      setAppliedQuote(null);
      setPromoMessage(result.message);
      return;
    }

    const quote = calculatePromotionQuote(promotion, bookingPreview.basePrice);
    setPromoCode(normalizedCode);
    setAppliedQuote({ ...quote, promotion });
    setPromoMessage(result.message);
  };

  return (
    <View style={styles.screen}>
      <View pointerEvents="none" style={styles.backgroundLayer}>
        <View style={styles.backgroundTopGlow} />
        <View style={styles.backgroundBottomGlow} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding, paddingBottom: spacing.xxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View style={styles.topBarCopy}>
              <Text style={styles.brandName}>ACK TURF</Text>
              <Text style={styles.greeting}>Hello, good morning</Text>
            </View>
          </View>

          <View style={styles.topBarRight}>
            <View style={styles.iconBubble}>
              <View style={styles.iconDot} />
            </View>
            <View style={styles.profileBubble}>
              <Text style={styles.profileText}>KP</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Animated.View style={[styles.heroGlow, glowStyle]} />
          <View style={[styles.heroBody, compact && styles.heroBodyCompact]}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>Indoor cricket booking</Text>
              <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>
                Play prime-time cricket like a pro.
              </Text>
              <Text style={styles.heroSubtitle}>
                Fast bookings, smart offers, and team coordination built into
                one premium mobile dashboard.
              </Text>

              <View style={[styles.heroActions, compact && styles.heroActionsCompact]}>
                <Pressable style={styles.primaryHeroButton}>
                  <Text style={styles.primaryHeroButtonText}>Book now</Text>
                </Pressable>
                <Pressable
                  onPress={onOpenAdmin}
                  style={styles.secondaryHeroButton}
                >
                  <Text style={styles.secondaryHeroButtonText}>Open admin</Text>
                </Pressable>
              </View>

              <View style={[styles.heroStats, compact && styles.heroStatsCompact]}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Slots left tonight</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>02</Text>
                  <Text style={styles.heroStatLabel}>Live offers</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>240</Text>
                  <Text style={styles.heroStatLabel}>Loyalty points</Text>
                </View>
              </View>
            </View>

            <View style={[styles.heroVisual, compact && styles.heroVisualCompact]}>
              <Animated.View style={[styles.visualAura, glowStyle]} />
              <View style={styles.visualRing} />
              <Animated.View style={[styles.visualBadge, styles.visualBadgeTop, floatingStyle]}>
                <Text style={styles.visualBadgeTitle}>Peak window</Text>
                <Text style={styles.visualBadgeValue}>6 PM - 9 PM</Text>
              </Animated.View>
              <Animated.View
                style={[
                  styles.visualBadge,
                  styles.visualBadgeBottom,
                  {
                    transform: [
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-6, 8],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.visualBadgeTitle}>Offer ready</Text>
                <Text style={styles.visualBadgeValue}>Save LKR 800</Text>
              </Animated.View>
              <View style={styles.ballWrap}>
                <View style={styles.ballShadow} />
                <View style={styles.ball}>
                  <View style={styles.ballStitchLeft} />
                  <View style={styles.ballStitchRight} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <SectionHeader title="Featured banners" action="Live now" />
        <View style={styles.promoStack}>
          {promoCards.map((card) => (
            <PromoCard key={card.title} item={card} compact={compact} />
          ))}
        </View>

        <SectionHeader title="Quick access" action="All tools" />
        <View style={styles.quickGrid}>
          {quickActions.map((item) => (
            <View key={item.title} style={[styles.quickCard, { width: quickCardWidth }]}>
              <Text style={styles.quickTag}>{item.tag}</Text>
              <Text style={styles.quickTitle}>{item.title}</Text>
              <Text style={styles.quickCaption}>{item.caption}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Booking control" action="Auto pricing" />
        <View style={styles.bookingPanel}>
          <View style={[styles.bookingTopRow, compact && styles.bookingTopRowCompact]}>
            <View style={styles.bookingCopy}>
              <Text style={styles.bookingEyebrow}>Next session</Text>
              <Text style={styles.bookingTitle}>Saturday | 6:00 PM | Main Arena</Text>
              <Text style={styles.bookingMeta}>
                Peak slot pricing with manual payment confirmation.
              </Text>
            </View>
            <View style={styles.bookingStatusPill}>
              <Text style={styles.bookingStatusText}>Peak</Text>
            </View>
          </View>

          <View style={styles.priceBoard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Base price</Text>
              <Text style={styles.priceValue}>LKR {bookingPreview.basePrice}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Discount</Text>
              <Text style={styles.priceDiscount}>
                LKR {appliedQuote ? appliedQuote.discountAmount : 0}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Pay before confirmation</Text>
              <Text style={styles.totalValue}>
                LKR {appliedQuote ? appliedQuote.finalPrice : bookingPreview.basePrice}
              </Text>
            </View>
          </View>

          <View style={[styles.promoEntry, compact && styles.promoEntryCompact]}>
            <TextInput
              value={promoCode}
              onChangeText={(value) => setPromoCode(value.toUpperCase())}
              placeholder="Enter promo code"
              placeholderTextColor="#82858E"
              autoCapitalize="characters"
              style={styles.promoInput}
            />
            <Pressable onPress={() => handleApplyPromo()} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
          </View>
          {promoMessage ? <Text style={styles.promoMessage}>{promoMessage}</Text> : null}
        </View>

        <SectionHeader title="Live offers" action="Tap to apply" />
        <View style={styles.offerList}>
          {activePromotions.slice(0, 3).map((promotion) => (
            <Pressable
              key={promotion.id}
              onPress={() => handleApplyPromo(promotion.code)}
              style={styles.offerCard}
            >
              <View style={styles.offerCode}>
                <Text style={styles.offerCodeText}>{promotion.code}</Text>
              </View>
              <View style={styles.offerCopy}>
                <Text style={styles.offerMeta}>
                  {formatDiscount(promotion)} | {promotion.appliesTo}
                </Text>
                <Text style={styles.offerDescription}>{promotion.description}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Upcoming sessions" action="View all" />
        <View style={styles.darkPanel}>
          {bookings.map((booking, index) => (
            <View
              key={booking.id}
              style={[
                styles.listRow,
                index !== bookings.length - 1 && styles.listRowBorder,
              ]}
            >
              <View style={styles.listCopy}>
                <Text style={styles.listTitle}>{booking.title}</Text>
                <Text style={styles.listMeta}>
                  {booking.slot} | {booking.court}
                </Text>
              </View>
              <View style={styles.listPill}>
                <Text style={styles.listPillText}>{booking.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader title="My teams" action="Manage" />
        <View style={styles.lightPanel}>
          {teamRows.map((team, index) => (
            <View
              key={team.name}
              style={[
                styles.listRow,
                index !== teamRows.length - 1 && styles.lightRowBorder,
              ]}
            >
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>
                  {team.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
              <View style={styles.listCopy}>
                <Text style={styles.lightListTitle}>{team.name}</Text>
                <Text style={styles.lightListMeta}>{team.meta}</Text>
              </View>
              <Text style={styles.listChevron}>></Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#070708',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundTopGlow: {
    position: 'absolute',
    top: -80,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(158,18,40,0.22)',
  },
  backgroundBottomGlow: {
    position: 'absolute',
    bottom: 60,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(200,150,26,0.12)',
  },
  content: {
    paddingTop: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  topBarCopy: {
    flex: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  brandName: {
    color: colors.surface,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  greeting: {
    color: '#A5AAB4',
    fontSize: 13,
    marginTop: 3,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#15161A',
    borderWidth: 1,
    borderColor: '#26272D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brandGold,
  },
  profileBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#23242A',
    borderWidth: 1,
    borderColor: '#2F313A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '900',
  },
  heroCard: {
    backgroundColor: '#0E0F12',
    borderRadius: 32,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#1E2027',
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: 30,
    right: 18,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(200,150,26,0.16)',
  },
  heroBody: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroBodyCompact: {
    flexDirection: 'column',
  },
  heroCopy: {
    flex: 1.2,
  },
  heroEyebrow: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  heroTitleCompact: {
    fontSize: 29,
    lineHeight: 33,
    maxWidth: '100%',
  },
  heroSubtitle: {
    color: '#BFC3CC',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
    maxWidth: 330,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  heroActionsCompact: {
    flexDirection: 'column',
  },
  primaryHeroButton: {
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryHeroButtonText: {
    color: colors.brandBlack,
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryHeroButton: {
    minHeight: 50,
    borderRadius: 18,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: '#272930',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryHeroButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
  },
  heroStats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  heroStatsCompact: {
    flexDirection: 'column',
  },
  heroStat: {
    flex: 1,
    backgroundColor: '#15161A',
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#24262D',
  },
  heroStatValue: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
  },
  heroStatLabel: {
    color: '#9AA0AA',
    fontSize: 12,
    marginTop: 4,
  },
  heroVisual: {
    flex: 0.9,
    minHeight: 240,
    borderRadius: 28,
    backgroundColor: '#111217',
    borderWidth: 1,
    borderColor: '#1F2128',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroVisualCompact: {
    minHeight: 200,
  },
  visualAura: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(31,47,134,0.22)',
  },
  visualRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  visualBadge: {
    position: 'absolute',
    backgroundColor: 'rgba(9,10,13,0.88)',
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#262932',
  },
  visualBadgeTop: {
    top: 18,
    left: 18,
  },
  visualBadgeBottom: {
    right: 18,
    bottom: 18,
  },
  visualBadgeTitle: {
    color: '#8E94A0',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  visualBadgeValue: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
  },
  ballWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballShadow: {
    position: 'absolute',
    bottom: -28,
    width: 110,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  ball: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.brandRed,
    borderWidth: 4,
    borderColor: '#C94659',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballStitchLeft: {
    position: 'absolute',
    width: 4,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.surface,
    transform: [{ rotate: '18deg' }, { translateX: -10 }],
  },
  ballStitchRight: {
    position: 'absolute',
    width: 4,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.surface,
    transform: [{ rotate: '-18deg' }, { translateX: 10 }],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '900',
  },
  sectionAction: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '800',
  },
  promoStack: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  promoCard: {
    minHeight: 142,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E2028',
  },
  promoCardCompact: {
    minHeight: 132,
  },
  promoImage: {
    borderRadius: 24,
  },
  promoShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.48)',
  },
  promoAccentWrap: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  promoAccent: {
    width: 42,
    height: 6,
    borderRadius: 999,
  },
  promoContent: {
    padding: spacing.md,
    maxWidth: '68%',
  },
  promoTitle: {
    color: colors.surface,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '900',
  },
  promoTitleCompact: {
    fontSize: 19,
    lineHeight: 22,
  },
  promoSubtitle: {
    color: '#D0D4DB',
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  promoButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  promoButtonText: {
    color: colors.brandBlack,
    fontSize: 12,
    fontWeight: '900',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickCard: {
    minHeight: 122,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: '#111217',
    borderWidth: 1,
    borderColor: '#1E2028',
    justifyContent: 'space-between',
  },
  quickTag: {
    alignSelf: 'flex-start',
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  quickTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '900',
  },
  quickCaption: {
    color: '#9EA4AE',
    fontSize: 13,
    lineHeight: 18,
  },
  bookingPanel: {
    backgroundColor: '#F7F0DE',
    borderRadius: 30,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#DEC78C',
    marginBottom: spacing.xl,
  },
  bookingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  bookingTopRowCompact: {
    flexDirection: 'column',
  },
  bookingCopy: {
    flex: 1,
  },
  bookingEyebrow: {
    color: colors.brandRed,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  bookingTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  bookingMeta: {
    color: '#675E49',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  bookingStatusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.brandBlack,
  },
  bookingStatusText: {
    color: colors.brandGold,
    fontSize: 12,
    fontWeight: '900',
  },
  priceBoard: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.48)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E4D8B3',
  },
  priceLabel: {
    color: '#665E4A',
    fontSize: 14,
    fontWeight: '700',
  },
  priceValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  priceDiscount: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '900',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    flex: 1,
  },
  totalValue: {
    color: colors.brandRed,
    fontSize: 23,
    fontWeight: '900',
  },
  promoEntry: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  promoEntryCompact: {
    flexDirection: 'column',
  },
  promoInput: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#DCCB9F',
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    fontWeight: '800',
  },
  applyButton: {
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: colors.brandRed,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
  },
  promoMessage: {
    color: colors.brandBlue,
    fontSize: 13,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  offerList: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  offerCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: '#111217',
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#1E2028',
  },
  offerCode: {
    borderRadius: 16,
    backgroundColor: colors.brandRed,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  offerCodeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '900',
  },
  offerCopy: {
    flex: 1,
  },
  offerMeta: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '800',
  },
  offerDescription: {
    color: '#B8BDC7',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  darkPanel: {
    backgroundColor: '#111217',
    borderRadius: 26,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#1E2028',
    marginBottom: spacing.xl,
  },
  lightPanel: {
    backgroundColor: '#F7F0DE',
    borderRadius: 26,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#DEC78C',
    marginBottom: spacing.xl,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  listRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#22252D',
  },
  lightRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5D5A8',
  },
  listCopy: {
    flex: 1,
  },
  listTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
  listMeta: {
    color: '#949AA4',
    fontSize: 13,
    marginTop: 3,
  },
  lightListTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  lightListMeta: {
    color: '#665E49',
    fontSize: 13,
    marginTop: 3,
  },
  listPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(200,150,26,0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(200,150,26,0.28)',
  },
  listPillText: {
    color: colors.brandGold,
    fontSize: 11,
    fontWeight: '800',
  },
  teamAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brandBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamAvatarText: {
    color: colors.brandGold,
    fontSize: 13,
    fontWeight: '900',
  },
  listChevron: {
    color: '#8C8269',
    fontSize: 20,
    fontWeight: '700',
  },
});
