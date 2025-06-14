import React from 'react';

const ReferenceLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-toss p-6 mb-8">
      <h2 className="text-lg font-bold text-toss-black mb-4">참고 링크</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="#" 
          className="flex items-center p-4 border rounded-lg transition-colors hover:border-toss-blue hover:bg-toss-blue-light group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-12 h-12 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3 group-hover:bg-toss-blue group-hover:text-white transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-md font-medium text-toss-black group-hover:text-toss-blue transition-colors">투자설명서 보기</h3>
            <p className="text-sm text-toss-gray">상품에 대한 상세한 정보를 확인하세요</p>
          </div>
        </a>
        
        <a 
          href="https://dis.kofia.or.kr" 
          className="flex items-center p-4 border rounded-lg transition-colors hover:border-toss-blue hover:bg-toss-blue-light group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-12 h-12 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3 group-hover:bg-toss-blue group-hover:text-white transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-md font-medium text-toss-black group-hover:text-toss-blue transition-colors">한국금융투자협회 공시</h3>
            <p className="text-sm text-toss-gray">협회 공시 자료를 확인하세요</p>
          </div>
        </a>
        
        <a 
          href="http://dart.fss.or.kr" 
          className="flex items-center p-4 border rounded-lg transition-colors hover:border-toss-blue hover:bg-toss-blue-light group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-12 h-12 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3 group-hover:bg-toss-blue group-hover:text-white transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-md font-medium text-toss-black group-hover:text-toss-blue transition-colors">금융감독원 DART 공시</h3>
            <p className="text-sm text-toss-gray">금감원 공시 자료를 확인하세요</p>
          </div>
        </a>
        
        <a 
          href="#" 
          className="flex items-center p-4 border rounded-lg transition-colors hover:border-toss-blue hover:bg-toss-blue-light group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-12 h-12 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center mr-3 group-hover:bg-toss-blue group-hover:text-white transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-md font-medium text-toss-black group-hover:text-toss-blue transition-colors">자산운용보고서</h3>
            <p className="text-sm text-toss-gray">운용 현황 보고서를 확인하세요</p>
          </div>
        </a>
      </div>
      
      <div className="mt-6 p-4 bg-toss-gray-light rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-toss-blue text-white flex items-center justify-center mr-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-toss-black mb-1">투자 전 필수 확인 사항</h3>
            <p className="text-sm text-toss-gray-dark">
              투자설명서와 간이투자설명서를 반드시 확인하시기 바랍니다. 과거의 운용실적이 미래의 수익률을 보장하지 않으며, 원금 손실이 발생할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceLinks; 