import React, { useState } from 'react';

interface CompetitorProduct {
  id: string;
  name: string;
  company: string;
  returnRate: {
    month1: number;
    month3: number;
    year1: number;
  };
  fundSize: string;
  summary: string;
}

const competitorProducts: CompetitorProduct[] = [
  {
    id: 'fund1',
    name: 'KB S&P500 인덱스 펀드',
    company: 'KB자산운용',
    returnRate: {
      month1: 3.2,
      month3: 8.5,
      year1: 34.8
    },
    fundSize: '8,520억원',
    summary: '30대 직장인이 가장 많이 보유한 인덱스 펀드'
  },
  {
    id: 'fund2',
    name: '미래에셋 타이거 미국 S&P500',
    company: '미래에셋자산운용',
    returnRate: {
      month1: 3.4,
      month3: 9.1,
      year1: 35.2
    },
    fundSize: '12,350억원',
    summary: '최근 3개월 최고 수익률 기록'
  },
  {
    id: 'fund3',
    name: '삼성 미국 인덱스 펀드',
    company: '삼성자산운용',
    returnRate: {
      month1: 3.1,
      month3: 8.2,
      year1: 34.5
    },
    fundSize: '9,840억원',
    summary: '가장 오래된 미국 주식 인덱스 펀드'
  },
  {
    id: 'fund4',
    name: '한국투자 미국 배당 펀드',
    company: '한국투자신탁운용',
    returnRate: {
      month1: 2.8,
      month3: 7.8,
      year1: 32.9
    },
    fundSize: '4,230억원',
    summary: '안정적인 배당 수익 추구'
  },
  {
    id: 'fund5',
    name: '교보악사 미국 대표주식 펀드',
    company: '교보악사자산운용',
    returnRate: {
      month1: 3.0,
      month3: 8.0,
      year1: 33.8
    },
    fundSize: '3,150억원',
    summary: '적은 비용으로 미국 시장 투자'
  }
];

const ProductComparison: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const currentProduct = {
    id: 'current',
    name: '신한 S&P500 인덱스 펀드',
    company: '신한자산운용',
    returnRate: {
      month1: 3.3,
      month3: 8.7,
      year1: 35.7
    },
    fundSize: '5,266억원',
    summary: '환헤지로 환율 위험 90% 방어'
  };

  const getComparisonData = () => {
    if (!selectedProduct) return null;
    const competitor = competitorProducts.find(p => p.id === selectedProduct);
    if (!competitor) return null;
    return {
      current: currentProduct,
      competitor
    };
  };

  const comparisonData = getComparisonData();

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">상품 비교</h2>
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          비교할 상품 선택
        </p>
        <div className="grid grid-cols-1 gap-2">
          {competitorProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product.id === selectedProduct ? null : product.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedProduct === product.id
                  ? 'border-toss-blue bg-blue-50 text-toss-blue'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.summary}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.returnRate.year1}%</p>
                  <p className="text-sm text-gray-500">1년 수익률</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {comparisonData && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold mb-4">상세 비교</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-lg text-toss-blue mb-2">{comparisonData.current.name}</h3>
              <div className="space-y-3">
                <p><span className="font-medium">운용사:</span> {comparisonData.current.company}</p>
                <p><span className="font-medium">펀드규모:</span> {comparisonData.current.fundSize}</p>
                <div>
                  <p className="font-medium mb-2">수익률</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">1개월</p>
                      <p className="font-medium text-toss-blue">{comparisonData.current.returnRate.month1}%</p>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">3개월</p>
                      <p className="font-medium text-toss-blue">{comparisonData.current.returnRate.month3}%</p>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">1년</p>
                      <p className="font-medium text-toss-blue">{comparisonData.current.returnRate.year1}%</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-white p-2 rounded">{comparisonData.current.summary}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-700 mb-2">{comparisonData.competitor.name}</h3>
              <div className="space-y-3">
                <p><span className="font-medium">운용사:</span> {comparisonData.competitor.company}</p>
                <p><span className="font-medium">펀드규모:</span> {comparisonData.competitor.fundSize}</p>
                <div>
                  <p className="font-medium mb-2">수익률</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">1개월</p>
                      <p className="font-medium">{comparisonData.competitor.returnRate.month1}%</p>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">3개월</p>
                      <p className="font-medium">{comparisonData.competitor.returnRate.month3}%</p>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <p className="text-sm text-gray-600">1년</p>
                      <p className="font-medium">{comparisonData.competitor.returnRate.year1}%</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-white p-2 rounded">{comparisonData.competitor.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparison; 