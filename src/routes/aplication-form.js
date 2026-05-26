const express = require("express");
const { sendAplicationToSheet } = require("../controllers/aplicationController");

const router = express.Router();

router.post("/", sendAplicationToSheet);

module.exports = router;