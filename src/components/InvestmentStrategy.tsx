import React from 'react';

const InvestmentStrategy: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">투자 전략 요약</h2>
      
      <div className="relative">
        {/* 플로우 차트 */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="bg-toss-blue-light text-toss-blue rounded-lg px-4 py-3 text-center mb-4 md:mb-0 w-full md:w-auto">
            <p className="font-medium">투자자</p>
          </div>
          
          {/* 화살표 (모바일에서는 세로, 데스크탑에서는 가로) */}
          <div className="hidden md:block text-toss-gray mx-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="block md:hidden text-toss-gray my-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          <div className="bg-toss-blue-light text-toss-blue rounded-lg px-4 py-3 text-center mb-4 md:mb-0 w-full md:w-auto">
            <p className="font-medium">자투자신탁</p>
            <p className="text-xs mt-1">(50% 이상 모투자신탁에 투자)</p>
          </div>
          
          {/* 화살표 */}
          <div className="hidden md:block text-toss-gray mx-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="block md:hidden text-toss-gray my-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          <div className="bg-toss-blue-light text-toss-blue rounded-lg px-4 py-3 text-center mb-4 md:mb-0 w-full md:w-auto">
            <p className="font-medium">모투자신탁</p>
            <p className="text-xs mt-1">(S&P500 수익률 추종)</p>
          </div>
          
          {/* 화살표 */}
          <div className="hidden md:block text-toss-gray mx-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="block md:hidden text-toss-gray my-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          <div className="bg-toss-blue-light text-toss-blue rounded-lg px-4 py-3 text-center mb-4 md:mb-0 w-full md:w-auto">
            <p className="font-medium">미국 주식/파생상품</p>
          </div>
          
          {/* 화살표 */}
          <div className="hidden md:block text-toss-gray mx-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="block md:hidden text-toss-gray my-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          <div className="bg-toss-blue text-white rounded-lg px-4 py-3 text-center w-full md:w-auto">
            <p className="font-medium">수익 발생</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-toss-gray-light p-4 rounded-lg">
        <p className="text-sm text-toss-gray-dark">
          <span className="font-medium">주의: </span>
          운용성과는 보장되지 않으며, 자산 가격 변동에 따라 손실이 발생할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default InvestmentStrategy; 