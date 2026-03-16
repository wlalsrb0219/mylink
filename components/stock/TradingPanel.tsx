import React, { useState } from 'react';
import { Stock, PortfolioItem } from '@/types/stock';
import { ArrowUpDown, Minus, Plus } from 'lucide-react';

interface TradingPanelProps {
  stock: Stock;
  balance: number;
  onBuy: (id: string, amount: number) => void;
  onSell: (id: string, amount: number) => void;
  holding?: PortfolioItem;
}

const TradingPanel = ({ stock, balance, onBuy, onSell, holding }: TradingPanelProps) => {
  const [tradeAmount, setTradeAmount] = useState<string>('0');
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');

  const currentHoldingValue = holding ? (holding.amount * stock.price) : 0;
  
  const handleMax = () => {
    if (mode === 'buy') setTradeAmount(Math.floor(balance).toString());
    else setTradeAmount(Math.floor(currentHoldingValue).toString());
  };

  const handlePercentage = (p: number) => {
    const base = mode === 'buy' ? balance : currentHoldingValue;
    setTradeAmount(Math.floor(base * p).toString());
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-primary/20">
      <div className="flex bg-secondary p-1">
        <button
          onClick={() => setMode('buy')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'buy' ? 'bg-background text-primary shadow-lg' : 'text-muted-foreground'}`}
        >
          매수
        </button>
        <button
          onClick={() => setMode('sell')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'sell' ? 'bg-background text-destructive shadow-lg' : 'text-muted-foreground'}`}
        >
          매도
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">주문 금액 (원)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">최소 1원</span>
          </div>
          
          <div className="relative">
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl py-4 px-4 text-2xl font-bold focus:outline-none focus:ring-1 focus:ring-primary text-center"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[0.1, 0.25, 0.5, 1].map(p => (
              <button
                key={p}
                onClick={() => handlePercentage(p)}
                className="py-2 text-[10px] font-bold bg-secondary hover:bg-border rounded-lg text-muted-foreground transition-all"
              >
                {p === 1 ? 'MAX' : `${p * 100}%`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">현재 보유</span>
            <span className="font-bold">{holding ? holding.amount.toFixed(4) : '0'} 주</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">보유 금액</span>
            <span className="font-bold text-primary">{currentHoldingValue.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">주문 가능</span>
            <span className="font-bold">{mode === 'buy' ? balance.toLocaleString() : currentHoldingValue.toLocaleString()} 원</span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => mode === 'buy' ? onBuy(stock.id, Number(tradeAmount)) : onSell(stock.id, Number(tradeAmount))}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all blue-glow ${mode === 'buy' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-destructive text-white hover:bg-destructive/90'}`}
          >
            {stock.name} {mode === 'buy' ? '매수하기' : '매도하기'}
          </button>
          <div className="text-[10px] text-center text-muted-foreground mt-3 italic opacity-60">
            * 거래가 체결되면 즉시 포트폴리오에 반영됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;
