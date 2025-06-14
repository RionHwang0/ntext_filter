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
    <div className="mt-12 border-t pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-toss-black mb-2">AI 상담 내역</h2>
          <p className="text-toss-gray">펀드에 대해 문의하신 내용과 AI의 답변입니다.</p>
        </div>
        
        <div className="space-y-6">
          {answers.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-toss-blue-light text-toss-blue flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-toss-gray mb-1">질문</p>
                    <p className="text-toss-black font-medium">{item.question}</p>
                  </div>
                  <div className="text-xs text-toss-gray">
                    {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              
              <div className="border-l-4 border-toss-blue bg-toss-blue-light bg-opacity-10 pl-4 py-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-toss-blue text-white flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-toss-blue font-medium mb-2">AI 답변</p>
                    <div className="text-toss-black whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-toss-gray-light rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-toss-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-toss-gray-dark">
              <strong>참고:</strong> AI 답변은 참고용으로만 활용하시고, 투자 결정 시에는 반드시 투자설명서를 확인하시거나 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnswerSection; 