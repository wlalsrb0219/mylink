import React, { useState } from 'react';
import { Stock } from '@/types/stock';
import { Search } from 'lucide-react';

interface StockListProps {
  stocks: Stock[];
  selectedStockId: string;
  onSelect: (id: string) => void;
}

const StockList = ({ stocks, selectedStockId, onSelect }: StockListProps) => {
  const [marketFilter, setMarketFilter] = useState<'ALL' | 'KR' | 'US'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stocks.filter(s => {
    const matchesMarket = marketFilter === 'ALL' || s.market === marketFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMarket && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="종목명 또는 심볼 검색"
          className="w-full bg-secondary border border-border rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2 p-1 bg-secondary rounded-lg">
        {(['ALL', 'KR', 'US'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMarketFilter(m)}
            className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${marketFilter === m ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {m === 'ALL' ? '전체' : m === 'KR' ? '국내' : '해외'}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {filteredStocks.map(stock => (
          <button
            key={stock.id}
            onClick={() => onSelect(stock.id)}
            className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${selectedStockId === stock.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary/50 border border-transparent'}`}
          >
            <div>
              <div className="font-bold text-sm group-hover:text-primary transition-colors">{stock.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-tight">{stock.symbol}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{stock.price.toLocaleString()}</div>
              <div className={`text-[10px] font-medium ${stock.change >= 0 ? 'text-up' : 'text-destructive'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockList;
