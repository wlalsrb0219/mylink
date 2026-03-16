import { Stock, PricePoint, Market } from "@/types/stock";

const generateHistory = (currentPrice: number, points: number, volatility: number): PricePoint[] => {
  const history: PricePoint[] = [];
  let lastPrice = currentPrice;
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000 * (points > 100 ? 60 : 1)); // Simplified time
    const change = lastPrice * (Math.random() - 0.5) * volatility;
    lastPrice = lastPrice + change;
    history.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Math.max(1, lastPrice)
    });
  }
  return history;
};

const INITIAL_STOCKS_RAW = [
  // KR Stocks
  { id: 'kr-samsung', name: '삼성전자', symbol: '005930', market: 'KR', price: 72500, change: 500, changePercent: 0.69, history: null as any },
  { id: 'kr-skhynix', name: 'SK하이닉스', symbol: '000660', market: 'KR', price: 185000, change: -1200, changePercent: -0.64, history: null as any },
  { id: 'kr-lgenergy', name: 'LG에너지솔루션', symbol: '373220', market: 'KR', price: 380000, change: 5000, changePercent: 1.33, history: null as any },
  { id: 'kr-samsungbio', name: '삼성바이오로직스', symbol: '207940', market: 'KR', price: 780000, change: -2000, changePercent: -0.26, history: null as any },
  { id: 'kr-hyundai', name: '현대자동차', symbol: '005380', market: 'KR', price: 245000, change: 3000, changePercent: 1.24, history: null as any },
  { id: 'kr-celltrion', name: '셀트리온', symbol: '068270', market: 'KR', price: 178000, change: 1500, changePercent: 0.85, history: null as any },
  { id: 'kr-kia', name: '기아', symbol: '000270', market: 'KR', price: 112000, change: -500, changePercent: -0.44, history: null as any },
  { id: 'kr-naver', name: 'NAVER', symbol: '035420', market: 'KR', price: 185000, change: 0, changePercent: 0, history: null as any },
  { id: 'kr-kakao', name: '카카오', symbol: '035720', market: 'KR', price: 48000, change: -300, changePercent: -0.62, history: null as any },
  { id: 'kr-posco', name: 'POSCO홀딩스', symbol: '005490', market: 'KR', price: 395000, change: 1000, changePercent: 0.25, history: null as any },
  
  // US Stocks
  { id: 'us-apple', name: 'Apple', symbol: 'AAPL', market: 'US', price: 245000, change: 2500, changePercent: 1.03, history: null as any },
  { id: 'us-msft', name: 'Microsoft', symbol: 'MSFT', market: 'US', price: 560000, change: -4500, changePercent: -0.8, history: null as any },
  { id: 'us-nvda', name: 'NVIDIA', symbol: 'NVDA', market: 'US', price: 1250000, change: 45000, changePercent: 3.73, history: null as any },
  { id: 'us-amzn', name: 'Amazon', symbol: 'AMZN', market: 'US', price: 250000, change: 1200, changePercent: 0.48, history: null as any },
  { id: 'us-googl', name: 'Google', symbol: 'GOOGL', market: 'US', price: 220000, change: -1500, changePercent: -0.68, history: null as any },
  { id: 'us-meta', name: 'Meta', symbol: 'META', market: 'US', price: 650000, change: 12000, changePercent: 1.88, history: null as any },
  { id: 'us-tsla', name: 'Tesla', symbol: 'TSLA', market: 'US', price: 240000, change: -8000, changePercent: -3.23, history: null as any },
  { id: 'us-brk', name: 'Berkshire', symbol: 'BRK.B', market: 'US', price: 580000, change: 2000, changePercent: 0.35, history: null as any },
  { id: 'us-lly', name: 'Eli Lilly', symbol: 'LLY', market: 'US', price: 1150000, change: 5000, changePercent: 0.44, history: null as any },
  { id: 'us-avgo', name: 'Broadcom', symbol: 'AVGO', market: 'US', price: 1850000, change: -12000, changePercent: -0.64, history: null as any },
] as const;

export const INITIAL_STOCKS: Stock[] = INITIAL_STOCKS_RAW.map(stock => ({
  ...stock,
  market: stock.market as Market,
  history: {
    '1D': generateHistory(stock.price, 24, 0.02),
    '1W': generateHistory(stock.price, 7, 0.05),
    '1M': generateHistory(stock.price, 30, 0.1),
    '1Y': generateHistory(stock.price, 52, 0.3),
    '10Y': generateHistory(stock.price, 120, 0.8),
  }
}));
