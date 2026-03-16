import { useState, useEffect, useCallback, useMemo } from 'react';
import { Stock, PortfolioItem, UserState } from '@/types/stock';
import { INITIAL_STOCKS } from '@/utils/stockData';

export const useStockApp = () => {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [balance, setBalance] = useState<number>(100000000); // 1억 원
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedStockId, setSelectedStockId] = useState<string>(INITIAL_STOCKS[0].id);

  // Load from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('stock-balance');
    const savedPortfolio = localStorage.getItem('stock-portfolio');
    if (savedBalance) setBalance(Number(savedBalance));
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('stock-balance', balance.toString());
    localStorage.setItem('stock-portfolio', JSON.stringify(portfolio));
  }, [balance, portfolio]);

  // Price Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        const volatility = 0.002; // 0.2% max change per tick
        const change = stock.price * (Math.random() - 0.5) * volatility;
        const newPrice = Math.max(1, stock.price + change);
        const newChange = newPrice - INITIAL_STOCKS.find(s => s.id === stock.id)!.price;
        const newChangePercent = (newChange / INITIAL_STOCKS.find(s => s.id === stock.id)!.price) * 100;
        
        // Update 1D history with new price point
        const newHistory = { ...stock.history };
        const now = new Date();
        newHistory['1D'] = [...newHistory['1D'].slice(1), { 
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          price: newPrice 
        }];

        return {
          ...stock,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          history: newHistory
        };
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const buyStock = useCallback((stockId: string, amountInKRW: number) => {
    if (amountInKRW < 1) return alert('최소 1원 이상 거래 가능합니다.');
    if (amountInKRW > balance) return alert('잔액이 부족합니다.');

    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return;

    const quantity = amountInKRW / stock.price;
    
    setBalance(prev => prev - amountInKRW);
    setPortfolio(prev => {
      const existing = prev.find(item => item.stockId === stockId);
      if (existing) {
        const totalAmount = existing.amount + quantity;
        const totalCost = (existing.amount * existing.avgPrice) + amountInKRW;
        return prev.map(item => 
          item.stockId === stockId 
            ? { ...item, amount: totalAmount, avgPrice: totalCost / totalAmount }
            : item
        );
      }
      return [...prev, { stockId, amount: quantity, avgPrice: stock.price }];
    });
  }, [balance, stocks]);

  const sellStock = useCallback((stockId: string, amountInKRW: number) => {
    const existing = portfolio.find(item => item.stockId === stockId);
    const stock = stocks.find(s => s.id === stockId);
    if (!existing || !stock) return alert('보유 중인 주식이 아닙니다.');

    const currentHoldingValue = existing.amount * stock.price;
    if (amountInKRW > currentHoldingValue) return alert('보유 금액보다 많이 팔 수 없습니다.');

    const quantityToSell = amountInKRW / stock.price;
    
    setBalance(prev => prev + amountInKRW);
    setPortfolio(prev => {
      const updated = prev.map(item => 
        item.stockId === stockId 
          ? { ...item, amount: item.amount - quantityToSell }
          : item
      ).filter(item => item.amount > 0.000001);
      return updated;
    });
  }, [portfolio, stocks]);

  const selectedStock = useMemo(() => 
    stocks.find(s => s.id === selectedStockId) || stocks[0]
  , [stocks, selectedStockId]);

  const totalAssets = useMemo(() => {
    const portfolioValue = portfolio.reduce((sum, item) => {
      const stock = stocks.find(s => s.id === item.stockId);
      return sum + (item.amount * (stock?.price || 0));
    }, 0);
    return balance + portfolioValue;
  }, [balance, portfolio, stocks]);

  const totalPL = totalAssets - 100000000;
  const totalPLPercent = (totalPL / 100000000) * 100;

  return {
    stocks,
    balance,
    portfolio,
    selectedStock,
    setSelectedStockId,
    buyStock,
    sellStock,
    totalAssets,
    totalPL,
    totalPLPercent
  };
};
