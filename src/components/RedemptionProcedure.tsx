import React from 'react';

const RedemptionProcedure: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">가입 및 환매 절차</h2>
      
      <div className="relative pb-8">
        {/* 스텝퍼 - 가입 절차 */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-toss-black mb-4">가입 절차</h3>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="relative flex flex-col items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-toss-blue text-white flex items-center justify-center mb-2 z-10">
                <span className="font-medium">1</span>
              </div>
              <p className="text-sm text-center">가입 신청</p>
              <div className="absolute top-6 left-12 hidden md:block w-full h-0.5 bg-toss-blue-light"></div>
            </div>
            
            <div className="relative flex flex-col items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-toss-blue text-white flex items-center justify-center mb-2 z-10">
                <span className="font-medium">2</span>
              </div>
              <p className="text-sm text-center">기준가격 적용</p>
              <div className="absolute top-6 left-12 hidden md:block w-full h-0.5 bg-toss-blue-light"></div>
            </div>
            
            <div className="relative flex flex-col items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-toss-blue text-white flex items-center justify-center mb-2 z-10">
                <span className="font-medium">3</span>
              </div>
              <p className="text-sm text-center">자금 납입</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-toss-blue-light p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-toss-blue text-white flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">A</span>
                </div>
                <h4 className="text-sm font-medium text-toss-blue">17시 이전 가입</h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-toss-gray-dark">
                <li className="flex items-start">
                  <span className="text-toss-blue mr-2">•</span>
                  <span>D+2일 기준가 적용</span>
                </li>
                <li className="flex items-start">
                  <span className="text-toss-blue mr-2">•</span>
                  <span>D+3일 지급</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-toss-gray-light p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-toss-gray-dark text-white flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">B</span>
                </div>
                <h4 className="text-sm font-medium text-toss-gray-dark">17시 이후 가입</h4>
              </div>
              <ul className="ml-8 space-y-1 text-sm text-toss-gray-dark">
                <li className="flex items-start">
                  <span className="text-toss-gray-dark mr-2">•</span>
                  <span>D+3일 기준가 적용</span>
                </li>
                <li className="flex items-start">
                  <span className="text-toss-gray-dark mr-2">•</span>
                  <span>D+4일 지급</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 환매 수수료 정보 */}
        <div className="bg-toss-gray-light p-4 rounded-lg mt-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white text-toss-blue flex items-center justify-center mr-3">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-toss-black">환매 수수료</h3>
              <p className="text-sm text-toss-gray-dark">없음</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 참고 사항 */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-sm font-medium text-toss-black mb-2">참고 사항</h3>
        <ul className="space-y-1 text-sm text-toss-gray-dark">
          <li className="flex items-start">
            <span className="text-toss-gray mr-2">•</span>
            <span>영업일 기준으로 산정됩니다 (토/일/공휴일 제외)</span>
          </li>
          <li className="flex items-start">
            <span className="text-toss-gray mr-2">•</span>
            <span>자세한 환매 절차는 투자설명서를 참고하세요</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RedemptionProcedure; 