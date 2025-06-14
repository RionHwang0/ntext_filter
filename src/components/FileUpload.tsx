import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      
      // PDF와 Word 파일만 허용
      if (
        fileType === 'application/pdf' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileType === 'application/msword'
      ) {
        setSelectedFile(file);
        // 파일이 선택되면 바로 처리 시작
        onFileUpload(file);
      } else {
        alert('PDF 또는 Word 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors text-center
          ${dragActive ? 'border-toss-blue bg-blue-50' : 'border-gray-300 hover:border-toss-blue'}
          ${selectedFile ? 'bg-toss-gray-light' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={!selectedFile ? handleClick : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleChange}
        />
        
        {!selectedFile ? (
          <>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">PDF 또는 Word 파일을 드래그하여 업로드하거나 클릭하세요.</p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <svg className="h-8 w-8 text-toss-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-toss-black truncate max-w-xs">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              className="text-sm text-toss-blue hover:text-toss-blue-dark transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
            >
              파일 변경
            </button>
          </div>
        )}
      </div>
      
      {selectedFile && (
        <div className="mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                변환 중...
              </div>
            ) : (
              '가독성 높은 웹페이지로 변환'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 