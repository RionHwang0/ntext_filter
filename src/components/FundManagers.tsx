import React from 'react';

interface Manager {
  name: string;
  position: string;
  amount: string;
  performance: string;
}

interface FundManagersProps {
  managers: Manager[];
}

const FundManagers: React.FC<FundManagersProps> = ({ managers }) => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">운용인력 정보</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managers.map((manager, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            {/* 운용역 프로필 */}
            <div className="flex items-start mb-4">
              <div className="w-14 h-14 bg-toss-blue-light rounded-full flex items-center justify-center text-toss-blue mr-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-toss-black">{manager.name}</h3>
                <p className="text-sm text-toss-gray">{manager.position}</p>
              </div>
            </div>
            
            {/* 운용 실적 정보 */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-toss-blue-light rounded-full flex items-center justify-center text-toss-blue mr-3">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-toss-gray">운용규모</p>
                  <p className="text-sm font-medium text-toss-black">{manager.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-toss-blue-light rounded-full flex items-center justify-center text-toss-blue mr-3">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-toss-gray">최근 1년 수익률</p>
                  <p className="text-sm font-medium text-toss-blue">{manager.performance}</p>
                </div>
              </div>
            </div>
            
            {/* 펀드 운용 경력 타임라인 */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-toss-black mb-2">운용 경력</h4>
              <div className="relative pl-6 space-y-3">
                {/* 타임라인 선 */}
                <div className="absolute top-0 bottom-0 left-2 border-l-2 border-toss-gray-light"></div>
                
                <div className="relative">
                  <div className="absolute top-1 left-[-20px] w-4 h-4 rounded-full bg-toss-blue"></div>
                  <p className="text-xs text-toss-gray">2022.07 ~ 현재</p>
                  <p className="text-sm">퀀트운용센터</p>
                </div>
                
                <div className="relative">
                  <div className="absolute top-1 left-[-20px] w-4 h-4 rounded-full bg-toss-gray"></div>
                  <p className="text-xs text-toss-gray">2020.01 ~ 2022.06</p>
                  <p className="text-sm">해외주식운용팀</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-toss-gray mt-4">
        ※ 퀀트운용센터 소속 / 운용 실적은 시장상황에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
};

export default FundManagers; 