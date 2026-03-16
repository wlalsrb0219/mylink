export type Market = 'KR' | 'US';

export interface Stock {
  id: string;
  name: string;
  symbol: string;
  market: Market;
  price: number;
  change: number;
  changePercent: number;
  history: {
    '1D': PricePoint[];
    '1W': PricePoint[];
    '1M': PricePoint[];
    '1Y': PricePoint[];
    '10Y': PricePoint[];
  };
}

export interface PricePoint {
  time: string;
  price: number;
}

export interface PortfolioItem {
  stockId: string;
  amount: number; // Quantity
  avgPrice: number;
}

export interface UserState {
  balance: number;
  portfolio: PortfolioItem[];
}
