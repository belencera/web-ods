const express = require("express");
const { sendPlanToSheet } = require("../controllers/planCheckoutController");

const router = express.Router();

router.post("/", sendPlanToSheet);

module.exports = router;
