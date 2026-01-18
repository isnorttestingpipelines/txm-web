import { create } from 'zustand';

export interface User {
  email: string;
  token?: string;
  apiKey?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'PENDING' | 'FILLED' | 'CANCELLED';
  timestamp: Date;
}

export interface PortfolioPosition {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  gain: number;
  gainPercent: number;
}

export interface PortfolioData {
  cash: number;
  totalValue: number;
  positions: PortfolioPosition[];
  orders: Order[];
  buyingPower: number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setApiKey: (key: string) => void;
}

interface TradingStore {
  portfolio: PortfolioData;
  stocks: Map<string, Stock>;
  watchlist: string[];
  selectedStock: Stock | null;
  
  // Actions
  updatePortfolio: (data: PortfolioData) => void;
  updateStock: (stock: Stock) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  setSelectedStock: (stock: Stock | null) => void;
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('txm_user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('txm_user');
  },
  setApiKey: (apiKey) => {
    set((state) => ({
      user: state.user ? { ...state.user, apiKey } : null,
    }));
  },
}));

export const useTradingStore = create<TradingStore>((set) => ({
  portfolio: {
    cash: 100000,
    totalValue: 100000,
    positions: [],
    orders: [],
    buyingPower: 100000,
  },
  stocks: new Map(),
  watchlist: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA'],
  selectedStock: null,
  
  updatePortfolio: (data) => set({ portfolio: data }),
  updateStock: (stock) =>
    set((state) => ({
      stocks: new Map(state.stocks).set(stock.symbol, stock),
    })),
  addToWatchlist: (symbol) =>
    set((state) => ({
      watchlist: [...new Set([...state.watchlist, symbol])],
    })),
  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    })),
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  addOrder: (order) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        orders: [order, ...state.portfolio.orders],
      },
    })),
}));
