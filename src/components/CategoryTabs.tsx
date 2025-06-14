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
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <div className="loading-spinner"></div>
      <span className="ml-3 text-gray-500">차트 로딩 중...</span>
    </div>
  )
});

interface CategoryTabsProps {
  fundOverviewData: any;
  returnRateData: any[];
  benchmarkReturn: number;
  costData: any[];
  managerData: any[];
  audioSummaryComponent?: React.ReactNode;
}

type TabType = 'summary' | 'profit' | 'risk' | 'info';

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  fundOverviewData,
  returnRateData,
  benchmarkReturn,
  costData,
  managerData,
  audioSummaryComponent
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    {
      id: 'summary' as TabType,
      name: '핵심 요약',
      icon: <i className="fas fa-rocket"></i>,
      description: '한눈에 보는 핵심 정보',
      color: 'blue'
    },
    {
      id: 'profit' as TabType,
      name: '수익 구조',
      icon: <i className="fas fa-chart-line"></i>,
      description: '수익률 및 투자 전략',
      color: 'green'
    },
    {
      id: 'risk' as TabType,
      name: '투자 위험',
      icon: <i className="fas fa-exclamation-triangle"></i>,
      description: '위험도 및 비용 정보',
      color: 'red'
    },
    {
      id: 'info' as TabType,
      name: '기타 정보',
      icon: <i className="fas fa-info-circle"></i>,
      description: '운용사 및 절차 안내',
      color: 'purple'
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-8 reveal-up visible">
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-building text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">펀드 개요</h2>
              </div>
              <FundOverview fund={fundOverviewData} />
            </div>
            
            {/* 핵심 요약 정보 */}
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-star text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">핵심 포인트</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="interactive-list-item bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-chart-line text-lg"></i>
                    </div>
                    <h3 className="font-bold text-blue-800">수익률</h3>
                  </div>
                  <p className="text-sm text-blue-700 leading-relaxed">최근 1년 약 35-36% 수익률 달성으로 우수한 성과를 보여주고 있습니다</p>
                </div>
                
                <div className="interactive-list-item bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-shield-alt text-lg"></i>
                    </div>
                    <h3 className="font-bold text-green-800">안정성</h3>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">500개 대기업 분산투자로 위험을 효과적으로 완화합니다</p>
                </div>
                
                <div className="interactive-list-item bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-coins text-lg"></i>
                    </div>
                    <h3 className="font-bold text-orange-800">비용</h3>
                  </div>
                  <p className="text-sm text-orange-700 leading-relaxed">온라인 클래스 총비용 0.81%로 합리적인 수준을 유지합니다</p>
                </div>
                
                <div className="interactive-list-item bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-thermometer-half text-lg"></i>
                    </div>
                    <h3 className="font-bold text-purple-800">위험등급</h3>
                  </div>
                  <p className="text-sm text-purple-700 leading-relaxed">2등급 (중위험) 투자상품으로 분류됩니다</p>
                </div>
              </div>
            </div>
            
            {/* 음성 요약 섹션 */}
            {audioSummaryComponent && (
              <div className="enhanced-card shadow-elegant-hover">
                {audioSummaryComponent}
              </div>
            )}
          </div>
        );

      case 'profit':
        return (
          <div className="space-y-8 reveal-up visible">
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-chart-line text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">수익률 분석</h2>
              </div>
              <ReturnRates returnData={returnRateData} benchmarkReturn={benchmarkReturn} />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-chart-area text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">자산 구성 차트</h2>
              </div>
              <SimpleAssetChart />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-lightbulb text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">투자 전략</h2>
              </div>
              <InvestmentStrategy />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4">
                  <i className="fas fa-balance-scale text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">상품 비교</h2>
              </div>
              <ProductComparison />
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-8 reveal-up visible">
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-red-500 to-red-600">
                  <i className="fas fa-exclamation-triangle text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">투자 위험</h2>
              </div>
              <InvestmentRisks />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-orange-500 to-orange-600">
                  <i className="fas fa-calculator text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">투자 비용</h2>
              </div>
              <InvestmentCosts costs={costData} />
            </div>
            
            {/* 위험 요약 정보 */}
            <div className="enhanced-card shadow-elegant-hover bg-gradient-to-br from-red-50 to-orange-50">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-red-600 to-red-700">
                  <i className="fas fa-shield-alt text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-red-700">투자 위험 요약</h2>
              </div>
              
              <div className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow-inner">
                <div className="flex items-start">
                  <div className="flex-shrink-0 floating-element">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-exclamation-triangle text-red-600 text-lg"></i>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-red-800 mb-4">주요 위험사항</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="fas fa-times text-red-600 text-xs"></i>
                          </div>
                          <p className="text-sm text-red-700">원금 손실 가능성 (예금자보호 미적용)</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="fas fa-times text-red-600 text-xs"></i>
                          </div>
                          <p className="text-sm text-red-700">미국 주식시장 변동성에 따른 위험</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="fas fa-times text-red-600 text-xs"></i>
                          </div>
                          <p className="text-sm text-red-700">환율 변동 위험 (약 90% 환헤지)</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="fas fa-times text-red-600 text-xs"></i>
                          </div>
                          <p className="text-sm text-red-700">파생상품 투자에 따른 추가 위험</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="space-y-8 reveal-up visible">
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-purple-500 to-purple-600">
                  <i className="fas fa-users text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">펀드 매니저</h2>
              </div>
              <FundManagers managers={managerData} />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-indigo-500 to-indigo-600">
                  <i className="fas fa-hand-holding-usd text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">환매 절차</h2>
              </div>
              <RedemptionProcedure />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-green-500 to-green-600">
                  <i className="fas fa-file-invoice text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">세금 안내</h2>
              </div>
              <TaxationGuide />
            </div>
            
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-center mb-6">
                <div className="icon-enhanced mr-4 bg-gradient-to-r from-blue-500 to-blue-600">
                  <i className="fas fa-link text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold gradient-text">관련 링크</h2>
              </div>
              <ReferenceLinks />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-12">
      {/* Enhanced Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`enhanced-tab min-w-[200px] ${
              activeTab === tab.id ? 'active' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-xl transition-all duration-300 ${
                activeTab === tab.id ? 'text-white' : 'text-blue-500'
              }`}>
                {tab.icon}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-base">{tab.name}</span>
                <span className={`text-xs transition-all duration-300 ${
                  activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {tab.description}
                </span>
              </div>
            </div>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg floating-element"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {renderTabContent()}
      </div>
      
      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 opacity-10 pointer-events-none">
        <div className="floating-delayed">
          <i className="fas fa-chart-line text-6xl text-blue-300"></i>
        </div>
      </div>
      <div className="fixed bottom-20 left-10 opacity-10 pointer-events-none">
        <div className="floating-element">
          <i className="fas fa-coins text-5xl text-green-300"></i>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs; 