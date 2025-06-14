import React, { useState } from 'react';

interface HashtagProps {
  tags: {
    id: string;
    text: string;
    content: React.ReactNode;
  }[];
}

const HashtagSection: React.FC<HashtagProps> = ({ tags }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleTagClick = (id: string) => {
    if (activeTag === id) {
      setActiveTag(null);
    } else {
      setActiveTag(id);
    }
  };

  return (
    <div className="mb-12">
      {/* 향상된 섹션 헤더 */}
      <div className="enhanced-card shadow-elegant-hover mb-8">
        <div className="flex items-center mb-6">
          <div className="icon-enhanced bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 mr-4">
            <i className="fas fa-tags text-white"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-1">핵심 키워드</h2>
            <p className="text-gray-600">궁금한 키워드를 클릭하면 자세한 설명을 볼 수 있어요</p>
          </div>
        </div>
        
        {/* 향상된 해시태그 버튼들 */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`interactive-list-item px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                activeTag === tag.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100'
              }`}
            >
              <i className="fas fa-tag mr-1 text-xs"></i>
              {tag.text}
              {activeTag === tag.id && (
                <i className="fas fa-chevron-up ml-2 text-xs"></i>
              )}
              {activeTag !== tag.id && (
                <i className="fas fa-chevron-down ml-2 text-xs"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 향상된 콘텐츠 표시 */}
      {activeTag && (
        <div className="enhanced-card shadow-elegant bg-gradient-to-br from-blue-50 via-white to-purple-50 border-l-4 border-blue-500 animate-slideDown">
          <div className="flex items-start mb-4">
            <div className="icon-enhanced bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 mr-4 mt-1">
              <i className="fas fa-bookmark text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800 mr-2">
                  #{tags.find((tag) => tag.id === activeTag)?.text}
                </h3>
                <div className="status-positive text-xs">
                  <i className="fas fa-info-circle mr-1"></i>
                  상세 설명
                </div>
              </div>
              <div className="prose prose-blue max-w-none">
                {tags.find((tag) => tag.id === activeTag)?.content}
              </div>
            </div>
            <button
              onClick={() => setActiveTag(null)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors ml-4"
            >
              <i className="fas fa-times text-gray-500 text-sm"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashtagSection; 