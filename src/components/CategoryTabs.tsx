import React, { useState } from 'react';
import FundOverview from './FundOverview';
import InvestmentStrategy from './InvestmentStrategy';
import ReturnRates from './ReturnRates';
import InvestmentCosts from './InvestmentCosts';
import InvestmentRisks from './InvestmentRisks';
import FundManagers from './FundManagers';
import RedemptionProcedure from './RedemptionProcedure';
import TaxationGuide from './TaxationGuide';
import ReferenceLinks from './ReferenceLinks';
import ProductComparison from './ProductComparison';
import dynamic from 'next/dynamic';

const SimpleAssetChart = dynamic(() => import('./SimpleAssetChart'), { 
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center">차트 로딩 중...</div>
});

interface CategoryTabsProps {
  fundOverviewData: any;
  returnRateData: any[];
  benchmarkReturn: number;
  costData: any[];
  managerData: any[];
}

type TabType = 'summary' | 'profit' | 'risk' | 'info';

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  fundOverviewData,
  returnRateData,
  benchmarkReturn,
  costData,
  managerData
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    {
      id: 'summary' as TabType,
      name: '핵심 요약',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'profit' as TabType,
      name: '수익 구조',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'risk' as TabType,
      name: '투자 위험',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      id: 'info' as TabType,
      name: '기타 정보',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <FundOverview fund={fundOverviewData} />
            </div>
            
            {/* 핵심 요약 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-toss-black mb-4">핵심 포인트</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-toss-blue-light p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-toss-blue text-white flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-toss-blue">수익률</h3>
                  </div>
                  <p className="text-sm text-toss-gray-dark">최근 1년 약 35-36% 수익률 달성</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-green-600">안정성</h3>
                  </div>
                  <p className="text-sm text-gray-600">500개 대기업 분산투자로 위험 완화</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-orange-600">비용</h3>
                  </div>
                  <p className="text-sm text-gray-600">온라인 클래스 총비용 0.81%</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-purple-600">위험등급</h3>
                  </div>
                  <p className="text-sm text-gray-600">2등급 (중위험) 투자상품</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profit':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <ReturnRates returnData={returnRateData} benchmarkReturn={benchmarkReturn} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <SimpleAssetChart />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <InvestmentStrategy />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ProductComparison />
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <InvestmentRisks />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <InvestmentCosts costs={costData} />
            </div>
            
            {/* 위험 요약 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-toss-black mb-4">투자 위험 요약</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">주요 위험사항</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="space-y-1">
                        <li>• 원금 손실 가능성 (예금자보호 미적용)</li>
                        <li>• 미국 주식시장 변동성에 따른 위험</li>
                        <li>• 환율 변동 위험 (약 90% 환헤지)</li>
                        <li>• 파생상품 투자에 따른 추가 위험</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <FundManagers managers={managerData} />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <RedemptionProcedure />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <TaxationGuide />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ReferenceLinks />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-toss-blue text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CategoryTabs; 