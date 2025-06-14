import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

interface ReturnRatesProps {
  returnData: {
    class: string;
    yearReturn: number;
    setupReturn: number;
  }[];
  benchmarkReturn: number;
}

const ReturnRates: React.FC<ReturnRatesProps> = ({ returnData, benchmarkReturn }) => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">수익률 현황 (기준: 2024.10.31)</h2>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={returnData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="class" />
            <YAxis 
              domain={[0, Math.ceil(Math.max(...returnData.map(d => d.yearReturn), benchmarkReturn) / 5) * 5]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, '최근 1년 수익률']}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            />
            <Bar dataKey="yearReturn" fill="#3182f6" radius={[4, 4, 0, 0]} />
            <ReferenceLine y={benchmarkReturn} stroke="#ff5252" strokeDasharray="5 5" 
              label={{ 
                value: `S&P500: ${benchmarkReturn}%`, 
                position: 'right',
                fill: '#ff5252',
                fontSize: 12
              }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-toss-black mb-2">클래스별 수익률</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {returnData.map((item) => (
            <div key={item.class} className="bg-toss-gray-light rounded-lg p-3">
              <p className="text-sm font-medium">{item.class}</p>
              <div className="flex justify-between mt-2">
                <p className="text-xs text-toss-gray">최근 1년</p>
                <p className="text-sm font-medium text-toss-blue">{item.yearReturn}%</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-toss-gray">설정일 이후</p>
                <p className="text-sm font-medium">{item.setupReturn}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-toss-gray mt-4">
        ※ 연환산 기준 / 실제 수익률은 시장상황에 따라 달라질 수 있음
      </p>
    </div>
  );
};

export default ReturnRates; 