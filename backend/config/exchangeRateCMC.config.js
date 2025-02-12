const EXCHANGE_RATE_CONFIG = {
    API_URL: process.env.CMC_API_URL || 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    API_KEY: process.env.CMC_API_KEY || 'bba1cdb8-d1cf-4ecd-89da-b366769c08e8',
    DEFAULT_COINS: ['BTC', 'ETH', 'BNB'],
    DEFAULT_CURRENCY: 'USD',
    CACHE_DURATION: 60 * 1000, // 1 minute cache
};

module.exports = { EXCHANGE_RATE_CONFIG };