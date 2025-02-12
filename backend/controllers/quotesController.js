const QuotesService = require('../services/quotesService.js');

exports.getCryptoRates = async (req, res) => {
    try {
        const { coins, currency, forceRefresh } = req.query;
        
        const options = {
            coins: coins?.split(','),
            currency,
            forceRefresh: forceRefresh === 'true',
        };

        const rates = await QuotesService.getCryptoRates(options);
        res.status(200).json({
            success: true,
            data: rates,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        next(error);
    }
};
