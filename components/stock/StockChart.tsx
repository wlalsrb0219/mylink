"use client";

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PricePoint } from '@/types/stock';

interface StockChartProps {
  history: {
    '1D': PricePoint[];
    '1W': PricePoint[];
    '1M': PricePoint[];
    '1Y': PricePoint[];
    '10Y': PricePoint[];
  };
  color: string;
}

const StockChart = ({ history, color }: StockChartProps) => {
  const [range, setRange] = useState<keyof typeof history>('1D');

  const data = history[range];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-2 justify-end">
        {(['1D', '1W', '1M', '1Y', '10Y'] as const).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${range === r ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            {r}
          </button>
        ))}
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              hide={range !== '1D'} 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['auto', 'auto']} 
              hide 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: color }}
              labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
              formatter={(value: any) => [Number(value || 0).toLocaleString() + '원', '가격']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
