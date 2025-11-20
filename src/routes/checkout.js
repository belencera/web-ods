const express = require("express");
const { sendProductToSheet } = require("../controllers/checkoutController");

const router = express.Router();

router.post("/", sendProductToSheet);

module.exports = router;
