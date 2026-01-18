import axios from 'axios';

const API_BASE = 'https://txm.fullynerfed.workers.dev';
const LICENSE_API = 'https://license-backend.fullynerfed.workers.dev';

// Alpha Vantage API for free stock data
const ALPHA_VANTAGE_KEY = 'demo'; // Replace with real key
const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post('/login', { email, password });
    return res.data;
  },
  
  getLicense: async (email: string) => {
    const res = await axios.get(`${LICENSE_API}/licenses`);
    return res.data.find((l: any) => l.email === email);
  },
};

// Stock Data APIs
export const stockAPI = {
  // Get current price using Alpha Vantage
  getPrice: async (symbol: string) => {
    try {
      const res = await axios.get(ALPHA_VANTAGE_BASE, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: ALPHA_VANTAGE_KEY,
        },
      });
      
      const data = res.data['Global Quote'];
      if (!data || !data['05. price']) {
        // Fallback mock data
        return generateMockPrice(symbol);
      }
      
      return {
        symbol,
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change'] || 0),
        changePercent: parseFloat(data['10. change percent']?.replace('%', '') || 0),
      };
    } catch (err) {
      console.error('Stock API error:', err);
      return generateMockPrice(symbol);
    }
  },

  // Get intraday data
  getIntraday: async (symbol: string) => {
    try {
      const res = await axios.get(ALPHA_VANTAGE_BASE, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval: '15min',
          apikey: ALPHA_VANTAGE_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error('Intraday data error:', err);
      return null;
    }
  },

  // Get daily data
  getDaily: async (symbol: string) => {
    try {
      const res = await axios.get(ALPHA_VANTAGE_BASE, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol,
          apikey: ALPHA_VANTAGE_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error('Daily data error:', err);
      return null;
    }
  },
};

// Trading APIs (simulated - integrate with real broker like Alpaca, Interactive Brokers)
export const tradingAPI = {
  placeOrder: async (symbol: string, quantity: number, price: number, type: 'BUY' | 'SELL') => {
    // Simulate order placement
    return {
      id: Math.random().toString(36).substring(7),
      symbol,
      type,
      quantity,
      price,
      status: 'PENDING',
      timestamp: new Date(),
    };
  },

  getPortfolio: async () => {
    // Simulate portfolio fetch
    return {
      cash: 85000,
      totalValue: 125000,
      buyingPower: 85000,
      positions: [
        { symbol: 'AAPL', quantity: 50, averagePrice: 150, currentPrice: 195, value: 9750, gain: 2250, gainPercent: 30 },
        { symbol: 'GOOGL', quantity: 20, averagePrice: 100, currentPrice: 140, value: 2800, gain: 800, gainPercent: 40 },
      ],
      orders: [],
    };
  },

  cancelOrder: async (orderId: string) => {
    return { success: true, orderId };
  },
};

// Helper function to generate mock data
function generateMockPrice(symbol: string) {
  const basePrices: Record<string, number> = {
    AAPL: 195,
    GOOGL: 140,
    MSFT: 380,
    TSLA: 245,
    NVDA: 875,
    AMZN: 175,
    META: 475,
    NFLX: 445,
    PYPL: 82,
    UBER: 72,
  };

  const basePrice = basePrices[symbol] || Math.random() * 500;
  const change = (Math.random() - 0.5) * 20;
  const changePercent = (change / basePrice) * 100;

  return {
    symbol,
    name: symbol,
    price: parseFloat((basePrice + change).toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
  };
}
