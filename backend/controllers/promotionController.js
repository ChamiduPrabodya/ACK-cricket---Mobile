const now = () => new Date();

let promotions = [
  {
    id: "promo-cricket10",
    title: "CRICKET10",
    code: "CRICKET10",
    discountType: "percentage",
    discountValue: 10,
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    appliesTo: "all",
    campaignType: "standard",
    description: "10% off any indoor cricket booking.",
    isActive: true,
  },
  {
    id: "promo-weekend15",
    title: "Weekend Special",
    code: "WEEKEND15",
    discountType: "percentage",
    discountValue: 15,
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    appliesTo: "all",
    campaignType: "weekend",
    description: "Weekend sessions get 15% off.",
    isActive: true,
  },
  {
    id: "promo-first500",
    title: "First Booking Bonus",
    code: "FIRST500",
    discountType: "fixed",
    discountValue: 500,
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    appliesTo: "offPeak",
    campaignType: "firstTime",
    description: "LKR 500 off for first-time users on off-peak slots.",
    isActive: true,
  },
];

function normalizeCode(code = "") {
  return code.trim().toUpperCase();
}

function parseBookingDate(value) {
  return value ? new Date(value) : now();
}

function getSlotType(slotTime = "") {
  const hour = Number(String(slotTime).split(":")[0]);

  if (Number.isNaN(hour)) {
    return "all";
  }

  return hour >= 17 && hour <= 21 ? "peak" : "offPeak";
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isPromotionActive(promotion, date = now()) {
  const startsAt = new Date(promotion.validFrom);
  const endsAt = new Date(promotion.validUntil);

  return promotion.isActive && startsAt <= date && endsAt >= date;
}

function canApplyPromotion(promotion, options = {}) {
  const bookingDate = parseBookingDate(options.bookingDate);
  const slotType = options.slotType || getSlotType(options.slotTime);

  if (!isPromotionActive(promotion, bookingDate)) {
    return { allowed: false, reason: "This promotion is not active." };
  }

  if (promotion.appliesTo !== "all" && promotion.appliesTo !== slotType) {
    return { allowed: false, reason: "This code is not valid for the selected time slot." };
  }

  if (promotion.campaignType === "weekend" && !isWeekend(bookingDate)) {
    return { allowed: false, reason: "This code is only valid for weekend bookings." };
  }

  if (promotion.campaignType === "firstTime" && options.isFirstTimeUser === false) {
    return { allowed: false, reason: "This code is only valid for first-time users." };
  }

  return { allowed: true };
}

function calculateDiscount(promotion, basePrice) {
  if (promotion.discountType === "percentage") {
    return Math.min(basePrice, Math.round((basePrice * promotion.discountValue) / 100));
  }

  return Math.min(basePrice, promotion.discountValue);
}

function buildQuote(promotion, basePrice) {
  const discountAmount = calculateDiscount(promotion, basePrice);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  return {
    basePrice,
    discountAmount,
    finalPrice,
    promotion: {
      id: promotion.id,
      title: promotion.title,
      code: promotion.code,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      campaignType: promotion.campaignType,
      appliesTo: promotion.appliesTo,
    },
  };
}

exports.getPromotions = (req, res) => {
  res.json(promotions);
};

exports.getActivePromotions = (req, res) => {
  const activePromotions = promotions.filter((promotion) => isPromotionActive(promotion));
  res.json(activePromotions);
};

exports.createPromotion = (req, res) => {
  const {
    title,
    code,
    discountType,
    discountValue,
    validFrom,
    validUntil,
    appliesTo = "all",
    campaignType = "standard",
    description = "",
  } = req.body;

  const normalizedCode = normalizeCode(code);
  const numericDiscount = Number(discountValue);

  if (!title || !normalizedCode || !discountType || !validFrom || !validUntil) {
    return res.status(400).json({ message: "Title, code, discount type, and validity dates are required." });
  }

  if (!["percentage", "fixed"].includes(discountType)) {
    return res.status(400).json({ message: "Discount type must be percentage or fixed." });
  }

  if (Number.isNaN(numericDiscount) || numericDiscount <= 0) {
    return res.status(400).json({ message: "Discount value must be greater than zero." });
  }

  if (discountType === "percentage" && numericDiscount > 100) {
    return res.status(400).json({ message: "Percentage discounts cannot exceed 100%." });
  }

  if (promotions.some((promotion) => promotion.code === normalizedCode)) {
    return res.status(409).json({ message: "A promotion with this code already exists." });
  }

  const promotion = {
    id: `promo-${Date.now()}`,
    title,
    code: normalizedCode,
    discountType,
    discountValue: numericDiscount,
    validFrom,
    validUntil,
    appliesTo,
    campaignType,
    description,
    isActive: true,
  };

  promotions = [promotion, ...promotions];
  res.status(201).json(promotion);
};

exports.validatePromoCode = (req, res) => {
  const { code, basePrice = 0, bookingDate, slotTime, slotType, isFirstTimeUser } = req.body;
  const promotion = promotions.find((item) => item.code === normalizeCode(code));

  if (!promotion) {
    return res.status(404).json({ message: "Promo code was not found." });
  }

  const result = canApplyPromotion(promotion, {
    bookingDate,
    slotTime,
    slotType,
    isFirstTimeUser,
  });

  if (!result.allowed) {
    return res.status(400).json({ message: result.reason });
  }

  res.json(buildQuote(promotion, Number(basePrice)));
};

exports.quoteBookingDiscount = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Promo code is required." });
  }

  return exports.validatePromoCode(req, res);
};
