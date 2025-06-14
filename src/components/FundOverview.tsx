import React, { useState, useRef, useEffect } from 'react';

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
  const [showSP500Info, setShowSP500Info] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  const sp500Ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSP500Click = () => {
    if (sp500Ref.current && containerRef.current) {
      const spanRect = sp500Ref.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // 화면 중앙을 기준으로 왼쪽/오른쪽 결정
      const isLeftSide = spanRect.left < window.innerWidth / 2;
      
      setTooltipPosition({
        x: spanRect.left - containerRect.left + spanRect.width / 2,
        y: spanRect.top - containerRect.top + spanRect.height / 2,
        side: isLeftSide ? 'right' : 'left'
      });
      
      setShowSP500Info(!showSP500Info);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sp500Ref.current && !sp500Ref.current.contains(event.target as Node)) {
        setShowSP500Info(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIndexWithClickable = (index: string) => {
    if (index.includes('S&P500')) {
      return (
        <>
          <span 
            ref={sp500Ref}
            className="underline decoration-2 decoration-orange-400 cursor-pointer hover:decoration-orange-600 transition-colors"
            onClick={handleSP500Click}
            style={{
              textDecorationStyle: 'wavy',
              textUnderlineOffset: '3px'
            }}
          >
            S&P500
          </span>
          <span> (USD 기준)</span>
        </>
      );
    }
    return index;
  };

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-toss p-6 mb-8 relative">
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
            <p className="text-sm font-medium text-toss-black">
              {renderIndexWithClickable(fund.index)}
            </p>
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

      {/* S&P 500 설명 툴팁 */}
      {showSP500Info && (
        <>
          {/* 색연필 스타일 동그라미 */}
          <div 
            className="absolute pointer-events-none z-20"
            style={{
              left: tooltipPosition.x - 25,
              top: tooltipPosition.y - 25,
              width: '50px',
              height: '50px'
            }}
          >
            <svg 
              className="w-full h-full animate-pulse" 
              viewBox="0 0 50 50"
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(255, 165, 0, 0.3))'
              }}
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#ff9500"
                strokeWidth="3"
                strokeDasharray="5,3"
                strokeLinecap="round"
                className="animate-spin"
                style={{
                  animationDuration: '4s',
                  transformOrigin: 'center'
                }}
              />
            </svg>
          </div>

          {/* 연결선 */}
          <svg 
            className="absolute pointer-events-none z-10" 
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#ff9500"
                />
              </marker>
            </defs>
            <path
              d={`M ${tooltipPosition.x} ${tooltipPosition.y} 
                  Q ${tooltipPosition.x + (tooltipPosition.side === 'right' ? 50 : -50)} ${tooltipPosition.y - 20} 
                  ${tooltipPosition.x + (tooltipPosition.side === 'right' ? 100 : -100)} ${tooltipPosition.y - 40}`}
              stroke="#ff9500"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,3"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
              style={{
                filter: 'drop-shadow(1px 1px 2px rgba(255, 165, 0, 0.3))'
              }}
            />
          </svg>

          {/* 설명 박스 */}
          <div 
            className={`absolute z-30 w-80 bg-white rounded-lg shadow-xl border-2 border-orange-200 p-4 transform transition-all duration-300 ease-out ${
              showSP500Info ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{
              left: tooltipPosition.side === 'right' 
                ? tooltipPosition.x + 120 
                : tooltipPosition.x - 400,
              top: tooltipPosition.y - 80,
              background: 'linear-gradient(135deg, #fff8f0 0%, #ffffff 100%)',
              boxShadow: '0 10px 25px rgba(255, 165, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="relative">
              {/* 제목 */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">S&P 500이란?</h3>
              </div>

              {/* 설명 내용 */}
              <div className="space-y-3 text-sm text-gray-700">
                <p className="leading-relaxed">
                  <strong className="text-orange-600">미국 대표 500개 기업</strong>을 시가총액 기준으로 선별한 주가지수입니다.
                </p>
                
                <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-200">
                  <p className="font-medium text-orange-800 mb-2">포함 기업 예시:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>• 애플 (Apple)</span>
                    <span>• 마이크로소프트</span>
                    <span>• 아마존 (Amazon)</span>
                    <span>• 테슬라 (Tesla)</span>
                    <span>• 구글 (Alphabet)</span>
                    <span>• 메타 (Meta)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>미국 주식시장 전체의 약 <strong>80%</strong>를 대표</p>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p>장기적으로 연평균 <strong>10% 내외</strong>의 수익률 기록</p>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={() => setShowSP500Info(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FundOverview; 