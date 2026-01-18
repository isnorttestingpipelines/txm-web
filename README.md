# TXM Trading Portal - React

A modern, real-time stock trading application built with React, TypeScript, and Tailwind CSS.

## Features

✅ **User Authentication** - Secure login with token management
✅ **Live Stock Prices** - Real-time market data integration
✅ **Trading Interface** - Buy/Sell stocks with order management
✅ **Portfolio Tracking** - Monitor positions, gains/losses
✅ **Watchlist** - Track favorite stocks
✅ **Order History** - Complete order management and history
✅ **License Management** - Integrated license verification
✅ **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Animations**: GSAP
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── LoginView.tsx    # Authentication
│   ├── Navigation.tsx   # Main navigation
│   ├── Dashboard.tsx    # Market scanner
│   ├── Portfolio.tsx    # Holdings management
│   ├── Watchlist.tsx    # Stock tracking
│   ├── Orders.tsx       # Order history
│   ├── License.tsx      # License info
│   └── TradeDialog.tsx  # Trading interface
├── store.ts             # Zustand state management
├── api.ts               # API integration layer
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## API Integration

### Currently Integrated:
- **Alpha Vantage** - Stock data and pricing (uses demo mode, get free key at alphavantage.co)
- **Custom Backend** - Authentication and licensing

### To Add Real Trading:

Replace the mock API functions in `src/api.ts` with real broker APIs:

**Recommended Brokers:**
- **Alpaca** - Commission-free trading, REST API, websockets
- **Interactive Brokers** - Professional trading platform
- **Polygon.io** - High-quality market data
- **Axiom** - For institutional-grade analytics

Example Alpaca integration snippet:
```typescript
import Alpaca from '@alpacahq/web-api';

const alpaca = new Alpaca({
  credentials: {
    key: process.env.ALPACA_API_KEY,
    secret: process.env.ALPACA_SECRET_KEY,
  },
  rate_limit: true,
});

// Place order
const order = await alpaca.createOrder({
  symbol: 'AAPL',
  qty: 10,
  side: 'buy',
  type: 'market',
  time_in_force: 'day',
});
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_ALPHA_VANTAGE_KEY=your_key_here
VITE_API_BASE=https://txm.fullynerfed.workers.dev
VITE_LICENSE_API=https://license-backend.fullynerfed.workers.dev
```

## Features Breakdown

### 1. Dashboard
- Real-time market scanner
- Portfolio summary
- Quick access to resources
- Live price updates every 30 seconds

### 2. Portfolio
- Holdings overview with current values
- Gain/loss tracking per position
- Portfolio performance metrics
- Cash and buying power display

### 3. Watchlist
- Add/remove stocks to track
- Price monitoring
- Quick trading access
- Price change indicators

### 4. Orders
- Complete order history
- Order status tracking (Pending, Filled, Cancelled)
- Order details and timestamps
- Filter capabilities (coming soon)

### 5. Trading Interface
- Buy/Sell modal dialog
- Real-time pricing
- Quantity validation
- Buying power verification
- Order confirmation

## State Management

Using Zustand for lightweight, efficient state:

```typescript
// Auth Store
- user: null | User
- isAuthenticated: boolean
- login(), logout(), setApiKey()

// Trading Store
- portfolio: PortfolioData
- stocks: Map<symbol, Stock>
- watchlist: string[]
- selectedStock: Stock | null
- updatePortfolio(), updateStock(), etc.
```

## Styling

- **Tailwind CSS** for utility-first styling
- **Glass-morphism** design pattern
- **Dark theme** with blue accents
- **Responsive grid layouts**
- **Smooth animations** with GSAP

## Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Future Enhancements

- [ ] WebSocket real-time updates
- [ ] Advanced charting (TradingView integration)
- [ ] Options trading support
- [ ] Margin trading
- [ ] Multi-account support
- [ ] Social features / leaderboards
- [ ] ML-based recommendations
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Advanced order types (Stop-Loss, Trailing Stop, etc.)

## API Rate Limits

- **Alpha Vantage (Free)**: 5 requests/min, 500/day
- **Alpha Vantage (Premium)**: 500 requests/min
- **Custom Backend**: Based on your infrastructure

For production, consider upgrading to paid tiers or using institutional APIs.

## Support & Contributing

For issues or feature requests, please reach out to the development team.

## License

TXM Trading Portal © 2024. All rights reserved.
