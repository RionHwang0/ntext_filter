import React from 'react';

interface FundOverviewProps {
  fund: {
    name: string;
    code: string;
    setupDate: string;
    manager: string;
    type: string;
    index: string;
    riskLevel: string;
    protection: string;
  };
}

const FundOverview: React.FC<FundOverviewProps> = ({ fund }) => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">펀드 개요</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">펀드코드</p>
            <p className="text-sm font-medium text-toss-black">{fund.code}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">운용사</p>
            <p className="text-sm font-medium text-toss-black">{fund.manager}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">추종지수</p>
            <p className="text-sm font-medium text-toss-black">{fund.index}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">투자유형</p>
            <p className="text-sm font-medium text-toss-black">{fund.type}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">위험등급</p>
            <p className="text-sm font-medium text-toss-black">{fund.riskLevel}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-toss-gray mb-1">예금보호여부</p>
            <p className="text-sm font-medium text-toss-black">{fund.protection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundOverview; 