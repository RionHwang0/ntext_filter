import { NextApiRequest, NextApiResponse } from 'next';

interface ChatRequest {
  message: string;
  fundInfo?: {
    name: string;
    code: string;
    manager: string;
    type: string;
    index: string;
    riskLevel: string;
    returnRates: any[];
    costs: any[];
  };
}

interface ChatResponse {
  reply: string;
  isFromGPT: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      reply: 'Method not allowed', 
      isFromGPT: false,
      error: 'Only POST method allowed' 
    });
  }

  try {
    console.log('Chat API 호출됨:', req.method);
    console.log('Request body:', req.body);
    
    const { message, fundInfo }: ChatRequest = req.body;

    if (!message) {
      console.log('메시지가 없음');
      return res.status(400).json({ 
        reply: '메시지가 필요합니다.', 
        isFromGPT: false,
        error: 'Message is required' 
      });
    }

    console.log('받은 메시지:', message);

    // 먼저 로컬 펀드 정보에서 답변 시도
    const localResponse = await getLocalFundResponse(message, fundInfo);
    console.log('로컬 응답:', localResponse);
    
    if (localResponse) {
      console.log('로컬 응답 반환');
      return res.status(200).json({
        reply: localResponse,
        isFromGPT: false
      });
    }

    console.log('Claude API 호출 시작');
    // 로컬 정보에 없으면 Claude API 호출
    const claudeResponse = await getGPTResponse(message, fundInfo);
    console.log('Claude 응답:', claudeResponse);
    
    return res.status(200).json({
      reply: claudeResponse,
      isFromGPT: true
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      reply: '죄송합니다. 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      isFromGPT: false,
      error: 'Internal server error'
    });
  }
}

// 로컬 펀드 정보에서 답변 생성
async function getLocalFundResponse(question: string, fundInfo?: any): Promise<string | null> {
  const lowerQuestion = question.toLowerCase();
  console.log('로컬 응답 확인 중:', question, '→', lowerQuestion);
  
  if (lowerQuestion.includes('수익률') || lowerQuestion.includes('수익')) {
    console.log('수익률 질문으로 인식됨');
    return `이 펀드의 연간 수익률은 클래스별로 다릅니다:
    - A1 클래스: 35.73%
    - C1 클래스: 35.13%
    - A-e 클래스: 36.32%
    - C-e 클래스: 36.20%
    
    설정 이후 수익률도 23% 이상을 기록하고 있어 양호한 성과를 보이고 있습니다.`;
  }
  
  if (lowerQuestion.includes('위험') || lowerQuestion.includes('리스크')) {
    return `이 펀드는 2등급(중위험) 상품입니다. 주요 위험요소는:
    - 시장 위험: 주식시장 변동성에 따른 손실 가능성
    - 환율 위험: 달러 투자로 인한 환율 변동 위험
    - 집중 위험: S&P500 지수에 집중 투자
    
    하지만 500개 대기업에 분산투자하여 개별 기업 위험은 상당히 완화되어 있습니다.`;
  }
  
  if (lowerQuestion.includes('비용') || lowerQuestion.includes('수수료')) {
    return `펀드 비용은 클래스별로 차이가 있습니다:
    - A1: 판매수수료 1.0% 이내, 총비용 1.08%
    - C1: 판매수수료 없음, 총비용 1.69%
    - A-e: 판매수수료 0.2% 이내, 총비용 0.81%
    - C-e: 판매수수료 없음, 총비용 1.15%
    
    온라인 클래스(A-e)가 가장 저렴한 비용구조를 가지고 있습니다.`;
  }
  
  if (lowerQuestion.includes('세금') || lowerQuestion.includes('과세')) {
    return `펀드 투자 시 세금은 다음과 같습니다:
    - 일반 투자: 15.4% 이자·배당소득세 (자동 원천징수)
    - 연금저축: 연금수령 시 3.3~5.5% (나이별 차등)
    - 퇴직연금: 별도 과세 체계 적용
    
    연 금융소득 2천만원 초과 시 종합소득세 신고 대상이 됩니다.`;
  }

  if (lowerQuestion.includes('s&p') || lowerQuestion.includes('sp500') || lowerQuestion.includes('에스앤피')) {
    return `S&P 500은 미국의 대표적인 주가지수입니다:
    - 미국 상장기업 중 시가총액 상위 500개 기업을 포함
    - 미국 주식시장 전체의 약 80%를 대표
    - 애플, 마이크로소프트, 아마존, 테슬라 등 포함
    - 장기적으로 연평균 10% 내외의 수익률을 기록
    
    이 펀드는 S&P 500 지수를 추종하여 미국 대기업들에 분산투자합니다.`;
  }

  if (lowerQuestion.includes('운용사') || lowerQuestion.includes('신한자산운용')) {
    return `이 펀드는 신한자산운용(주)에서 운용합니다:
    - 국내 대형 자산운용사 중 하나
    - 다양한 펀드 상품 운용 경험 보유
    - 전문적인 운용 인력과 시스템 구축
    
    운용 매니저:
    - 양찬규 (책임운용역): 5,266억원 운용, 수익률 32.74%
    - 전형래 (부책임운용역): 2,045억원 운용, 수익률 35.11%`;
  }

  // 로컬 정보에 없는 경우 null 반환
  return null;
}

