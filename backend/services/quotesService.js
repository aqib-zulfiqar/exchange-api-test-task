const axios = require('axios');
const NodeCache = require('node-cache');

const { ValidationError, ExternalAPIError} = require('../utils/errors');
const {EXCHANGE_RATE_CONFIG} = require('../config/exchangeRateCMC.config.js')

const cache = new NodeCache({ stdTTL: EXCHANGE_RATE_CONFIG.CACHE_DURATION });

const apiClient = axios.create({
    baseURL: EXCHANGE_RATE_CONFIG.API_URL,
    headers: { 'X-CMC_PRO_API_KEY': EXCHANGE_RATE_CONFIG.API_KEY },
    timeout: 5000,
});

/**
 * Validates the input parameters for crypto rate fetching
 * @param {string[]} coins - Array of cryptocurrency symbols
 * @param {string} currency - Currency for conversion
 * @throws {ValidationError} If validation fails
 */
const validateParams = (coins = EXCHANGE_RATE_CONFIG.DEFAULT_COINS, currency = EXCHANGE_RATE_CONFIG.DEFAULT_CURRENCY) => {
    if (!Array.isArray(coins) || coins.length === 0) {
        throw new ValidationError('Invalid coins parameter');
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
        throw new ValidationError('Invalid currency parameter');
    }
};

/**
 * Formats the API response into a standardized format
 * @param {Object} data - Raw API response data
 * @returns {Object} Formatted cryptocurrency rates
 */
const formatResponse = (data) => {
    return Object.entries(data).reduce((rates, [coin, details]) => {
        rates[coin] = {
            price: details.quote[EXCHANGE_RATE_CONFIG.DEFAULT_CURRENCY].price,
            lastUpdated: details.quote[EXCHANGE_RATE_CONFIG.DEFAULT_CURRENCY].last_updated,
            change24h: details.quote[EXCHANGE_RATE_CONFIG.DEFAULT_CURRENCY].percent_change_24h,
        };
        return rates;
    }, {});
};

/**
 * Fetches cryptocurrency rates from the API or cache
 * @param {Object} options - Options for fetching rates
 * @param {string[]} [options.coins] - Array of cryptocurrency symbols
 * @param {string} [options.currency] - Currency for conversion
 * @param {boolean} [options.forceRefresh=false] - Force refresh cache
 * @returns {Promise<Object>} Formatted cryptocurrency rates
 * @throws {ValidationError|ExternalAPIError} If validation fails or API request fails
 */

exports.getCryptoRates = async ({
    coins = EXCHANGE_RATE_CONFIG.DEFAULT_COINS,
    currency = EXCHANGE_RATE_CONFIG.DEFAULT_CURRENCY,
    forceRefresh = false,
} = {}) => {
    validateParams(coins, currency);

    const cacheKey = `rates_${coins.join('_')}_${currency}`;
    
    if (!forceRefresh) {
        const cachedData = cache.get(cacheKey);
        if (cachedData) return cachedData;
    }

    try {
        const response = await apiClient.get('', {
            params: {
                symbol: coins.join(','),
                convert: currency,
            },
        });

        if (!response.data?.data) {
            throw new ExternalAPIError('Invalid API response format');
        }

        const formattedRates = formatResponse(response.data.data);
        cache.set(cacheKey, formattedRates);
        
        return formattedRates;
    } catch (error) {
        if (error instanceof ValidationError) throw error;
        
        throw new ExternalAPIError(
            `Failed to fetch crypto rates: ${error.message}`,
            error.response?.status
        );
    }
};
