const express = require('express');
const router = express.Router();

//------------ Importing Controller ------------//
const QuotesController = require('../controllers/quotesController');

router.get('/crypto-rates', QuotesController.getCryptoRates);

module.exports = router;
