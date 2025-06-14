import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import FileUpload from '../src/components/FileUpload';
import { processFile, ProcessedDocument } from '../src/utils/fileProcessor';

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
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>텍스트 필터 - 가독성 향상 서비스</title>
        <meta name="description" content="PDF, Word 파일을 업로드하여 가독성을 높인 웹페이지로 변환해주는 서비스" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-toss-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="ml-2 text-xl font-bold text-toss-black">텍스트 필터</h1>
            </div>
            <div className="text-sm text-toss-gray">가독성 향상 서비스</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-toss-black mb-2">
              가독성 높은 웹페이지로 변환하세요
            </h1>
            <p className="text-toss-gray">
              PDF 또는 Word 파일을 업로드하면 해시태그와 시각화가 포함된 웹페이지로 변환합니다.
            </p>
          </div>

          <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-12 space-y-8">
            <div className="card">
              <div className="flex items-start">
                <div className="bg-toss-blue-dark rounded-full p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-toss-black">시각화 및 도식화</h3>
                  <p className="mt-1 text-sm text-toss-gray">긴 문서도 한눈에 파악할 수 있도록 시각적 요소를 추가합니다.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start">
                <div className="bg-toss-blue-dark rounded-full p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-toss-black">해시태그</h3>
                  <p className="mt-1 text-sm text-toss-gray">
                    주요 키워드와 질문을 해시태그로 제공하여 빠르게 내용을 파악할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start">
                <div className="bg-toss-blue-dark rounded-full p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-toss-black">쉽고 빠른 변환</h3>
                  <p className="mt-1 text-sm text-toss-gray">
                    복잡한 설정 없이 파일을 업로드하면 바로 변환됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-toss-gray">
            <p>© 2025 텍스트 필터. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 