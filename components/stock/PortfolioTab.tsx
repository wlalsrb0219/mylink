import React from 'react';
import { Stock, PortfolioItem } from '@/types/stock';
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioTabProps {
  portfolio: PortfolioItem[];
  stocks: Stock[];
  selectedStockId: string;
  onSelect: (id: string) => void;
}

const PortfolioTab = ({ portfolio, stocks, selectedStockId, onSelect }: PortfolioTabProps) => {
  if (portfolio.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center glass-card rounded-2xl border-dashed border-border">
        <Briefcase className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
        <div className="text-sm font-bold text-muted-foreground">보유 중인 주식이 없습니다</div>
        <div className="text-xs text-muted-foreground mt-2 opacity-60">마켓 탭에서 주식을 매수해보세요</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-muted-foreground px-2 uppercase tracking-widest">내 포트폴리오</div>
      <div className="space-y-1">
        {portfolio.map(item => {
          const stock = stocks.find(s => s.id === item.stockId);
          if (!stock) return null;

          const currentPrice = stock.price;
          const currentValue = item.amount * currentPrice;
          const totalCost = item.amount * item.avgPrice;
          const pl = currentValue - totalCost;
          const plPercent = (pl / totalCost) * 100;

          return (
            <button
              key={item.stockId}
              onClick={() => onSelect(item.stockId)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${selectedStockId === item.stockId ? 'bg-primary/10 border-primary/30' : 'bg-card border-border hover:border-primary/20'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sm">{stock.name}</div>
                  <div className="text-[10px] text-muted-foreground">{item.amount.toFixed(4)} 주</div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pl >= 0 ? 'bg-up/10 text-up' : 'bg-destructive/10 text-destructive'}`}>
                  {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] text-muted-foreground">
                  평단가: {Math.round(item.avgPrice).toLocaleString()}원
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold">{Math.round(currentValue).toLocaleString()}원</div>
                  <div className={`text-[10px] font-medium ${pl >= 0 ? 'text-up' : 'text-destructive'}`}>
                    {pl >= 0 ? '+' : ''}{Math.round(pl).toLocaleString()}원
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioTab;
