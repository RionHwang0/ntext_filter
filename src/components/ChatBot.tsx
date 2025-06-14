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
      {/* 향상된 채팅 아이콘 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 professional-button rounded-full shadow-2xl relative group"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-xl transition-all duration-300`}></i>
          
          {/* Pulse animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping"></div>
          )}
          
          {/* Notification badge */}
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-white text-xs"></i>
          </div>
        </button>
      </div>

      {/* 향상된 채팅 창 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 enhanced-card shadow-2xl border-0 z-50 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 floating-element">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI 펀드 도우미</h3>
                <p className="text-sm opacity-90 flex items-center">
                  <span className="mr-1">📋 로컬정보</span>
                  <span className="mx-1">+</span>
                  <span className="ml-1">🤖 Claude AI</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat messages area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center mt-8 reveal-up visible">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <i className="fas fa-hand-wave text-blue-500 text-2xl floating-element"></i>
                </div>
                <h4 className="font-bold text-gray-700 mb-2">안녕하세요!</h4>
                <p className="text-sm text-gray-500 mb-4">펀드에 대해 궁금한 것을 물어보세요.</p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <i className="fas fa-database text-blue-500 mr-1"></i>
                      <span className="text-blue-600 font-medium">웹페이지 정보</span>
                    </div>
                    <span className="text-gray-400">+</span>
                    <div className="flex items-center">
                      <i className="fas fa-brain text-purple-500 mr-1"></i>
                      <span className="text-purple-600 font-medium">Claude AI</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200'
                  }`}>
                    <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} text-sm ${
                      message.type === 'user' ? 'text-white' : 'text-gray-600'
                    }`}></i>
                  </div>
                  
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    } ${message.type === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <i className="fas fa-robot text-gray-600 text-sm"></i>
                  </div>
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="loading-spinner"></div>
                      <span className="text-sm">답변을 생성하고 있습니다...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Enhanced input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="펀드에 대해 궁금한 점을 입력하세요..."
                className="enhanced-input flex-1 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="professional-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
            
            {/* Quick suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['수익률이 어떻게 되나요?', '위험도는?', '비용은 얼마인가요?'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 