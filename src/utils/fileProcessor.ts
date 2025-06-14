import mammoth from 'mammoth';
// 브라우저 환경에서는 import 대신 동적으로 로드
// import pdfParse from 'pdf-parse';
let pdfParse: any = null;

// PDF-parse ubaa8ub4c8uc5d0 ub300ud55c ud0c0uc785 uc120uc5b8
declare module 'pdf-parse';

export interface ProcessedDocument {
  title: string;
  text: string;
  sections: {
    heading: string;
    content: string;
    level: number;
  }[];
  paragraphs: string[];
}

export const processFile = async (file: File): Promise<ProcessedDocument> => {
  const fileName = file.name;
  const fileType = file.type;
  
  // 테스트용 더미 데이터 반환
  return {
    title: '신한미국S&P500인덱스증권자투자신탁(H)[주식-파생형]',
    text: '샘플 텍스트입니다...',
    sections: [
      {
        heading: '펀드 개요',
        content: '이 펀드는 미국 S&P500 지수를 추종하는 펀드입니다.',
        level: 1
      },
      {
        heading: '투자 전략',
        content: '미국 주식 시장에 투자하여 S&P500 지수 수익률을 추종합니다.',
        level: 1
      },
      {
        heading: '수익률 현황',
        content: '최근 1년 수익률은 35% 내외입니다.',
        level: 1
      }
    ],
    paragraphs: [
      '이 펀드는 미국 S&P500 지수를 추종하는 펀드입니다.',
      '미국 주식 시장에 투자하여 S&P500 지수 수익률을 추종합니다.',
      '최근 1년 수익률은 35% 내외입니다.'
    ]
  };
  
  /* 주석 처리한 원래 코드
  try {
    if (fileType === 'application/pdf') {
      if (!pdfParse) {
        // 동적으로 pdf-parse 모듈 로드
        pdfParse = (await import('pdf-parse')).default;
      }
      return await processPdf(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      return await processWord(file);
    } else {
      throw new Error('지원하지 않는 파일 형식입니다. PDF 또는 Word 파일을 업로드해주세요.');
    }
  } catch (error) {
    console.error('파일 처리 중 오류 발생:', error);
    throw error;
  }
  */
};

const processPdf = async (file: File): Promise<ProcessedDocument> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);
    
    if (!pdfParse) {
      // 동적으로 pdf-parse 모듈 로드
      pdfParse = (await import('pdf-parse')).default;
    }
    
    const pdf = await pdfParse(pdfData);
    const text = pdf.text;
    const title = file.name.replace('.pdf', '');
    
    // 텍스트를 단락으로 분리
    const paragraphs = text.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);
    
    // 간단한 섹션 추출 로직 (제목으로 보이는 라인 기준)
    const sections = extractSections(paragraphs);

    return {
      title,
      text,
      sections,
      paragraphs
    };
  } catch (error) {
    console.error('PDF 처리 중 오류:', error);
    return {
      title: file.name.replace('.pdf', ''),
      text: '파일을 처리할 수 없습니다.',
      sections: [],
      paragraphs: ['PDF 파일을 처리하는 중 오류가 발생했습니다.']
    };
  }
};

const processWord = async (file: File): Promise<ProcessedDocument> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;
  const title = file.name.replace(/\.docx?$/, '');
  
  // 텍스트를 단락으로 분리
  const paragraphs = text.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);
  
  // 간단한 섹션 추출 로직
  const sections = extractSections(paragraphs);

  return {
    title,
    text,
    sections,
    paragraphs
  };
};

// 텍스트에서 섹션(제목과 내용)을 추출하는 함수
const extractSections = (paragraphs: string[]) => {
  const sections: { heading: string; content: string; level: number }[] = [];
  
  // 간단한 제목 패턴 인식 (숫자로 시작하거나 짧고 마침표가 없는 문장)
  let currentHeading = '';
  let currentContent: string[] = [];
  let currentLevel = 1;
  
  // 첫 단락을 제목으로 간주
  if (paragraphs.length > 0) {
    currentHeading = paragraphs[0];
    
    for (let i = 1; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      
      // 제목으로 간주되는 조건
      const isHeading = (
        (paragraph.length < 100 && !paragraph.includes('.')) ||
        /^\d+(\.\d+)*\s/.test(paragraph) || // 숫자 패턴으로 시작 (1. 또는 1.1. 등)
        paragraph.toUpperCase() === paragraph // 모두 대문자
      );
      
      if (isHeading) {
        // 이전 섹션 저장
        if (currentHeading) {
          sections.push({
            heading: currentHeading,
            content: currentContent.join('\n\n'),
            level: currentLevel
          });
        }
        
        // 새 섹션 시작
        currentHeading = paragraph;
        currentContent = [];
        
        // 들여쓰기나 숫자 패턴에 따라 레벨 결정
        if (/^\d+\.\d+/.test(paragraph)) {
          currentLevel = 2;
        } else if (/^\d+\.\d+\.\d+/.test(paragraph)) {
          currentLevel = 3;
        } else {
          currentLevel = 1;
        }
      } else {
        currentContent.push(paragraph);
      }
    }
    
    // 마지막 섹션 저장
    if (currentHeading && currentContent.length > 0) {
      sections.push({
        heading: currentHeading,
        content: currentContent.join('\n\n'),
        level: currentLevel
      });
    }
  }
  
  return sections;
};

// 텍스트를 문장으로 분리하는 함수
export const splitIntoSentences = (text: string): string[] => {
  return text.split(/(?<=[.!?])\s+/).filter((s: string) => s.trim().length > 0);
};

// 텍스트를 시각화하기 위한 간단한 분석 함수
export const analyzeText = (text: string) => {
  const sentences = splitIntoSentences(text);
  const wordCount = text.split(/\s+/).length;
  const charCount = text.length;
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  
  return {
    sentences,
    wordCount,
    charCount,
    sentenceCount: sentences.length,
    avgSentenceLength
  };
}; 