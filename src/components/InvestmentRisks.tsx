import React, { useState } from 'react';

interface Risk {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InvestmentRisks: React.FC = () => {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  
  const risks: Risk[] = [
    {
      id: 'principal',
      title: '원본손실',
      description: '원금 비보장 / 손실 발생 가능합니다. 투자 원금의 전부 또는 일부 손실 위험이 있으며, 투자금액의 손실 내지 감소의 위험은 투자자가 부담합니다.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'market',
      title: '가격 변동 위험',
      description: '증권 발행사 이슈, 미국 시장 상황이 반영됩니다. 투자신탁재산을 미국 주식 관련 집합투자증권 등에 투자함으로써 증권의 가격변동, 이자율, 환율변동 등 기타 거시경제지표의 변화에 따른 위험에 노출됩니다.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      )
    },
    {
      id: 'derivative',
      title: '파생상품 위험',
      description: '레버리지로 인한 변동성 확대 가능성이 있습니다. 파생상품은 적은 증거금으로 거액의 결제가 가능한 지렛대효과(레버리지)로 인하여 기초자산에 직접 투자하는 경우에 비하여 높은 위험에 노출될 수 있습니다.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'country',
      title: '국가 위험',
      description: '정책, 정치, 유동성 등 미국 내외 이슈가 영향을 미칠 수 있습니다. 이 투자신탁은 해외에 투자할 수 있기 때문에 투자대상국가의 시장, 정치 및 경제상황 등에 따른 위험에 매우 많이 노출될 수 있습니다.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    },
    {
      id: 'currency',
      title: '환율 위험',
      description: 'USD/KRW 변동 노출 → 부분 환헤지(90%) 적용됩니다. 이 투자신탁은 해외투자시 환율변동에 노출되며, 환율변동 위험을 헤지하기 위해 환헤지를 실시하지만 환율변동 위험을 완전히 제거할 수는 없습니다.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  const handleRiskClick = (id: string) => {
    if (expandedRisk === id) {
      setExpandedRisk(null);
    } else {
      setExpandedRisk(id);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">투자위험 요약</h2>
      
      <div className="relative">
        {/* 중앙 원형 (핵심 위험) */}
        <div className="hidden md:flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-toss-blue flex items-center justify-center text-white font-medium">
            핵심 위험
          </div>
          
          {/* 연결선 */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-full flex justify-between pointer-events-none">
            <div className="border-t-2 border-dashed border-toss-gray w-1/2"></div>
            <div className="border-t-2 border-dashed border-toss-gray w-1/2"></div>
          </div>
        </div>
        
        {/* 아코디언 형태의 위험 요소 */}
        <div className="space-y-3">
          {risks.map((risk) => (
            <div 
              key={risk.id}
              className={`border rounded-lg transition-colors cursor-pointer
                ${expandedRisk === risk.id ? 'border-toss-blue bg-toss-blue-light' : 'border-gray-200 hover:border-toss-blue'}`}
              onClick={() => handleRiskClick(risk.id)}
            >
              <div className="flex items-center p-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${expandedRisk === risk.id ? 'bg-toss-blue text-white' : 'bg-toss-gray-light text-toss-gray-dark'}`}>
                  {risk.icon}
                </div>
                <div className="flex-grow">
                  <h3 className={`font-medium ${expandedRisk === risk.id ? 'text-toss-blue' : 'text-toss-black'}`}>
                    {risk.title}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <svg 
                    className={`h-5 w-5 transition-transform ${expandedRisk === risk.id ? 'transform rotate-180 text-toss-blue' : 'text-toss-gray'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedRisk === risk.id && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pl-12">
                    <p className="text-sm text-toss-gray-dark">{risk.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 bg-toss-gray-light p-4 rounded-lg">
        <p className="text-sm text-toss-gray-dark">
          <span className="font-medium">주의: </span>
          위 내용은 주요 투자위험을 요약한 것으로, 자세한 사항은 투자설명서를 참고하시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default InvestmentRisks; 