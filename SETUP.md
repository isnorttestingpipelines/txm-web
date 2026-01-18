# TXM Trading Portal - Setup Guide

## Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- Get a free Alpha Vantage key at: https://www.alphavantage.co/

### Step 3: Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Project Features

### ✅ Fully Functional Components

1. **Authentication System**
   - Email/password login
   - Session persistence
   - Token management

2. **Real-Time Stock Data**
   - Integration with Alpha Vantage API
   - Live price updates
   - Change tracking

3. **Trading Module**
   - Buy/Sell interface
   - Order placement
   - Order history
   - Status tracking

4. **Portfolio Management**
   - Position tracking
   - Gain/Loss calculations
   - Cash management
   - Buying power display

5. **Watchlist**
   - Add/remove stocks
   - Price monitoring
   - Quick access to trading

6. **License Management**
   - License verification
   - User authentication

## Customization Guide

### Adding Real Broker Integration

Replace the mock implementations in `src/api.ts` with real broker APIs:

#### Option 1: Alpaca API
```typescript
// Install Alpaca SDK
npm install @alpacahq/web-api

// In src/api.ts
import Alpaca from '@alpacahq/web-api';

const alpaca = new Alpaca({
  credentials: {
    key: process.env.VITE_BROKER_API_KEY!,
    secret: process.env.VITE_BROKER_SECRET_KEY!,
  },
});

export const tradingAPI = {
  placeOrder: async (symbol: string, quantity: number, price: number, type: 'BUY' | 'SELL') => {
    const order = await alpaca.createOrder({
      symbol,
      qty: quantity,
      side: type.toLowerCase() as 'buy' | 'sell',
      type: 'market',
      time_in_force: 'day',
    });
    return order;
  },
  
  getPortfolio: async () => {
    const account = await alpaca.getAccount();
    const positions = await alpaca.getPositions();
    return {
      cash: account.cash,
      totalValue: account.portfolio_value,
      buyingPower: account.buying_power,
      positions: positions.map(p => ({...})),
      orders: [],
    };
  },
};
```

#### Option 2: Interactive Brokers API
```typescript
npm install ibkr

// Similar integration pattern
```

#### Option 3: Polygon.io
```typescript
npm install @polygon.io/client-js

// For market data only
```

### Customizing UI Theme

Edit `src/index.css`:
```css
:root {
  --bg-dark: #07090b;      /* Change background color */
  --accent-blue: #2D5BFF;   /* Change accent color */
  --glass-border: rgba(255, 255, 255, 0.1);
  --text-muted: #94a3b8;
}
```

### Adding WebSocket Real-Time Updates

```typescript
// Create src/websocket.ts
import io from 'socket.io-client';

export const socket = io(process.env.VITE_API_BASE);

socket.on('price_update', (data) => {
  useTradingStore.getState().updateStock(data);
});
```

## Advanced Features to Add

### 1. Advanced Order Types
```typescript
interface AdvancedOrder {
  stopPrice?: number;      // Stop-loss
  trailingStop?: number;   // Trailing stop
  limitPrice?: number;     // Limit order
  timeInForce?: 'DAY' | 'GTC' | 'OPG' | 'CLS';
}
```

### 2. Options Trading
```typescript
interface OptionOrder {
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  expiration: Date;
  quantity: number;
}
```

### 3. Margin Trading
```typescript
portfolio: {
  ...
  marginLevel: number;
  marginUsed: number;
  marginAvailable: number;
}
```

### 4. Backtesting Module
```typescript
// src/components/Backtest.tsx
// Historical data analysis and strategy testing
```

### 5. Real-Time Charts
```typescript
npm install lightweight-charts react-lightweight-charts

// Replace mock TradingView with Lightweight Charts
```

## Performance Optimization

### Code Splitting
```typescript
// src/App.tsx
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### API Caching
```typescript
// Add to src/api.ts
const cache = new Map<string, { data: any; timestamp: number }>();

const CACHE_DURATION = 30000; // 30 seconds

export function getCachedPrice(symbol: string) {
  const cached = cache.get(symbol);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}
```

## Deployment

### Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment Variables for Production
```
VITE_API_BASE=https://your-api.com
VITE_LICENSE_API=https://your-license-api.com
VITE_ALPHA_VANTAGE_KEY=your_production_key
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run build
```

## Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Docs](https://vitejs.dev)
- [Alpha Vantage API](https://www.alphavantage.co/documentation/)
- [Alpaca Trading API](https://alpaca.markets/docs/)

## Support

For questions or issues, refer to the main README.md or contact the development team.
