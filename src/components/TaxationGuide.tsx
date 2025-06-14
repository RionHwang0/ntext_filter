import React, { useState } from 'react';

const TaxationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'pension' | 'retirement'>('general');
  
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">과세 안내</h2>
      
      {/* 탭 네비게이션 */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'general' 
              ? 'text-toss-blue border-toss-blue' 
              : 'text-toss-gray border-transparent hover:text-toss-gray-dark'
          }`}
          onClick={() => setActiveTab('general')}
        >
          일반 과세
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'pension' 
              ? 'text-toss-blue border-toss-blue' 
              : 'text-toss-gray border-transparent hover:text-toss-gray-dark'
          }`}
          onClick={() => setActiveTab('pension')}
        >
          연금저축
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'retirement' 
              ? 'text-toss-blue border-toss-blue' 
              : 'text-toss-gray border-transparent hover:text-toss-gray-dark'
          }`}
          onClick={() => setActiveTab('retirement')}
        >
          퇴직연금
        </button>
      </div>
      
      {/* 일반 과세 내용 */}
      {activeTab === 'general' && (
        <div className="animate-fadeIn">
          <div className="mb-6">
            <div className="bg-toss-gray-light p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-toss-black mb-2">과세 흐름도</h3>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center justify-center">
                  <div className="p-3 bg-white rounded-lg border mb-4 md:mb-0 md:mr-6 text-center">
                    <p className="text-sm font-medium">연간 금융소득</p>
                    <p className="text-lg font-bold mt-1">2천만원 초과?</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6">
                      <div className="bg-toss-blue text-white text-sm font-medium py-1 px-3 rounded-full mb-2">
                        아니오
                      </div>
                      <svg className="h-6 w-6 text-toss-gray hidden md:block transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <div className="p-3 bg-white rounded-lg border text-center mt-2 md:mt-0">
                        <p className="text-sm font-medium">분리과세</p>
                        <p className="text-lg font-bold text-toss-blue mt-1">15.4%</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-toss-blue text-white text-sm font-medium py-1 px-3 rounded-full mb-2">
                        예
                      </div>
                      <svg className="h-6 w-6 text-toss-gray hidden md:block transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <div className="p-3 bg-white rounded-lg border text-center mt-2 md:mt-0">
                        <p className="text-sm font-medium">종합소득세 신고</p>
                        <p className="text-md font-bold text-toss-blue mt-1">종합소득세율 적용</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">과세 대상</h3>
                <p className="text-sm text-toss-gray-dark">
                  이익분배금, 해외상장주식의 매매 및 평가 손익 등
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">과세 기준</h3>
                <ul className="space-y-1 text-sm text-toss-gray-dark">
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>개인 투자자: 배당소득세 (15.4%, 지방소득세 포함)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>금융소득 2천만원 초과: 종합소득세율 적용 (6.6~45%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>법인 투자자: 법인세법에 따라 과세</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 연금저축 내용 */}
      {activeTab === 'pension' && (
        <div className="animate-fadeIn">
          <div className="mb-6">
            <div className="bg-toss-blue-light p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-toss-blue mb-2">연금저축 세제혜택</h3>
              
              <div className="bg-white p-3 rounded-lg">
                <h4 className="text-sm font-medium text-toss-black mb-1">연금저축 납입액 세액공제</h4>
                <ul className="space-y-1 text-sm text-toss-gray-dark">
                  <li className="flex items-start">
                    <span className="text-toss-blue mr-2">•</span>
                    <span>연소득 5,500만원 이하: 납입액의 16.5% (최대 66만원)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-blue mr-2">•</span>
                    <span>연소득 5,500만원 초과: 납입액의 13.2% (최대 52.8만원)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-blue mr-2">•</span>
                    <span>총 납입한도: 연간 600만원 (퇴직연금 포함 시 900만원)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">연금수령 시 과세</h3>
                <ul className="space-y-1 text-sm text-toss-gray-dark">
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>연금소득세: 3.3~5.5% (나이에 따라 차등)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>일시금 수령 시: 16.5% (세율 상향)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">중도해지 시 과세</h3>
                <p className="text-sm text-toss-gray-dark">
                  기존 납입액에 대한 세액공제 추징 및 일반해지 가산세 부과될 수 있음
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 퇴직연금 내용 */}
      {activeTab === 'retirement' && (
        <div className="animate-fadeIn">
          <div className="mb-6">
            <div className="bg-toss-gray-light p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium text-toss-black mb-2">퇴직연금 세제혜택</h3>
              
              <div className="bg-white p-3 rounded-lg">
                <h4 className="text-sm font-medium text-toss-black mb-1">퇴직연금 납입액 세액공제</h4>
                <ul className="space-y-1 text-sm text-toss-gray-dark">
                  <li className="flex items-start">
                    <span className="text-toss-gray-dark mr-2">•</span>
                    <span>연금저축과 합산하여 최대 700만원 한도로 세액공제</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-gray-dark mr-2">•</span>
                    <span>50세 이상자는 추가 연 200만원까지 공제 가능</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">퇴직금 수령 시 과세</h3>
                <ul className="space-y-1 text-sm text-toss-gray-dark">
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>연금 수령: 연금소득세 3.3~5.5%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-toss-gray mr-2">•</span>
                    <span>일시금 수령: 퇴직소득세 적용 (중간정산 시 추가 세율)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-toss-black mb-1">운용 수익에 대한 과세</h3>
                <p className="text-sm text-toss-gray-dark">
                  퇴직연금 적립금 운용 수익은 수령 시점까지 과세 이연
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-4 mt-4">
        <p className="text-xs text-toss-gray">
          ※ 세제 관련 사항은 관련 세법 개정 등에 따라 변경될 수 있으니, 자세한 내용은 세무전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default TaxationGuide; 