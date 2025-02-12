# Crypto Rates API

Simple and reliable API for fetching real-time cryptocurrency rates powered by CoinMarketCap.

## Base URL
```
http://localhost:3000/api
```

## Authentication
No authentication required for API endpoints. However, you need a valid CoinMarketCap API key for the service to work.

## Endpoints

### Get Crypto Rates
```
GET /crypto/rates
```

Fetches current cryptocurrency rates with optional parameters for customization.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| coins | string | "BTC,ETH,BNB" | Comma-separated list of cryptocurrency symbols |
| currency | string | "USD" | Fiat currency for conversion |
| forceRefresh | boolean | false | Force fresh data instead of cached |

#### Response Format

```json
{
  "success": true,
  "data": {
    "BTC": {
      "price": 48392.12,
      "lastUpdated": "2024-02-12T10:30:00.000Z",
      "change24h": 2.45
    },
    "ETH": {
      "price": 2501.34,
      "lastUpdated": "2024-02-12T10:30:00.000Z",
      "change24h": 1.23
    }
  },
  "timestamp": "2024-02-12T10:30:01.234Z"
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Invalid coins parameter"
  },
  "timestamp": "2024-02-12T10:30:01.234Z"
}
```

## Examples

### Basic Request
```bash
curl http://localhost:8080/api/crypto/rates
```

### Custom Coins
```bash
curl "http://localhost:8080/api/crypto/rates?coins=BTC,DOGE,XRP"
```

### Different Currency
```bash
curl "http://localhost:8080/api/crypto/rates?currency=EUR"
```

### Force Cache Refresh
```bash
curl "http://localhost:8080/api/crypto/rates?forceRefresh=true"
```

## Rate Limiting

- Cached responses for 1 minute by default
- Use `forceRefresh=true` to bypass cache when needed

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 502 | Bad Gateway - External API error |
| 500 | Internal Server Error |

## Notes
- All prices are returned with decimal precision
- Timestamps are in ISO 8601 format
- 24-hour change is in percentage