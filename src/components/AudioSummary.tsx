import React, { useState, useRef, useEffect } from 'react';
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
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [voiceQuality, setVoiceQuality] = useState<'high' | 'standard'>('high');
  const [autoPlay, setAutoPlay] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // 자연스러운 음성 스크립트 데이터
  const audioScripts: AudioScript[] = [
    {
      title: '펀드 개요',
      duration: '15초',
      content: `안녕하세요! ${fundData.manager}에서 운용하는, ${fundData.name}을 소개해드리겠습니다. 
      
      이 펀드는... 미국의 에스앤피 파이브헌드레드 지수를 따라가는 상품으로써, 미국을 대표하는 500개 우량기업에... 분산투자를 하고 있습니다.`
    },
    {
      title: '수익률 정보',
      duration: '20초',
      content: `최근 1년간... 정말 우수한 성과를 보여주고 있는데요. 
      
      에이-이 클래스를 기준으로 보면... 연간 수익률이 ${fundData.returnRates[2]?.yearReturn || 36.32}퍼센트, 그리고 설정 이후 누적 수익률은 ${fundData.returnRates[2]?.setupReturn || 24.12}퍼센트를 기록했습니다. 
      
      이는... 미국 주식시장의 강한 상승세에 힘입은 결과라고 볼 수 있겠습니다.`
    },
    {
      title: '위험도 및 비용',
      duration: '15초',
      content: `위험등급은... ${fundData.riskLevel.replace('등급', '등급으로')} 분류되어, 중간 정도의 위험 수준을 가지고 있습니다. 
      
      총 보수료는... 온라인 클래스 기준으로 ${fundData.costs[2]?.totalFee || '영점팔일퍼센트'}정도로, 상당히 합리적인 수준이라고 할 수 있겠습니다.`
    },
    {
      title: '투자 포인트',
      duration: '10초',
      content: `500개의 대형 우량기업에... 분산투자를 함으로써 개별 기업의 위험은 줄이면서도, 미국 경제 전체의 성장 혜택을 받을 수 있는... 그런 상품입니다. 
      
      특히... 장기 투자에 매우 적합하다고 보시면 되겠습니다.`
    }
  ];

  // 자연스러운 전체 요약 스크립트 (1분 버전)
  const fullSummaryScript = `
    안녕하세요! ${fundData.manager}에서 운용하는... 에스앤피 파이브헌드레드 추종 펀드를 소개해드리겠습니다.
    
    이 펀드는... 미국을 대표하는 500개 우량기업에 투자하는 상품으로써, 최근 1년간... 36퍼센트 이상의 정말 우수한 수익률을 기록하고 있습니다.
    
    위험등급은... 2등급 중위험으로 분류되며, 총 보수료는... 온라인 클래스 기준으로 영점팔일퍼센트 수준입니다.
    
    애플, 마이크로소프트, 아마존과 같은... 글로벌 대기업들에 분산투자를 함으로써, 개별 기업의 위험은 줄이면서도... 미국 경제 전체의 성장 혜택을 받을 수 있는 구조입니다.
    
    달러 투자로 인한... 환율 변동 위험이 있기는 하지만, 장기적으로 미국 주식시장의 성장에 참여하고 싶으신... 투자자분들에게는 매우 적합한 상품이라고 할 수 있겠습니다.
    
    다만... 투자하시기 전에는 반드시 상품설명서를 꼼꼼히 확인해보시고, 개인의 투자 성향과... 위험 감수 능력에 맞는지 충분히 검토해보시기 바랍니다.
    
    감사합니다!
  `;

  // 고급 텍스트 전처리 함수
  const preprocessText = (text: string): string => {
    return text
      // 금융 전문용어 발음 개선
      .replace(/S&P 500/g, '에스앤피 파이브헌드레드')
      .replace(/A-e/g, '에이-이')
      .replace(/KOSPI/g, '코스피')
      .replace(/NASDAQ/g, '나스닥')
      .replace(/NYSE/g, '뉴욕증권거래소')
      .replace(/ETF/g, '이티에프')
      .replace(/REITs/g, '리츠')
      .replace(/IPO/g, '아이피오')
      .replace(/CEO/g, '최고경영자')
      .replace(/CFO/g, '최고재무책임자')
      .replace(/AI/g, '인공지능')
      .replace(/IT/g, '정보기술')
      .replace(/GDP/g, '국내총생산')
      .replace(/CPI/g, '소비자물가지수')
      
      // 숫자와 단위 발음 개선
      .replace(/(\d+)%/g, '$1퍼센트')
      .replace(/(\d+)bp/g, '$1베이시스포인트')
      .replace(/(\d+)조/g, '$1조원')
      .replace(/(\d+)억/g, '$1억원')
      .replace(/(\d+)만/g, '$1만원')
      .replace(/(\d+)천/g, '$1천원')
      .replace(/0\.81%/g, '영점팔일퍼센트')
      .replace(/0\.(\d+)/g, (match, digits) => `영점${digits}`)
      .replace(/(\d+)\.(\d+)/g, (match, whole, decimal) => `${whole}점${decimal}`)
      
      // 등급 및 분류 발음
      .replace(/1등급/g, '일등급')
      .replace(/2등급/g, '이등급')
      .replace(/3등급/g, '삼등급')
      .replace(/4등급/g, '사등급')
      .replace(/5등급/g, '오등급')
      .replace(/6등급/g, '육등급')
      
      // 회사명 발음 개선
      .replace(/Apple/g, '애플')
      .replace(/Microsoft/g, '마이크로소프트')
      .replace(/Amazon/g, '아마존')
      .replace(/Google/g, '구글')
      .replace(/Tesla/g, '테슬라')
      .replace(/Meta/g, '메타')
      .replace(/Netflix/g, '넷플릭스')
      .replace(/Nvidia/g, '엔비디아')
      
      // 통화 및 국가
      .replace(/USD/g, '미국달러')
      .replace(/KRW/g, '한국원')
      .replace(/EUR/g, '유로')
      .replace(/JPY/g, '일본엔')
      .replace(/USA/g, '미국')
      .replace(/US/g, '미국')
      
      // 문장 부호 및 구조 개선
      .replace(/\.\.\./g, '... ')  // 말줄임표 뒤 공백
      .replace(/,/g, ', ')         // 쉼표 뒤 공백
      .replace(/;/g, '; ')         // 세미콜론 뒤 공백
      .replace(/:/g, ': ')         // 콜론 뒤 공백
      .replace(/\?/g, '? ')        // 물음표 뒤 공백
      .replace(/!/g, '! ')         // 느낌표 뒤 공백
      
      // 공백 정리
      .replace(/\s+/g, ' ')        // 여러 공백을 하나로
      .replace(/\n\s*/g, ' ')      // 줄바꿈을 공백으로
      .trim();
  };

  // 향상된 음성 재생 함수
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // 기존 음성 정지
      window.speechSynthesis.cancel();
      
      // 진행률 초기화
      setProgress(0);
      startTimeRef.current = Date.now();

      // 고급 텍스트 전처리
      const processedText = preprocessText(text);

      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // 고급 한국어 음성 선택 로직
      const voices = window.speechSynthesis.getVoices();
      
      // 음성 품질에 따른 우선순위 설정
      const getOptimalVoice = () => {
        if (voiceQuality === 'high') {
          // 고품질 음성 우선순위
          return voices.find(voice => 
            voice.lang.includes('ko-KR') && 
            (voice.name.includes('Premium') || voice.name.includes('Enhanced'))
          ) || voices.find(voice => 
            voice.lang.includes('ko-KR') && 
            (voice.name.includes('Female') || voice.name.includes('여성'))
          ) || voices.find(voice => 
            voice.lang.includes('ko') && voice.name.includes('Google')
          ) || voices.find(voice => 
            voice.lang.includes('ko') || voice.name.includes('Korean')
          );
        } else {
          // 표준 품질 (빠른 로딩)
          return voices.find(voice => 
            voice.lang.includes('ko') || voice.name.includes('Korean')
          );
        }
      };
      
      const selectedVoice = getOptimalVoice();
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('선택된 음성:', selectedVoice.name, '품질:', voiceQuality);
      }

      // 음성 매개변수 최적화
      utterance.lang = 'ko-KR';
      utterance.rate = Math.max(0.6, Math.min(1.3, playbackRate)); // 더 넓은 속도 범위
      utterance.pitch = voiceQuality === 'high' ? 1.05 : 1.0; // 품질에 따른 톤 조정
      utterance.volume = 0.95; // 최적 볼륨

      // 진행률 추적을 위한 예상 재생 시간 계산
      const estimatedDuration = Math.ceil(processedText.length / (playbackRate * 15)) * 1000; // 대략적인 계산
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setCurrentScript(text);
        setProgress(0);
        startTimeRef.current = Date.now();
        
        // 진행률 업데이트 인터벌 시작
        progressIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current;
          const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 100);
          setProgress(progressPercent);
        }, 100);
        
        console.log('고품질 음성 재생 시작:', selectedVoice?.name || 'Default');
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentScript('');
        setProgress(100);
        
        // 진행률 인터벌 정리
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        // 자동 재생 기능
        if (autoPlay && currentSection >= 0 && currentSection < audioScripts.length - 1) {
          setTimeout(() => {
            playSection(currentSection + 1);
          }, 1000);
        }
        
        console.log('음성 재생 완료');
      };

      utterance.onerror = (event) => {
        console.error('음성 재생 오류:', event);
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentScript('');
        setProgress(0);
        
        // 진행률 인터벌 정리
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        alert('음성 재생 중 오류가 발생했습니다. 다시 시도해주세요.');
      };

      // 향상된 일시정지/재개 처리
      utterance.onpause = () => {
        setIsPaused(true);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        console.log('음성 일시정지');
      };

      utterance.onresume = () => {
        setIsPaused(false);
        startTimeRef.current = Date.now() - (progress / 100) * estimatedDuration;
        
        // 진행률 인터벌 재시작
        progressIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current;
          const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 100);
          setProgress(progressPercent);
        }, 100);
        
        console.log('음성 재생 재개');
      };

      speechSynthesisRef.current = utterance;
      
      // 음성 재생 전 잠시 대기 (브라우저 호환성 및 음성 품질 향상)
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 150);
    } else {
      alert('죄송합니다. 이 브라우저는 음성 기능을 지원하지 않습니다.');
    }
  };

  // 향상된 음성 정지 함수
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentScript('');
      setProgress(0);
      
      // 진행률 인터벌 정리
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };

  // 향상된 일시정지/재생 토글
  const togglePlayback = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying && !isPaused) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setIsPaused(true);
      } else if (isPaused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  // 향상된 재생 속도 변경
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying && speechSynthesisRef.current) {
      // 현재 재생 중이면 새로운 속도로 다시 시작
      const currentText = currentScript;
      const currentProgress = progress;
      stopSpeech();
      setTimeout(() => {
        speakText(currentText);
        // 진행률 복원 시도
        setTimeout(() => setProgress(currentProgress), 200);
      }, 150);
    }
  };

  // 음성 품질 변경
  const changeVoiceQuality = (quality: 'high' | 'standard') => {
    setVoiceQuality(quality);
    if (isPlaying && speechSynthesisRef.current) {
      const currentText = currentScript;
      const currentProgress = progress;
      stopSpeech();
      setTimeout(() => {
        speakText(currentText);
        setTimeout(() => setProgress(currentProgress), 200);
      }, 150);
    }
  };

  // 자동 재생 토글
  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
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

  // 컴포넌트 정리
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 키보드 단축키 지원
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
        return; // 입력 필드에서는 단축키 비활성화
      }
      
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (isPlaying || isPaused) {
            togglePlayback();
          }
          break;
        case 'Escape':
          event.preventDefault();
          stopSpeech();
          break;
        case 'ArrowRight':
          if (event.ctrlKey) {
            event.preventDefault();
            changePlaybackRate(Math.min(1.3, playbackRate + 0.1));
          }
          break;
        case 'ArrowLeft':
          if (event.ctrlKey) {
            event.preventDefault();
            changePlaybackRate(Math.max(0.6, playbackRate - 0.1));
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying, isPaused, playbackRate]);

  return (
    <div className="enhanced-card shadow-elegant-hover bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0">
      {/* 향상된 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="icon-enhanced bg-gradient-to-r from-blue-500 to-purple-600 w-14 h-14">
            <i className="fas fa-volume-up text-xl text-white"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">고품질 음성 요약</h3>
            <p className="text-sm text-gray-600 leading-relaxed">AI 기반 자연스러운 한국어 음성으로 펀드 정보를 들어보세요</p>
          </div>
          <div className="status-positive">
            <i className="fas fa-stopwatch mr-1"></i>
            총 1분
          </div>
        </div>
        
        {/* 고급 설정 패널 */}
        <div className="flex items-center gap-3">
          {/* 음성 품질 설정 */}
          <div className="flex items-center gap-2">
            <div className="icon-enhanced bg-gradient-to-r from-purple-400 to-purple-500 w-8 h-8">
              <i className="fas fa-cog text-sm text-white"></i>
            </div>
            <select 
              value={voiceQuality} 
              onChange={(e) => changeVoiceQuality(e.target.value as 'high' | 'standard')}
              className="enhanced-input py-2 px-3 text-sm min-w-[80px]"
            >
              <option value="high">고품질</option>
              <option value="standard">표준</option>
            </select>
          </div>
          
          {/* 재생 속도 조절 */}
          <div className="flex items-center gap-2">
            <div className="icon-enhanced bg-gradient-to-r from-gray-400 to-gray-500 w-8 h-8">
              <i className="fas fa-sliders-h text-sm text-white"></i>
            </div>
            <select 
              value={playbackRate} 
              onChange={(e) => changePlaybackRate(Number(e.target.value))}
              className="enhanced-input py-2 px-3 text-sm min-w-[90px]"
            >
              <option value={0.6}>매우 느리게</option>
              <option value={0.8}>느리게</option>
              <option value={1.0}>보통</option>
              <option value={1.2}>빠르게</option>
              <option value={1.3}>매우 빠르게</option>
            </select>
          </div>
          
          {/* 자동 재생 토글 */}
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              autoPlay 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-gray-100 text-gray-600 border border-gray-300'
            }`}
          >
            <i className={`fas ${autoPlay ? 'fa-play-circle' : 'fa-pause-circle'} text-sm`}></i>
            자동재생
          </button>
        </div>
      </div>

      {/* 실시간 진행률 표시 */}
      {isPlaying && (
        <div className="mb-6 glass-effect p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                {isPaused ? '일시정지됨' : '재생 중'}
              </span>
            </div>
            <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
          </div>
          
          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* 현재 재생 중인 구간 표시 */}
          {currentSection >= 0 && (
            <div className="text-xs text-gray-600">
              현재 구간: {audioScripts[currentSection]?.title}
            </div>
          )}
          
          {/* 재생 컨트롤 */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
            >
              <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} text-sm`}></i>
            </button>
            <button
              onClick={stopSpeech}
              className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <i className="fas fa-stop text-sm"></i>
            </button>
          </div>
        </div>
      )}

      {/* 향상된 전체 요약 버튼 */}
      <div className="mb-8">
        <button
          onClick={playFullSummary}
          className="w-full professional-button py-4 px-8 text-lg font-bold shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
        >
          <i className="fas fa-play mr-3 text-lg"></i>
          전체 요약 듣기 (1분)
          <i className="fas fa-star ml-3 text-lg"></i>
        </button>
      </div>

      {/* 향상된 구간별 재생 */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-list-ol mr-2 text-blue-500"></i>
          구간별 듣기
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioScripts.map((script, index) => (
            <button
              key={index}
              onClick={() => playSection(index)}
              className={`interactive-list-item text-left relative overflow-hidden ${
                currentSection === index && isPlaying
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50'
                  : ''
              }`}
            >
              {/* 재생 중인 구간의 진행률 표시 */}
              {currentSection === index && isPlaying && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-all ${
                    currentSection === index && isPlaying
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600'
                  }`}>
                    <i className={`fas ${
                      currentSection === index && isPlaying 
                        ? (isPaused ? 'fa-pause' : 'fa-volume-up')
                        : 'fa-play'
                    }`}></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">{script.title}</h5>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">{script.duration}</p>
                      {currentSection === index && isPlaying && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {isPaused ? '일시정지' : '재생중'}
                        </span>
                      )}
                    </div>
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

      {/* 고급 기능 안내 */}
      <div className="glass-effect p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center mb-3">
          <i className="fas fa-info-circle text-blue-500 mr-2"></i>
          <span className="text-sm font-semibold text-gray-700">고급 음성 기능 안내</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="space-y-2">
            <p><strong className="text-blue-600">🎯 스마트 기능:</strong></p>
            <ul className="space-y-1 ml-2">
              <li>• 실시간 진행률 표시</li>
              <li>• 구간별 개별 재생</li>
              <li>• 자동 연속 재생</li>
              <li>• 고품질/표준 음성 선택</li>
              <li>• 자연스러운 한국어 발음</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <p><strong className="text-purple-600">⌨️ 키보드 단축키:</strong></p>
            <ul className="space-y-1 ml-2">
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">스페이스바</kbd>: 재생/일시정지</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">ESC</kbd>: 정지</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Ctrl + ←/→</kbd>: 속도 조절</li>
              <li>• 음성 품질 자동 최적화</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            <span className="inline-flex items-center">
              <i className="fab fa-chrome text-green-500 mr-1"></i>
              <i className="fab fa-edge text-blue-500 mr-1"></i>
              <i className="fab fa-safari text-orange-500 mr-1"></i>
              최신 브라우저에서 최적화됨
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioSummary; 