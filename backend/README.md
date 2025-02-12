# **NodeJS NYX Chiper Backend App**

## **Technologies Used**
1.  NodeJS
2.  Express
3.  MongoDB
4.  Mongoose
5.  PassportJS
6.  JWT
7.  Nodemailer

## **Prerequisites**
- Git
- Bitbucket
- NodeJS
- CLI


## **Prerequisites**
This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
v 10.5.0
v 20.10.0
```

## **Getting Started**
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://@bitbucket.org/repository.git
$ cd backend
```

To install and set up the library, run:

```sh
$ node --version
$ npm install
```
## **Usage**
### Serving the app
```sh
$ npm start
```
### Running the tests

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

## **New Update ⚠️**

We'd like to inform you of important changes to our distribution repository [nodesource/distributions](https://github.com/nodesource/distributions).

**What's New:**

- _**Package Changes:** DEB and RPM packages are now available under the `nodistro` codename. We no longer package the installer coupled to specific versions. This means you can install Node.js on almost any distro that meets the minimum requirements._
- **Installation Scripts:** Back by popular demand, the installation scripts have returned and are better than ever. See the installation instructions below for details on how to use them.
- **RPM Package Signing Key:** The key used to sign RPM packages has changed. We now sign packages using SHA256, providing better support to the community.
- **Questions and concerns:** To resolve questions and discuss concerns about this update we've opened this discussion space [New distribution&#39;s packages](https://github.com/nodesource/distributions/discussions/#123456)

## Postman Collection
https://api.postman.com/collections/24585901-aa53bccd-cc2b-41c6-aa5b-ffe600048429?access_key=PMAT-01J406QQ1RFMBNZKYWWKGX5FMJ

# Crypto Rates API

This API fetches real-time cryptocurrency exchange rates using the CoinMarketCap API.

## Prerequisites

Make sure you have the following installed:
- Node.js (v20+ recommended)
- npm or yarn
- An active CoinMarketCap API key

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Add the following  variables insite quotes.Service.js `.env`:
   ```ini
   CMC_API_KEY=your_coinmarketcap_api_key_here
   ```

## Folder Structure

```
crypto-rates/
│── controllers/
│   ├── quotesController.js
│── services/
│   ├── quotesService.js
│── routes/
│   ├── quotes.js
│── .env
│── app.js
│── package.json
```

## Code Implementation

### 1. Quotes Service (`services/quotesService.js`)
This file fetches cryptocurrency prices from the CoinMarketCap API.

```js
const axios = require('axios');

const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const CMC_API_KEY = "your cmc api key";
const COINS = 'BTC,ETH,BNB';
const CURRENCY = 'USD';

exports.getCryptoRates = async () => {
    try {
        const response = await axios.get(CMC_API_URL, {
            headers: { 'X-CMC_PRO_API_KEY': CMC_API_KEY },
            params: { symbol: COINS, convert: CURRENCY },
        });

        const data = response.data.data;
        let rates = {};

        Object.keys(data).forEach((coin) => {
            rates[coin] = { usd: data[coin].quote.USD.price };
        });

        return rates;
    } catch (error) {
        throw new Error("Error fetching crypto rates");
    }
};
```

### 2. Quotes Controller (`controllers/quotesController.js`)
This file handles the API request and response.

```js
const QuotesService = require('../services/quotesService');

exports.getCryptoRates = async (req, res) => {
    try {
        const rates = await QuotesService.getCryptoRates();
        res.status(200).json(rates);
    } catch (error) {
        console.error("Error fetching crypto rates:", error.message);
        res.status(500).json({ error: "Error fetching crypto rates" });
    }
};
```

### 3. Quotes Route (`routes/quotes.js`)
This file defines the API route.

```js
const express = require('express');
const router = express.Router();
const QuotesController = require('../controllers/quotesController');

router.get('/crypto-rates', QuotesController.getCryptoRates);

module.exports = router;
```

### 4. Main App (`app.js`)
This file initializes the Express server.

```js
const express = require('express');
const dotenv = require('dotenv');
const quotesRoutes = require('./routes/quotes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', quotesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

## Running the Server

1. Start the server:
   ```sh
   node app.js
   ```

2. Open your browser or Postman and make a GET request:
   ```
   http://localhost:8080/api/rates/crypto-rates
   ```

## Common Issues & Fixes

1. **Dotenv not found:** Install dotenv:
   ```sh
   npm install dotenv
   ```

3. **401 Unauthorized Error:** Verify that your API key is correct and has necessary permissions in your CoinMarketCap account.

## License

MIT License

---

Let me know if you need any modifications! 🚀

