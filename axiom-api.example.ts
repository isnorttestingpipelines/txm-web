/**
 * AXIOM TRADING API INTEGRATION EXAMPLE
 * 
 * This file shows how to integrate with Axiom or other professional trading APIs
 * Uncomment and customize based on your broker choice
 */

// ============================================================================
// OPTION 1: ALPACA MARKETS (Recommended - REST + WebSocket + Free)
// ============================================================================

/*
import Alpaca from '@alpacahq/web-api';

const alpaca = new Alpaca({
  credentials: {
    key: process.env.VITE_ALPACA_API_KEY!,
    secret: process.env.VITE_ALPACA_SECRET_KEY!,
  },
  rate_limit: true,
});

export const axiomTradingAPI = {
  // Get account info
  getAccount: async () => {
    const account = await alpaca.getAccount();
    return {
      cash: parseFloat(account.cash!),
      totalValue: parseFloat(account.portfolio_value!),
      buyingPower: parseFloat(account.buying_power!),
      equity: parseFloat(account.equity!),
      returns: parseFloat(account.regt_buying_power!),
    };
  },

  // Get all positions
  getPositions: async () => {
    const positions = await alpaca.getPositions();
    return positions.map(p => ({
      symbol: p.symbol!,
      quantity: parseInt(p.qty!),
      averagePrice: parseFloat(p.avg_fill_price!),
      currentPrice: parseFloat(p.current_price!),
      value: parseFloat(p.market_value!),
      gain: parseFloat(p.unrealized_pl!),
      gainPercent: parseFloat(p.unrealized_plpc!) * 100,
    }));
  },

  // Place order
  placeOrder: async (symbol: string, quantity: number, price: number, type: 'BUY' | 'SELL') => {
    const order = await alpaca.createOrder({
      symbol,
      qty: quantity,
      side: type.toLowerCase() as 'buy' | 'sell',
      type: 'market',
      time_in_force: 'day',
    });
    return {
      id: order.id,
      symbol: order.symbol,
      type: type,
      quantity: parseInt(order.qty!),
      price: parseFloat(order.filled_avg_price || price.toString()),
      status: order.status as 'PENDING' | 'FILLED' | 'CANCELLED',
      timestamp: new Date(order.submitted_at!),
    };
  },

  // Get order history
  getOrders: async (status?: string) => {
    const orders = await alpaca.getOrders({ status });
    return orders.map(o => ({
      id: o.id,
      symbol: o.symbol,
      type: o.side?.toUpperCase() as 'BUY' | 'SELL',
      quantity: parseInt(o.qty!),
      price: parseFloat(o.filled_avg_price || '0'),
      status: o.status?.toUpperCase() as 'PENDING' | 'FILLED' | 'CANCELLED',
      timestamp: new Date(o.submitted_at!),
    }));
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    await alpaca.cancelOrder(orderId);
    return { success: true, orderId };
  },

  // Get real-time bars
  getBars: async (symbol: string, timeframe: string) => {
    const bars = await alpaca.getBarsV2(symbol, {
      timeframe: timeframe as any,
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    });
    return bars;
  },
};
*/

// ============================================================================
// OPTION 2: INTERACTIVE BROKERS API
// ============================================================================

/*
import * as IB from 'ibkr';

const client = new IB.IBClient({
  host: 'localhost',
  port: 7496,
  clientId: 1,
});

export const axiomTradingAPI = {
  getAccount: async () => {
    const account = await client.getAccount();
    return {
      cash: account.availableFunds,
      totalValue: account.totalValue,
      buyingPower: account.buyingPower,
    };
  },

  getPositions: async () => {
    const positions = await client.getPositions();
    return positions.map(p => ({
      symbol: p.contract.symbol,
      quantity: p.position,
      averagePrice: p.avgCost / p.position,
      currentPrice: p.marketPrice,
      value: p.marketValue,
      gain: p.unrealizedPNL,
      gainPercent: (p.unrealizedPNL / (p.marketValue - p.unrealizedPNL)) * 100,
    }));
  },

  placeOrder: async (symbol: string, quantity: number, price: number, type: 'BUY' | 'SELL') => {
    const order = new IB.Order();
    order.action = type;
    order.totalQuantity = quantity;
    order.orderType = 'MKT';

    const contract = new IB.Contract();
    contract.symbol = symbol;
    contract.secType = 'STK';
    contract.exchange = 'SMART';
    contract.currency = 'USD';

    const orderId = await client.placeOrder(contract, order);
    return {
      id: orderId.toString(),
      symbol,
      type,
      quantity,
      price,
      status: 'PENDING',
      timestamp: new Date(),
    };
  },
};
*/

