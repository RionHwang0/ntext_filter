import React, { useState } from 'react';
import { ProcessedDocument } from '../utils/fileProcessor';

interface DocumentViewerProps {
  document: ProcessedDocument;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  const [activeTab, setActiveTab] = useState<'readable' | 'visual'>('readable');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* 상단 탭 네비게이션 */}
      <div className="flex border-b">
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'readable'
              ? 'text-toss-blue border-b-2 border-toss-blue'
              : 'text-gray-500 hover:text-toss-black'
          }`}
          onClick={() => setActiveTab('readable')}
        >
          가독성 모드
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'visual'
              ? 'text-toss-blue border-b-2 border-toss-blue'
              : 'text-gray-500 hover:text-toss-black'
          }`}
          onClick={() => setActiveTab('visual')}
        >
          시각화 모드
        </button>
      </div>

      {/* 문서 제목 */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-toss-black">{document.title}</h1>
      </div>

      {/* 문서 내용 */}
      <div className="p-6">
        {activeTab === 'readable' ? (
          <ReadableView document={document} expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
        ) : (
          <VisualView document={document} />
        )}
      </div>
    </div>
  );
};

interface ReadableViewProps {
  document: ProcessedDocument;
  expandedSection: string | null;
  setExpandedSection: (section: string | null) => void;
}

const ReadableView: React.FC<ReadableViewProps> = ({ document, expandedSection, setExpandedSection }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {document.sections.length > 0 ? (
        <div className="space-y-6">
          {document.sections.map((section, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedSection(expandedSection === section.heading ? null : section.heading)}
              >
                <h2 className={`font-bold ${
                  section.level === 1 ? 'text-lg' : 
                  section.level === 2 ? 'text-md ml-4' : 
                  'text-sm ml-8'
                }`}>
                  {section.heading}
                </h2>
                <svg 
                  className={`h-5 w-5 text-gray-500 transition-transform ${expandedSection === section.heading ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedSection === section.heading && (
                <div className="mt-4 text-gray-700 leading-relaxed">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {document.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

interface VisualViewProps {
  document: ProcessedDocument;
}

const VisualView: React.FC<VisualViewProps> = ({ document }) => {
  // 문서의 구조를 시각화
  const totalSections = document.sections.length;
  const level1Sections = document.sections.filter(s => s.level === 1).length;
  const level2Sections = document.sections.filter(s => s.level === 2).length;
  const level3Sections = document.sections.filter(s => s.level === 3).length;
  
  // 각 섹션의 내용 길이를 계산
  const sectionLengths = document.sections.map(s => s.content.length);
  const maxLength = Math.max(...sectionLengths, 1);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">문서 구조</h2>
        <div className="bg-toss-gray-light rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-toss-gray">총 섹션 수</p>
              <p className="text-lg font-bold">{totalSections}</p>
            </div>
            <div>
              <p className="text-sm text-toss-gray">총 단락 수</p>
              <p className="text-lg font-bold">{document.paragraphs.length}</p>
            </div>
            <div>
              <p className="text-sm text-toss-gray">총 문자 수</p>
              <p className="text-lg font-bold">{document.text.length.toLocaleString()}</p>
            </div>
          </div>
          
          {totalSections > 0 && (
            <div className="flex items-end space-x-2 mt-4">
              <div 
                className="bg-toss-blue rounded-t w-full" 
                style={{ height: `${Math.max(level1Sections / totalSections * 100, 10)}px` }}
              >
                <div className="text-xs text-white text-center mt-1">{level1Sections}</div>
              </div>
              <div 
                className="bg-blue-400 rounded-t w-full" 
                style={{ height: `${Math.max(level2Sections / totalSections * 100, 10)}px` }}
              >
                <div className="text-xs text-white text-center mt-1">{level2Sections}</div>
              </div>
              <div 
                className="bg-blue-300 rounded-t w-full" 
                style={{ height: `${Math.max(level3Sections / totalSections * 100, 10)}px` }}
              >
                <div className="text-xs text-white text-center mt-1">{level3Sections}</div>
              </div>
            </div>
          )}
          <div className="flex justify-between text-xs text-toss-gray mt-1">
            <span>대제목</span>
            <span>중제목</span>
            <span>소제목</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">섹션별 내용 길이</h2>
        <div className="bg-toss-gray-light rounded-lg p-4">
          <div className="space-y-2">
            {document.sections.map((section, index) => (
              <div key={index} className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div className="truncate max-w-xs">
                    <span className="text-xs font-medium text-toss-black">
                      {section.heading}
                    </span>
                  </div>
                  <div className="text-xs text-toss-gray">
                    {section.content.length.toLocaleString()} 자
                  </div>
                </div>
                <div className="flex h-2 mt-1 overflow-hidden text-xs bg-gray-200 rounded">
                  <div
                    style={{ width: `${Math.max((section.content.length / maxLength) * 100, 5)}%` }}
                    className="flex flex-col justify-center text-center text-white bg-toss-blue transition-all duration-500"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-bold mb-4">목차</h2>
        <div className="bg-toss-gray-light rounded-lg p-4">
          <div className="space-y-2">
            {document.sections.map((section, index) => (
              <div 
                key={index} 
                className={`pl-${(section.level - 1) * 4} py-1 text-sm hover:bg-gray-200 rounded transition-colors cursor-pointer`}
              >
                {section.heading}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer; 