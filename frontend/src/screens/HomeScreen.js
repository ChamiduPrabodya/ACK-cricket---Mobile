import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';

const logo = require('../assets/ack-logo.webp');
const gearUpImage = require('../assets/promo-gear-up.png');
const holidayPromoImage = require('../assets/promo-holiday-season.png');

const promos = [
  {
    title: 'Gear Up and Play!',
    subtitle: 'Secure your evening slot in just a few taps.',
    cta: 'Book Now',
    tone: '#17130A',
    
    image: gearUpImage,
  },
  {
    title: 'Holiday Season Promo',
    subtitle: 'Enjoy 10% off on all weekend bookings this month.',
    cta: 'Claim Offer',
    tone: '#241015',
    accent: colors.brandRed,
    image: holidayPromoImage,
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

function PromoCard({ item, featured = false, motion, orbit }) {
  const translateY = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, featured ? -6 : -4],
  });

  const scale = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [1, featured ? 1.015 : 1.008],
  });

  const orbitalX = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 14],
  });

  const orbitalY = orbit.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [10, -12, 10],
  });

  return (
    <Animated.View
      style={[
        styles.promoCard,
        { backgroundColor: item.tone },
        featured && styles.featuredPromoCard,
        {
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {item.image ? (
        <ImageBackground
          source={item.image}
          style={styles.promoImage}
          imageStyle={styles.promoImageStyle}
        >
          <View style={styles.promoImageOverlay} />
        </ImageBackground>
      ) : null}
      <Animated.View
        style={[
          styles.promoGlow,
          { backgroundColor: item.accent, transform: [{ scale }] },
        ]}
      />
      <View style={styles.promoPattern} />
      <View style={styles.promoContent}>
        <Text style={[styles.promoTitle, featured && styles.promoTitleFeatured]}>
          {item.title}
        </Text>
        <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
        <Animated.View style={[styles.promoButton, { transform: [{ scale }] }]}>
          <Text style={styles.promoButtonText}>{item.cta}</Text>
        </Animated.View>
      </View>

      {!item.image ? (
        <View style={styles.playerSilhouette}>
          <Animated.View
            style={[
              styles.orbitBall,
              {
                backgroundColor: item.accent,
                transform: [{ translateX: orbitalX }, { translateY: orbitalY }],
              },
            ]}
          />
          <View style={styles.playerAura} />
          <View style={styles.playerBody} />
          <View style={styles.playerBat} />
        </View>
      ) : null}
    </Animated.View>
  );
}

export default function HomeScreen() {
  const entrance = useRef(new Animated.Value(0)).current;
  const heroDrift = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const promoMotion = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;
  const linksRise = useRef(new Animated.Value(18)).current;
  const linksOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entrance, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(180),
        Animated.parallel([
          Animated.timing(linksRise, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(linksOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(heroDrift, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(heroDrift, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(promoMotion, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(promoMotion, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start(() => {
      orbit.setValue(0);
    });
  }, [entrance, heroDrift, linksOpacity, linksRise, orbit, promoMotion, pulse]);

  const entranceOpacity = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const entranceTranslateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  const heroTranslateY = heroDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });

  const heroRotate = heroDrift.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-1deg'],
  });

  const heroGlowScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.16],
  });

  const badgeScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          opacity: entranceOpacity,
          transform: [{ translateY: entranceTranslateY }],
        }}
      >
        <View style={styles.heroShell}>
          <View style={styles.topBar}>
            <View style={styles.topBarLeft}>
              <View style={styles.brandRow}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.brandName}>ACK TURF</Text>
              </View>
              <Text style={styles.greeting}>Hello, Good Morning</Text>
            </View>
            <View style={styles.topBarActions}>
              <Animated.View
                style={[
                  styles.notificationBubble,
                  {
                    transform: [{ scale: badgeScale }],
                    opacity: pulseOpacity,
                  },
                ]}
              >
                <View style={styles.notificationBell} />
                <View style={styles.notificationDotSmall} />
              </Animated.View>
              <View style={styles.avatarBubble}>
                <Text style={styles.avatarText}>KP</Text>
              </View>
            </View>
          </View>

          <Animated.View
            style={[
              styles.heroCard,
              {
                transform: [{ translateY: heroTranslateY }, { rotate: heroRotate }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.heroGlow,
                {
                  transform: [{ scale: heroGlowScale }],
                  opacity: pulseOpacity,
                },
              ]}
            />
            <View style={styles.heroPattern} />
            <Text style={styles.heroTitle}>Play Indoor Cricket Like a Pro</Text>
            <Text style={styles.heroSubtitle}>
              Book premium grounds, track sessions, and unlock member rewards.
            </Text>

            <View style={styles.heroStats}>
              {bookingHighlights.map((item) => (
                <Animated.View
                  key={item.label}
                  style={[
                    styles.heroStatChip,
                    { transform: [{ translateY: heroTranslateY }] },
                  ]}
                >
                  <Text style={styles.heroStatValue}>{item.value}</Text>
                  <Text style={styles.heroStatLabel}>{item.label}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </View>

        <PromoCard item={promos[0]} featured motion={promoMotion} orbit={orbit} />

        <Animated.View
          style={{
            opacity: linksOpacity,
            transform: [{ translateY: linksRise }],
          }}
        >
          <View style={styles.quickLinksRow}>
            {quickLinks.map((item) => (
              <View key={item.label} style={styles.quickLinkCard}>
                <Animated.View
                  style={[
                    styles.quickLinkAccent,
                    {
                      backgroundColor: item.accent,
                      transform: [{ scaleX: heroGlowScale }],
                    },
                  ]}
                />
                <Text style={styles.quickLinkLabel}>{item.label}</Text>
                <Text style={styles.quickLinkCaption}>{item.caption}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special for you</Text>
          <Text style={styles.sectionAction}>View all</Text>
        </View>
        <View style={styles.cardStack}>
          {promos.slice(1).map((item) => (
            <PromoCard
              key={item.title}
              item={item}
              motion={promoMotion}
              orbit={orbit}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My teams</Text>
          <Text style={styles.sectionAction}>Manage</Text>
        </View>
        <View style={styles.teamsPanel}>
          {myTeams.map((team) => (
            <View key={team.name} style={styles.teamRow}>
              <Animated.View
                style={[
                  styles.teamAvatar,
                  {
                    transform: [{ scale: badgeScale }],
                  },
                ]}
              >
                <Text style={styles.teamAvatarText}>
                  {team.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)}
                </Text>
              </Animated.View>
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

        
      </Animated.View>
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
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  topBarLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  brandName: {
    color: colors.surface,
    fontSize: 19,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  greeting: {
    color: '#E5E7EB',
    fontSize: 15,
    fontWeight: '500',
    marginTop: spacing.md,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: 2,
  },
  notificationBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A30',
    position: 'relative',
  },
  notificationBell: {
    width: 14,
    height: 14,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderBottomWidth: 1.5,
  },
  notificationDotSmall: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.brandGold,
  },
  avatarBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3A3A44',
  },
  avatarText: {
    color: colors.surface,
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
  heroGlow: {
    position: 'absolute',
    top: -20,
    right: -10,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(200,150,26,0.16)',
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
    minHeight: 142,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: spacing.md,
  },
  promoImage: {
    ...StyleSheet.absoluteFillObject,
  },
  promoImageStyle: {
    borderRadius: 22,
  },
  promoImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  featuredPromoCard: {
    minHeight: 156,
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
    maxWidth: '58%',
    zIndex: 2,
  },
  promoTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 21,
  },
  promoTitleFeatured: {
    fontSize: 20,
    lineHeight: 23,
  },
  promoSubtitle: {
    color: '#D8DADF',
    fontSize: 12,
    lineHeight: 17,
    marginTop: spacing.xs,
  },
  promoButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    marginTop: spacing.md,
  },
  promoButtonText: {
    color: colors.brandBlack,
    fontSize: 12,
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
  orbitBall: {
    position: 'absolute',
    top: 12,
    right: 34,
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
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
    gap: spacing.sm,
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