// ============================================================================
// OPTION 3: POLYGON.IO (Data Only - for charting and analysis)
// ============================================================================

/*
import { RestClient } from '@polygon.io/client-js';

const client = new RestClient(process.env.VITE_POLYGON_API_KEY!);

export const polygonDataAPI = {
  // Get real-time quotes
  getQuote: async (symbol: string) => {
    const quote = await client.stocks.lastQuote(symbol);
    return {
      symbol,
      bid: quote.last_quote.bid,
      ask: quote.last_quote.ask,
      lastPrice: quote.last_quote.last_updated,
    };
  },

  // Get historical bars
  getBars: async (symbol: string, timespan: 'minute' | 'hour' | 'day', limit: number = 100) => {
    const bars = await client.stocks.aggregates(symbol, 1, timespan, {
      limit,
      sort: 'desc',
    });
    return bars.results.map(b => ({
      timestamp: b.t,
      open: b.o,
      high: b.h,
      low: b.l,
      close: b.c,
      volume: b.v,
    }));
  },

  // Get company info
  getCompany: async (symbol: string) => {
    const ticker = await client.reference.tickers(symbol);
    return {
      symbol,
      name: ticker.results[0].name,
      description: ticker.results[0].description,
      sector: ticker.results[0].sic_description,
      url: ticker.results[0].homepage_url,
    };
  },
};
*/

// ============================================================================
// OPTION 4: TWELVE DATA API (Alternative data provider)
// ============================================================================

/*
import { TwelveData } from 'twelvedata';

const td = new TwelveData({
  apiKey: process.env.VITE_TWELVEDATA_API_KEY!,
});

export const twelveDataAPI = {
  // Get quotes
  getQuote: async (symbol: string) => {
    const quote = await td.quote({ symbol });
    return {
      symbol: quote[0].symbol,
      price: parseFloat(quote[0].price),
      change: parseFloat(quote[0].change),
      changePercent: parseFloat(quote[0].percent_change),
    };
  },

  // Get time series data
  getTimeSeries: async (symbol: string, interval: string) => {
    const series = await td.timeSeries({
      symbol,
      interval,
    });
    return series.values;
  },
};
*/

// ============================================================================
// SETUP INSTRUCTIONS
// ============================================================================

/*
1. Choose your broker/data provider:
   - Trading: Alpaca (best for beginners), Interactive Brokers (professional)
   - Data: Polygon.io, Twelve Data, Alpha Vantage
   
2. Install SDK:
   npm install @alpacahq/web-api
   // or
   npm install @polygon.io/client-js
   // or
   npm install twelvedata

3. Get API keys from:
   - Alpaca: https://app.alpaca.markets
   - Polygon.io: https://polygon.io
   - Twelve Data: https://twelvedata.com
   - Interactive Brokers: https://www.interactivebrokers.com

4. Add to .env.local:
   VITE_ALPACA_API_KEY=your_key
   VITE_ALPACA_SECRET_KEY=your_secret
   VITE_POLYGON_API_KEY=your_key
   
5. Import in src/api.ts:
   import { axiomTradingAPI } from './axiom-api';

6. Use in components:
   const account = await axiomTradingAPI.getAccount();
*/

// ============================================================================
// WEBHOOK EXAMPLE (for handling market events)
// ============================================================================

/*
import express from 'express';

const app = express();

// Alpaca event subscription
app.post('/webhooks/alpaca', (req, res) => {
  const event = req.body;
  
  if (event.event === 'fill') {
    console.log(`Order filled: ${event.order.symbol}`);
    // Update UI with new order
  }
  
  if (event.event === 'partial_fill') {
    console.log(`Partial fill: ${event.order.symbol}`);
  }
  
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log('Webhook server running on port 3001');
});
*/

export const AXIOM_CONFIG = {
  description: 'See comments above for integration examples with real trading APIs',
  supported_brokers: ['Alpaca', 'Interactive Brokers', 'Polygon.io', 'Twelve Data'],
  documentation: 'https://docs.alpaca.markets',
};
