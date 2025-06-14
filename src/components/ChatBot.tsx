import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onNewAnswer: (answer: string) => void;
  onNewQuestion: (question: string) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNewAnswer, onNewQuestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    onNewQuestion(inputValue);
    const currentQuestion = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('질문 전송:', currentQuestion);
      
      // 실제 API 엔드포인트 호출 (절대 경로 사용)
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api/chat'
        : '/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentQuestion,
          fundInfo: {
            name: '증권자투자신탁(H)[주식-파생형]',
            code: 'DT432',
            manager: '신한자산운용(주)',
            type: '증권형(주식-파생형) / 개방형 / 추가형 / 모자형',
            index: 'S&P500 (USD 기준)',
            riskLevel: '2등급 (중위험)',
            returnRates: [
              { class: 'A1', yearReturn: 35.73, setupReturn: 23.57 },
              { class: 'C1', yearReturn: 35.13, setupReturn: 23.04 },
              { class: 'A-e', yearReturn: 36.32, setupReturn: 24.12 },
              { class: 'C-e', yearReturn: 36.20, setupReturn: 20.49 }
            ],
            costs: [
              { class: 'A1', salesFee: '1.0% 이내', totalFee: '1.08%' },
              { class: 'C1', salesFee: '없음', totalFee: '1.69%' },
              { class: 'A-e', salesFee: '0.2% 이내', totalFee: '0.81%' },
              { class: 'C-e', salesFee: '없음', totalFee: '1.15%' }
            ]
          }
        }),
      });

      console.log('API 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 에러 응답:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.isFromGPT 
          ? `🤖 ${data.reply}` 
          : `📋 ${data.reply}`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      onNewAnswer(data.reply);
    } catch (error) {
      console.error('AI 응답 오류 상세:', error);
      
      let errorContent = '죄송합니다. 현재 답변을 생성할 수 없습니다.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorContent = '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
        } else if (error.message.includes('API Error')) {
          errorContent = 'API 서비스에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
        }
      }
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 채팅 아이콘 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-toss-blue hover:bg-toss-blue-dark text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            )}
          </svg>
        </button>
      </div>

      {/* 채팅 창 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="bg-toss-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">펀드 상담 AI</h3>
                <p className="text-sm opacity-90">📋 로컬정보 + 🤖 Claude AI</p>
              </div>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>안녕하세요! 👋</p>
                <p className="text-sm mt-2">펀드에 대해 궁금한 것을 물어보세요.</p>
                <div className="text-xs mt-3 bg-blue-50 p-2 rounded">
                  <p className="text-blue-600">📋 웹페이지 정보 + 🤖 Claude AI 활용</p>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-toss-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="질문을 입력하세요..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-toss-blue"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-toss-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-toss-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 