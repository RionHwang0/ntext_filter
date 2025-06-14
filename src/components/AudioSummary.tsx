import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaStop, FaVolumeUp, FaForward, FaBackward } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';

interface AudioSummaryProps {
  fundData: {
    name: string;
    code: string;
    manager: string;
    returnRates: Array<{ class: string; yearReturn: number; setupReturn: number }>;
    riskLevel: string;
    costs: Array<{ class: string; totalFee: string }>;
  };
}

interface AudioScript {
  title: string;
  content: string;
  duration: string;
}

const AudioSummary: React.FC<AudioSummaryProps> = ({ fundData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState<string>('');
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [currentSection, setCurrentSection] = useState(0);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 음성 스크립트 데이터
  const audioScripts: AudioScript[] = [
    {
      title: '펀드 개요',
      duration: '15초',
      content: `안녕하세요. ${fundData.manager}의 ${fundData.name}을 소개해드립니다. 이 펀드는 미국 S&P 500 지수를 추종하는 상품으로, 미국 대표 500개 기업에 분산투자합니다.`
    },
    {
      title: '수익률 정보',
      duration: '20초',
      content: `최근 1년간 우수한 성과를 보이고 있습니다. A-e 클래스 기준으로 연간 수익률 ${fundData.returnRates[2]?.yearReturn || 36.32}%, 설정 이후 수익률 ${fundData.returnRates[2]?.setupReturn || 24.12}%를 달성했습니다. 이는 미국 주식시장의 강세에 힘입은 결과입니다.`
    },
    {
      title: '위험도 및 비용',
      duration: '15초',
      content: `위험등급은 ${fundData.riskLevel}으로 중간 수준의 위험을 가지고 있습니다. 총 보수는 온라인 클래스 기준 ${fundData.costs[2]?.totalFee || '0.81%'}로 합리적인 수준입니다.`
    },
    {
      title: '투자 포인트',
      duration: '10초',
      content: `500개 대기업에 분산투자로 개별 기업 위험을 줄이면서, 미국 경제 성장의 수혜를 받을 수 있는 상품입니다. 장기 투자에 적합합니다.`
    }
  ];

  // 전체 요약 스크립트 (1분 버전)
  const fullSummaryScript = `
    안녕하세요. ${fundData.manager}의 S&P 500 추종 펀드를 소개해드립니다.
    
    이 펀드는 미국 대표 500개 기업에 투자하는 상품으로, 최근 1년간 36% 이상의 우수한 수익률을 기록했습니다.
    
    위험등급은 2등급 중위험으로, 총 보수는 온라인 클래스 기준 0.81%입니다.
    
    애플, 마이크로소프트, 아마존 등 글로벌 대기업들에 분산투자하여, 개별 기업 위험은 줄이면서 미국 경제 성장의 수혜를 받을 수 있습니다.
    
    달러 투자로 인한 환율 위험이 있지만, 장기적으로 미국 주식시장 성장에 참여하고 싶은 투자자에게 적합한 상품입니다.
    
    투자 전 상품설명서를 꼼꼼히 확인하시고, 개인의 투자 성향에 맞는지 검토해보시기 바랍니다.
  `;

  // 음성 재생 함수
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // 기존 음성 정지
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // 한국어 음성 설정
      const voices = window.speechSynthesis.getVoices();
      const koreanVoice = voices.find(voice => 
        voice.lang.includes('ko') || voice.name.includes('Korean')
      );
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      utterance.lang = 'ko-KR';
      utterance.rate = playbackRate;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentScript(text);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentScript('');
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        setCurrentScript('');
      };

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('죄송합니다. 이 브라우저는 음성 기능을 지원하지 않습니다.');
    }
  };

  // 음성 정지 함수
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentScript('');
    }
  };

  // 일시정지/재생 토글
  const togglePlayback = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          setIsPlaying(true);
        }
      }
    }
  };

  // 재생 속도 변경
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying && speechSynthesisRef.current) {
      // 현재 재생 중이면 새로운 속도로 다시 시작
      const currentText = currentScript;
      stopSpeech();
      setTimeout(() => speakText(currentText), 100);
    }
  };

  // 구간별 재생
  const playSection = (index: number) => {
    setCurrentSection(index);
    speakText(audioScripts[index].content);
  };

  // 전체 요약 재생
  const playFullSummary = () => {
    setCurrentSection(-1);
    speakText(fullSummaryScript);
  };

  return (
    <div className="enhanced-card shadow-elegant-hover bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0">
      {/* 향상된 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="icon-enhanced bg-gradient-to-r from-blue-500 to-purple-600 w-14 h-14">
            <i className="fas fa-headphones text-xl text-white"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">음성 요약</h3>
            <p className="text-sm text-gray-600 leading-relaxed">1분 분량의 펀드 핵심 정보를 음성으로 들어보세요</p>
          </div>
          <div className="status-positive">
            <i className="fas fa-clock mr-1"></i>
            총 1분
          </div>
        </div>
        
        {/* 향상된 재생 속도 조절 */}
        <div className="flex items-center gap-3">
          <div className="icon-enhanced bg-gradient-to-r from-gray-400 to-gray-500 w-8 h-8">
            <i className="fas fa-tachometer-alt text-sm text-white"></i>
          </div>
          <select 
            value={playbackRate} 
            onChange={(e) => changePlaybackRate(Number(e.target.value))}
            className="enhanced-input py-2 px-3 text-sm min-w-[80px]"
          >
            <option value={0.8}>0.8x</option>
            <option value={1.0}>1.0x</option>
            <option value={1.2}>1.2x</option>
            <option value={1.4}>1.4x</option>
          </select>
        </div>
      </div>

      {/* 향상된 전체 요약 버튼 */}
      <div className="mb-8">
        <button
          onClick={playFullSummary}
          className="w-full professional-button py-4 px-8 text-lg font-bold shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
        >
          <i className="fas fa-play mr-3 text-lg"></i>
          전체 요약 듣기 (1분)
          <i className="fas fa-magic ml-3 text-lg"></i>
        </button>
      </div>

      {/* 향상된 구간별 재생 */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-list-ul mr-2 text-blue-500"></i>
          구간별 듣기
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioScripts.map((script, index) => (
            <button
              key={index}
              onClick={() => playSection(index)}
              className={`interactive-list-item text-left ${
                currentSection === index && isPlaying
                  ? 'border-blue-500 bg-blue-50'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    currentSection === index && isPlaying
                      ? 'bg-blue-500 text-white'
                      : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600'
                  }`}>
                    <i className={`fas ${
                      currentSection === index && isPlaying ? 'fa-volume-up' : 'fa-play'
                    }`}></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">{script.title}</h5>
                    <p className="text-sm text-gray-600">{script.duration}</p>
                  </div>
                </div>
                <div className="text-blue-500">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 향상된 재생 컨트롤 */}
      {isPlaying && (
        <div className="enhanced-card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 floating-element">
                <i className="fas fa-play text-white text-sm"></i>
              </div>
              <span className="font-bold text-gray-800">재생 중...</span>
            </div>
            <div className="status-positive">
              <i className="fas fa-headphones mr-1"></i>
              {currentSection >= 0 ? audioScripts[currentSection].title : '전체 요약'}
            </div>
          </div>
          
          {/* 향상된 컨트롤 버튼 */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={togglePlayback}
              className="w-12 h-12 professional-button rounded-full"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white`}></i>
            </button>
            
            <button
              onClick={stopSpeech}
              className="w-12 h-12 professional-button rounded-full"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
            >
              <i className="fas fa-stop text-white"></i>
            </button>
          </div>

          {/* 현재 재생 텍스트 미리보기 */}
          <div className="bg-white bg-opacity-70 p-4 rounded-lg border border-white border-opacity-50">
            <h5 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
              <i className="fas fa-quote-left mr-2 text-blue-500"></i>
              현재 재생 내용
            </h5>
            <div className="text-sm text-gray-600 leading-relaxed max-h-20 overflow-y-auto custom-scrollbar">
              {currentScript.substring(0, 150)}...
            </div>
          </div>
        </div>
      )}

      {/* 향상된 음성 기능 안내 */}
      <div className="glass-effect p-4 rounded-xl text-center">
        <div className="flex items-center justify-center mb-2">
          <i className="fas fa-info-circle text-blue-500 mr-2"></i>
          <span className="text-sm font-semibold text-gray-700">음성 기능 안내</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          브라우저의 음성 합성 기능을 사용합니다. 
          <br />
          <span className="inline-flex items-center mt-1">
            <i className="fab fa-chrome text-green-500 mr-1"></i>
            <i className="fab fa-edge text-blue-500 mr-1"></i>
            <i className="fab fa-safari text-orange-500 mr-1"></i>
            에서 최적화되어 있습니다.
          </span>
        </p>
      </div>
    </div>
  );
};

export default AudioSummary; 