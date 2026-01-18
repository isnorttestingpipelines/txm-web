# 🎯 Integration Checklist - Real Trading APIs

Use this checklist to integrate with your chosen broker.

---

## 🏦 ALPACA (Recommended ⭐⭐⭐)

### Setup
- [ ] Sign up at https://app.alpaca.markets
- [ ] Create API keys
- [ ] Set up paper trading account
- [ ] Note API Key and Secret Key

### Installation
```bash
npm install @alpacahq/web-api
npm install --save-dev @types/alpaca
```

### Configuration
```env
VITE_ALPACA_API_KEY=your_api_key_here
VITE_ALPACA_SECRET_KEY=your_secret_key_here
VITE_ALPACA_BASE_URL=https://paper-api.alpaca.markets
```

### Code Integration
- [ ] Copy code from `src/axiom-api.example.ts` OPTION 1
- [ ] Create `src/alpaca-api.ts`
- [ ] Update `src/api.ts` to use Alpaca
- [ ] Test with paper trading account
- [ ] Verify orders execute correctly
- [ ] Test portfolio updates

### Features to Test
- [ ] Login and authentication
- [ ] Place buy orders
- [ ] Place sell orders
- [ ] View real portfolio
- [ ] Check order history
- [ ] Real-time price updates
- [ ] Buying power validation

### Verification
```bash
npm run dev
# Test trading with paper money
```

---

## 💼 INTERACTIVE BROKERS

### Setup
- [ ] Create account at https://www.interactivebrokers.com
- [ ] Download TWS (Trader WorkStation)
- [ ] Enable API access in settings
- [ ] Note Account ID

### Installation
```bash
npm install ibkr
```

### Configuration
```env
VITE_IBKR_ACCOUNT_ID=your_account_id
VITE_IBKR_HOST=127.0.0.1
VITE_IBKR_PORT=7496
```

### Code Integration
- [ ] Copy code from `src/axiom-api.example.ts` OPTION 2
- [ ] Create `src/ibkr-api.ts`
- [ ] Start TWS locally
- [ ] Update `src/api.ts` to use IBKR
- [ ] Test connections
- [ ] Verify order placement

### Features to Test
- [ ] Account connectivity
- [ ] Position retrieval
- [ ] Order placement
- [ ] Market data
- [ ] Order history

---

## 📊 POLYGON.IO (Market Data)

### Setup
- [ ] Sign up at https://polygon.io
- [ ] Get free API tier
- [ ] Note API Key

### Installation
```bash
npm install @polygon.io/client-js
```

### Configuration
```env
VITE_POLYGON_API_KEY=your_api_key
```

### Code Integration
- [ ] Copy code from `src/axiom-api.example.ts` OPTION 3
- [ ] Create `src/polygon-api.ts`
- [ ] Update `src/api.ts` for stock data
- [ ] Test data retrieval
- [ ] Verify historical data
- [ ] Check real-time quotes

### Features to Test
- [ ] Get stock quotes
- [ ] Historical bars
- [ ] Company info
- [ ] Technical indicators

---

## ⏰ TWELVE DATA (Market Data Alternative)

### Setup
- [ ] Sign up at https://twelvedata.com
- [ ] Get free API tier
- [ ] Note API Key

### Installation
```bash
npm install twelvedata
```

### Configuration
```env
VITE_TWELVEDATA_API_KEY=your_api_key
```

### Code Integration
- [ ] Copy code from `src/axiom-api.example.ts` OPTION 4
- [ ] Create `src/twelvedata-api.ts`
- [ ] Test data retrieval
- [ ] Verify updates

---

## 🔄 RECOMMENDED SETUP

### Best Practice Configuration
```typescript
// src/api.ts

// Data provider (Polygon or Twelve Data)
import * as polygonAPI from './polygon-api';

// Trading (Alpaca or Interactive Brokers)
import * as alpacaAPI from './alpaca-api';

export const stockAPI = polygonAPI; // Data
export const tradingAPI = alpacaAPI; // Trading
```

### Environment Variables
```env
# Data
VITE_POLYGON_API_KEY=pk_xxx

# Trading (Alpaca)
VITE_ALPACA_API_KEY=PKxxx
VITE_ALPACA_SECRET_KEY=xxx

# App URLs
VITE_API_BASE=https://txm.fullynerfed.workers.dev
VITE_LICENSE_API=https://license-backend.fullynerfed.workers.dev
```

---

## ✅ TESTING CHECKLIST

### Auth & Security
- [ ] Login works
- [ ] Session persists
- [ ] Logout clears session
- [ ] API keys not exposed

### Trading
- [ ] Place BUY order succeeds
- [ ] Place SELL order succeeds
- [ ] Order validation works
- [ ] Insufficient funds detected
- [ ] Order history updates
- [ ] Order status accurate

### Portfolio
- [ ] Positions show correctly
- [ ] Gain/loss calculated
- [ ] Cash balance accurate
- [ ] Buying power correct
- [ ] Real-time updates work

### Market Data
- [ ] Stock prices update
- [ ] Price changes accurate
- [ ] Watchlist updates
- [ ] No API rate limiting

### UI/UX
- [ ] No console errors
- [ ] All buttons functional
- [ ] Mobile responsive
- [ ] Performance acceptable

---

## 🐛 Common Issues & Fixes

### "API Key Invalid"
- Check `.env.local` file exists
- Verify keys are correct
- Check Vite environment variable prefix (`VITE_`)

### "CORS Errors"
- Use backend proxy if needed
- Check broker CORS settings
- May need API gateway

### "Paper Trading Not Enabled"
- Alpaca: Go to dashboard, enable paper trading
- Interactive Brokers: Configure TWS settings
- Most brokers have paper trading by default

### "Orders Not Executing"
- Check market hours (9:30-16:00 EST)
- Verify buying power
- Check if symbol exists
- Try limit order if market order fails

### "Real-time Updates Slow"
- Add WebSocket connection
- Reduce polling frequency
- Check API rate limits
- Consider using pub/sub system

---

## 🚀 Deployment

### Before Going Live
- [ ] Thoroughly test with paper trading
- [ ] Load test the application
- [ ] Verify error handling
- [ ] Security audit
- [ ] Backup and recovery plan
- [ ] Monitor system logs

### Secrets Management
```bash
# Use environment variables, NOT hardcoded keys
# Store securely:
# - Docker secrets
# - Kubernetes secrets
# - .env files (never committed)
# - Environment variable manager
```

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor API usage
- [ ] Track order success rate
- [ ] Monitor performance
- [ ] Set up alerts

---

## 📞 Support Resources

### Alpaca
- Docs: https://docs.alpaca.markets
- Community: https://discord.gg/alpaca
- GitHub: https://github.com/alpacahq

### Interactive Brokers
- Docs: https://interactivebrokers.github.io/tws-api/
- Forum: https://www.interactivebrokers.com/en/index.php?f=14099

### Polygon.io
- Docs: https://polygon.io/docs
- Support: https://polygon.io/support

---

## 📋 Final Checklist

- [ ] Development environment working
- [ ] API keys configured
- [ ] Paper trading tested
- [ ] All features working
- [ ] Error handling in place
- [ ] UI fully responsive
- [ ] Documentation updated
- [ ] Ready for production

---

**When ready, run:**
```bash
npm run build
# Deploy to your hosting platform
```

**Good luck with live trading! 🚀**

