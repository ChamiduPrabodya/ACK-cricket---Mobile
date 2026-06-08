const express = require("express");
const {
  createPromotion,
  getActivePromotions,
  getPromotions,
  quoteBookingDiscount,
  validatePromoCode,
} = require("../controllers/promotionController");

const router = express.Router();

router.get("/", getPromotions);
router.get("/active", getActivePromotions);
router.post("/", createPromotion);
router.post("/validate", validatePromoCode);
router.post("/quote", quoteBookingDiscount);

module.exports = router;
