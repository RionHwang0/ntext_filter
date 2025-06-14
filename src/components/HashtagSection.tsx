import React, { useState } from 'react';

interface HashtagProps {
  tags: {
    id: string;
    text: string;
    content: string;
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
    <div className="mb-10">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag.id
                ? 'bg-toss-blue text-white'
                : 'bg-toss-blue-light text-toss-blue hover:bg-toss-blue-dark hover:text-white'
            }`}
          >
            #{tag.text}
          </button>
        ))}
      </div>

      {activeTag && (
        <div className="bg-white rounded-xl shadow-toss p-6 animate-fadeIn">
          {tags.find((tag) => tag.id === activeTag)?.content}
        </div>
      )}
    </div>
  );
};

export default HashtagSection; 