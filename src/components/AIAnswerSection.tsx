import React from 'react';

interface AIAnswer {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface AIAnswerSectionProps {
  answers: AIAnswer[];
}

const AIAnswerSection: React.FC<AIAnswerSectionProps> = ({ answers }) => {
  if (answers.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="enhanced-card shadow-elegant-hover mb-10">
          <div className="flex items-center mb-6">
            <div className="icon-enhanced bg-gradient-to-r from-purple-500 to-purple-600 w-14 h-14 mr-4">
              <i className="fas fa-robot text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-2">AI 상담 내역</h2>
              <p className="text-gray-600 text-lg">펀드에 대해 문의하신 내용과 AI의 답변입니다.</p>
            </div>
            <div className="ml-auto status-positive">
              <i className="fas fa-comments mr-1"></i>
              {answers.length}개 대화
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {answers.map((item, index) => (
            <div key={item.id} className="enhanced-card shadow-elegant-hover border-l-4 border-blue-500">
              <div className="mb-6">
                <div className="flex items-start space-x-4">
                  <div className="icon-enhanced bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 mt-1">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="status-positive text-sm mr-3">
                          <i className="fas fa-question-circle mr-1"></i>
                          질문 #{index + 1}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.timestamp.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-gray-800 font-medium leading-relaxed">{item.question}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-start space-x-4">
                  <div className="icon-enhanced bg-gradient-to-r from-purple-500 to-blue-600 w-10 h-10 mt-1 floating-element">
                    <i className="fas fa-brain text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h4 className="text-lg font-bold text-gray-800 mr-2">AI 답변</h4>
                      <div className="status-positive text-xs">
                        <i className="fas fa-magic mr-1"></i>
                        AI 생성
                      </div>
                    </div>
                    <div className="prose prose-blue max-w-none">
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 glass-effect p-6 rounded-xl border border-orange-200">
          <div className="flex items-start space-x-4">
            <div className="icon-enhanced bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12">
              <i className="fas fa-exclamation-triangle text-white"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <i className="fas fa-info-circle mr-2 text-orange-500"></i>
                투자 주의사항
              </h4>
              <div className="bg-white bg-opacity-70 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-orange-600">중요:</strong> AI 답변은 참고용으로만 활용하시고, 
                  투자 결정 시에는 반드시 <strong>투자설명서를 확인</strong>하시거나 
                  <strong>전문가와 상담</strong>하시기 바랍니다.
                </p>
                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <i className="fas fa-shield-check mr-2 text-green-500"></i>
                  <span>신중한 투자 결정을 위해 충분한 정보 수집을 권장합니다</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnswerSection; 