// Claude API를 통한 답변 생성
async function getGPTResponse(question: string, fundInfo?: any): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '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';
  
  if (!ANTHROPIC_API_KEY) {
    return `죄송합니다. 현재 AI 서비스를 이용할 수 없습니다. 관리자에게 문의해주세요.
    
    웹페이지에 있는 정보에 대해서는 다음과 같은 질문을 해보시면 도움을 드릴 수 있습니다:
    - 수익률이 어떻게 되나요?
    - 투자 위험은 어느 정도인가요?
    - 비용과 수수료는 얼마인가요?
    - 세금은 어떻게 부과되나요?`;
  }

  try {
    // 펀드 정보를 포함한 시스템 프롬프트 생성
    const systemPrompt = `당신은 전문적인 펀드 상담 AI입니다. 다음 펀드에 대한 질문에 답변해주세요:

펀드명: 증권자투자신탁(H)[주식-파생형]
펀드코드: DT432
운용사: 신한자산운용(주)
투자 유형: 증권형(주식-파생형) / 개방형 / 추가형 / 모자형
추종지수: S&P500 (USD 기준)
위험등급: 2등급 (중위험)
예금보호: 예금자보호법 미적용 (원금 비보장)

수익률 정보:
- A1 클래스: 연간 35.73%, 설정 후 23.57%
- C1 클래스: 연간 35.13%, 설정 후 23.04%
- A-e 클래스: 연간 36.32%, 설정 후 24.12%
- C-e 클래스: 연간 36.20%, 설정 후 20.49%

비용 정보:
- A1: 판매수수료 1.0% 이내, 총비용 1.08%
- C1: 판매수수료 없음, 총비용 1.69%
- A-e: 판매수수료 0.2% 이내, 총비용 0.81%
- C-e: 판매수수료 없음, 총비용 1.15%

답변 시 주의사항:
1. 정확하고 객관적인 정보 제공
2. 투자 권유가 아닌 정보 제공 목적임을 명시
3. 개인의 투자 상황에 따라 다를 수 있음을 안내
4. 전문가 상담 필요 시 권유
5. 한국어로 친근하고 이해하기 쉽게 답변

질문이 위 펀드와 관련 없는 일반적인 투자 질문인 경우에도 도움이 되는 정보를 제공해주세요.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: question
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API Error: ${response.status}`);
    }

    const data = await response.json();
    const claudeReply = data.content[0]?.text || '죄송합니다. 답변을 생성할 수 없습니다.';
    
    return `${claudeReply}

📌 이 답변은 AI가 생성한 일반적인 정보입니다. 
투자 결정 시에는 전문가와 상담하시길 권합니다.`;

  } catch (error) {
    console.error('Anthropic API Error:', error);
    return `죄송합니다. 현재 AI 서비스에 일시적인 문제가 있습니다.
    
    웹페이지에 있는 정보에 대해서는 다음과 같은 질문을 해보시면 도움을 드릴 수 있습니다:
    - 수익률이 어떻게 되나요?
    - 투자 위험은 어느 정도인가요?
    - 비용과 수수료는 얼마인가요?
    - 세금은 어떻게 부과되나요?`;
  }
} 