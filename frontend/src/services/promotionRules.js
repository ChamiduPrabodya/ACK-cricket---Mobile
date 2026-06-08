export const initialPromotions = [
  {
    id: 'promo-cricket10',
    title: 'CRICKET10',
    code: 'CRICKET10',
    discountType: 'percentage',
    discountValue: 10,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    appliesTo: 'all',
    campaignType: 'standard',
    description: '10% off all indoor cricket bookings.',
    isActive: true,
  },
  {
    id: 'promo-weekend15',
    title: 'Weekend Special',
    code: 'WEEKEND15',
    discountType: 'percentage',
    discountValue: 15,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    appliesTo: 'all',
    campaignType: 'weekend',
    description: 'Weekend sessions get 15% off.',
    isActive: true,
  },
  {
    id: 'promo-first500',
    title: 'First Booking Bonus',
    code: 'FIRST500',
    discountType: 'fixed',
    discountValue: 500,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    appliesTo: 'offPeak',
    campaignType: 'firstTime',
    description: 'LKR 500 off first bookings on off-peak slots.',
    isActive: true,
  },
];

export function formatDiscount(promotion) {
  if (promotion.discountType === 'percentage') {
    return `${promotion.discountValue}% off`;
  }

  return `LKR ${promotion.discountValue} off`;
}

export function getSlotType(slotTime) {
  const hour = Number(String(slotTime).split(':')[0]);

  if (Number.isNaN(hour)) {
    return 'all';
  }

  return hour >= 17 && hour <= 21 ? 'peak' : 'offPeak';
}

export function isWeekend(dateValue) {
  const day = new Date(dateValue).getDay();
  return day === 0 || day === 6;
}

export function isPromotionActive(promotion, dateValue = new Date()) {
  const selectedDate = new Date(dateValue);
  return (
    promotion.isActive &&
    new Date(promotion.validFrom) <= selectedDate &&
    new Date(promotion.validUntil) >= selectedDate
  );
}

export function canApplyPromotion(promotion, booking) {
  const slotType = booking.slotType || getSlotType(booking.slotTime);

  if (!isPromotionActive(promotion, booking.bookingDate)) {
    return { allowed: false, message: 'This offer is not active for the selected date.' };
  }

  if (promotion.appliesTo !== 'all' && promotion.appliesTo !== slotType) {
    return { allowed: false, message: 'This code does not apply to the selected time slot.' };
  }

  if (promotion.campaignType === 'weekend' && !isWeekend(booking.bookingDate)) {
    return { allowed: false, message: 'Weekend specials only apply on Saturday or Sunday.' };
  }

  if (promotion.campaignType === 'firstTime' && !booking.isFirstTimeUser) {
    return { allowed: false, message: 'This code is only for first-time users.' };
  }

  return { allowed: true, message: 'Promo code applied.' };
}

export function calculatePromotionQuote(promotion, basePrice) {
  const numericPrice = Number(basePrice);
  const discountAmount =
    promotion.discountType === 'percentage'
      ? Math.round((numericPrice * promotion.discountValue) / 100)
      : promotion.discountValue;

  return {
    discountAmount: Math.min(numericPrice, discountAmount),
    finalPrice: Math.max(0, numericPrice - discountAmount),
  };
}
