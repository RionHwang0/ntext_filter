import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';
import { processFile, ProcessedDocument } from '../utils/fileProcessor';

export default function Home() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const processedDocument = await processFile(file);
      
      // 로컬 스토리지에 처리된 문서 저장
      localStorage.setItem('processedDocument', JSON.stringify(processedDocument));
      
      // 결과 페이지로 이동
      router.push('/result');
    } catch (err) {
      setError('파일 처리 중 오류가 발생했습니다. 다른 파일을 시도해보세요.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Head>
        <title>텍스트 필터 - 가독성 향상 서비스</title>
        <meta name="description" content="PDF, Word 파일을 업로드하여 가독성을 높인 웹페이지로 변환해주는 서비스" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
      </Head>

      <header className="glass-effect shadow-elegant border-b border-white border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 floating-element">
                <i className="fas fa-file-contract text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">텍스트 필터</h1>
                <p className="text-sm text-gray-600">AI 기반 문서 변환 서비스</p>
              </div>
            </div>
            <div className="status-positive">
              <i className="fas fa-award mr-1"></i>
              가독성 향상 서비스
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 향상된 히어로 섹션 */}
          <div className="enhanced-card shadow-elegant-hover text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mr-6 floating-element">
                <i className="fas fa-magic text-white text-3xl"></i>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold gradient-text mb-3">
                  가독성 높은 웹페이지로 변환하세요
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  PDF 또는 Word 파일을 업로드하면 해시태그와 시각화가 포함된 웹페이지로 변환합니다.
                </p>
              </div>
            </div>
            
            {/* 주요 기능 하이라이트 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="icon-enhanced bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 mx-auto mb-3">
                  <i className="fas fa-tachometer-alt text-white"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">빠른 변환</h3>
                <p className="text-sm text-gray-600">몇 초 만에 변환 완료</p>
              </div>
              <div className="text-center">
                <div className="icon-enhanced bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 mx-auto mb-3">
                  <i className="fas fa-search-plus text-white"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">가독성 향상</h3>
                <p className="text-sm text-gray-600">시각적 요소 자동 추가</p>
              </div>
              <div className="text-center">
                <div className="icon-enhanced bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 mx-auto mb-3">
                  <i className="fas fa-tags text-white"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">스마트 태그</h3>
                <p className="text-sm text-gray-600">AI 기반 키워드 추출</p>
              </div>
            </div>
          </div>

          <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* 향상된 기능 소개 섹션 */}
          <div className="mt-16 space-y-6">
            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-start">
                <div className="icon-enhanced bg-gradient-to-r from-blue-500 to-blue-600 w-14 h-14 mr-6">
                  <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">시각화 및 도식화</h3>
                  <p className="text-gray-600 leading-relaxed">
                    긴 문서도 한눈에 파악할 수 있도록 시각적 요소를 추가합니다. 
                    차트, 그래프, 아이콘을 활용하여 정보를 직관적으로 표현합니다.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-blue-600">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>자동 차트 생성 • 아이콘 매핑 • 색상 코딩</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-start">
                <div className="icon-enhanced bg-gradient-to-r from-green-500 to-green-600 w-14 h-14 mr-6">
                  <i className="fas fa-tags text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">스마트 해시태그</h3>
                  <p className="text-gray-600 leading-relaxed">
                    AI가 문서의 핵심 키워드를 분석하여 클릭 가능한 해시태그로 변환합니다. 
                    각 태그를 클릭하면 상세한 설명을 확인할 수 있습니다.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-green-600">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>AI 키워드 추출 • 인터랙티브 설명 • 빠른 탐색</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="enhanced-card shadow-elegant-hover">
              <div className="flex items-start">
                <div className="icon-enhanced bg-gradient-to-r from-purple-500 to-purple-600 w-14 h-14 mr-6">
                  <i className="fas fa-upload text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">쉽고 빠른 변환</h3>
                  <p className="text-gray-600 leading-relaxed">
                    복잡한 설정 없이 파일을 드래그 앤 드롭하면 몇 초 만에 변환이 완료됩니다. 
                    PDF, Word 등 다양한 형식을 지원합니다.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-purple-600">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>드래그 앤 드롭 • 다양한 형식 지원 • 실시간 변환</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="glass-effect border-t border-white border-opacity-30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 floating-element">
              <i className="fas fa-file-contract text-white"></i>
            </div>
            <h3 className="text-lg font-bold gradient-text mb-2">텍스트 필터</h3>
            <p className="text-sm text-gray-600 mb-4">금융 문서의 가독성을 향상시키는 AI 서비스</p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="status-positive text-xs">
                <i className="fas fa-shield-alt mr-1"></i>
                안전한 문서 처리
              </span>
              <span className="status-positive text-xs">
                <i className="fas fa-brain mr-1"></i>
                AI 기반 분석
              </span>
              <span className="status-positive text-xs">
                <i className="fas fa-desktop mr-1"></i>
                반응형 디자인
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">© 2025 텍스트 필터. 모든 권리 보유.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 