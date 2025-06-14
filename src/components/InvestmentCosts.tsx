import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InvestmentCostsProps {
  costs: {
    class: string;
    salesFee: string;
    totalFee: string;
    threeYearCost: string;
  }[];
}

const InvestmentCosts: React.FC<InvestmentCostsProps> = ({ costs }) => {
  // 누적 비용 시뮬레이션 데이터 생성
  const generateCumulativeData = () => {
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    return years.map(year => {
      const data: {[key: string]: any} = { year: `${year}년` };
      
      costs.forEach(cost => {
        const feeRate = parseFloat(cost.totalFee.replace('%', '')) / 100;
        // 가정: 1000만원 초기 투자, 수익률 5%, 비용은 매년 자산의 일정 비율
        // 판매수수료가 있는 경우 초기에 적용
        const salesFeeRate = parseFloat(cost.salesFee.replace(/[^0-9.]/g, '') || '0') / 100;
        
        // 판매수수료를 제외한 초기 투자금
        let initialAmount = 10000000 * (1 - salesFeeRate);
        
        // 5% 수익률과 연간 보수를 고려한 누적 금액
        let amount = initialAmount;
        for (let i = 0; i < year; i++) {
          amount = amount * (1 + 0.05 - feeRate);
        }
        
        // 초기 투자금과의 차이가 비용
        const totalCost = 10000000 - amount;
        
        // 천 단위로 변환 (천원)
        data[cost.class] = Math.round(totalCost / 1000);
      });
      
      return data;
    });
  };

  const cumulativeData = generateCumulativeData();
  
  // 교차 시점 계산
  const getCrossPoint = (class1: string, class2: string) => {
    const fee1 = parseFloat(costs.find(c => c.class === class1)?.totalFee.replace('%', '') || '0');
    const fee2 = parseFloat(costs.find(c => c.class === class2)?.totalFee.replace('%', '') || '0');
    const salesFee1 = parseFloat(costs.find(c => c.class === class1)?.salesFee.replace(/[^0-9.]/g, '') || '0');
    const salesFee2 = parseFloat(costs.find(c => c.class === class2)?.salesFee.replace(/[^0-9.]/g, '') || '0');
    
    // 판매수수료 차이와 연간 보수 차이를 이용하여 손익분기점 계산
    // 판매수수료(A) = 누적보수차이(C-A) * X년
    const annualFeeDiff = fee2 - fee1;
    if (annualFeeDiff === 0) return '교차 안됨';
    
    const years = salesFee1 / (annualFeeDiff / 100);
    
    if (years < 0) return '교차 안됨';
    if (years > 20) return '20년 이상';
    
    const yearsPart = Math.floor(years);
    const monthsPart = Math.round((years - yearsPart) * 12);
    
    if (monthsPart === 0) {
      return `약 ${yearsPart}년`;
    } else {
      return `약 ${yearsPart}년 ${monthsPart}개월`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">투자비용 요약</h2>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-toss-gray-light text-left text-xs font-medium text-toss-gray-dark uppercase tracking-wider">클래스</th>
              <th className="px-4 py-3 bg-toss-gray-light text-left text-xs font-medium text-toss-gray-dark uppercase tracking-wider">판매수수료</th>
              <th className="px-4 py-3 bg-toss-gray-light text-left text-xs font-medium text-toss-gray-dark uppercase tracking-wider">총보수</th>
              <th className="px-4 py-3 bg-toss-gray-light text-left text-xs font-medium text-toss-gray-dark uppercase tracking-wider">3년 총비용</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {costs.map((cost, index) => (
              <tr key={cost.class} className={index % 2 === 0 ? 'bg-white' : 'bg-toss-gray-light'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-toss-black">{cost.class}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-toss-gray-dark">{cost.salesFee}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-toss-gray-dark">{cost.totalFee}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-toss-gray-dark">{cost.threeYearCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="h-72 mb-6">
        <h3 className="text-sm font-medium text-toss-black mb-2">누적 비용 시뮬레이션 (1천만원 투자 가정)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              tickFormatter={(value) => `${value}천원`}
            />
            <Tooltip 
              formatter={(value) => [`${value}천원`, '총비용']}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            />
            <Legend />
            {costs.map((cost, index) => (
              <Line 
                key={cost.class}
                type="monotone" 
                dataKey={cost.class} 
                stroke={
                  index === 0 ? '#3182f6' : 
                  index === 1 ? '#ff5252' : 
                  index === 2 ? '#4dabf7' : 
                  '#ff9800'
                } 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-toss-gray-light rounded-lg p-4">
          <h3 className="text-sm font-medium text-toss-black mb-2">비용 교차 시점</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">A1 vs C1</p>
              <p className="text-sm font-medium">{getCrossPoint('A1', 'C1')}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">A-e vs C-e</p>
              <p className="text-sm font-medium">{getCrossPoint('A-e', 'C-e')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-toss-blue-light rounded-lg p-4">
          <h3 className="text-sm font-medium text-toss-blue mb-2">투자 조언</h3>
          <p className="text-sm text-toss-gray-dark">
            장기 투자(3년 이상)를 계획하고 있다면 판매수수료가 있지만 총보수가 낮은 A 클래스가 유리할 수 있습니다.
          </p>
        </div>
      </div>
      
      <p className="text-xs text-toss-gray">
        ※ 수익률 5% 가정, 세후 기준 아님
      </p>
    </div>
  );
};

export default InvestmentCosts; 