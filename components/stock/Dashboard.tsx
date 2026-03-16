"use client";

import React, { useState, useEffect } from 'react';
import { useStockApp } from '@/hooks/useStockApp';
import StockList from './StockList';
import StockChart from './StockChart';
import TradingPanel from './TradingPanel';
import PortfolioTab from './PortfolioTab';
import { TrendingUp, TrendingDown, Wallet, LayoutDashboard, PieChart } from 'lucide-react';

const Dashboard = () => {
  const { 
    stocks, balance, portfolio, selectedStock, setSelectedStockId,
    buyStock, sellStock, totalAssets, totalPL, totalPLPercent 
  } = useStockApp();

  const [activeTab, setActiveTab] = useState<'market' | 'portfolio'>('market');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center blue-glow">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
              BLUE STOCK
            </h1>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-end">
              <span className="text-muted-foreground text-xs">총 자산</span>
              <span className="font-bold">{totalAssets.toLocaleString()}원</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-muted-foreground text-xs">수익률</span>
              <span className={`font-bold ${totalPL >= 0 ? 'text-up' : 'text-destructive'}`}>
                {totalPL >= 0 ? '+' : ''}{totalPL.toLocaleString()}원 ({totalPLPercent.toFixed(2)}%)
              </span>
            </div>
            <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block" />
            <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full border border-border">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="font-medium">{balance.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (Desktop) / Tabs (Mobile) */}
        <div className="lg:col-span-1 flex lg:flex-col gap-4">
          <button 
            onClick={() => setActiveTab('market')}
            className={`flex-1 lg:flex-none p-3 rounded-xl flex items-center justify-center transition-all ${activeTab === 'market' ? 'bg-primary text-white blue-glow' : 'hover:bg-secondary text-muted-foreground'}`}
          >
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 lg:flex-none p-3 rounded-xl flex items-center justify-center transition-all ${activeTab === 'portfolio' ? 'bg-primary text-white blue-glow' : 'hover:bg-secondary text-muted-foreground'}`}
          >
            <PieChart className="w-6 h-6" />
          </button>
        </div>

        {/* Left Column: List or Portfolio */}
        <div className="lg:col-span-3 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
          {activeTab === 'market' ? (
            <StockList 
              stocks={stocks} 
              selectedStockId={selectedStock.id} 
              onSelect={setSelectedStockId} 
            />
          ) : (
            <PortfolioTab 
              portfolio={portfolio} 
              stocks={stocks} 
              onSelect={setSelectedStockId} 
              selectedStockId={selectedStock.id}
            />
          )}
        </div>

        {/* Center: Chart & Detail */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-secondary text-primary border border-primary/20">
                    {selectedStock.market === 'KR' ? 'KOSPI' : 'NASDAQ'}
                  </span>
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">{selectedStock.symbol}</span>
                </div>
                <h2 className="text-2xl font-bold">{selectedStock.name}</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-tight">
                  {selectedStock.price.toLocaleString()}원
                </div>
                <div className={`text-sm font-medium ${selectedStock.change >= 0 ? 'text-up' : 'text-destructive'}`}>
                  {selectedStock.change >= 0 ? '▲' : '▼'} {Math.abs(selectedStock.change).toLocaleString()} ({selectedStock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <StockChart history={selectedStock.history} color={selectedStock.change >= 0 ? '#00d4ff' : '#ef4444'} />
            </div>
          </div>
        </div>

        {/* Right: Trading Panel */}
        <div className="lg:col-span-3">
          <TradingPanel 
            stock={selectedStock} 
            balance={balance} 
            onBuy={buyStock} 
            onSell={sellStock}
            holding={portfolio.find(p => p.stockId === selectedStock.id)}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
