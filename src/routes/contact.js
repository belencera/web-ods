const express = require("express");
const router = express.Router();
const { sendContactToSheet } = require("../controllers/contactController");

router.post("/", sendContactToSheet);

module.exports = router;
