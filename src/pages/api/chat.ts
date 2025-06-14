import { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { question, context } = req.body;

    if (!question || !context) {
      return res.status(400).json({ message: '질문과 컨텍스트가 필요합니다.' });
    }

    console.log('Sending request to OpenAI:', { question, context });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `당신은 금융 상품 관련 질문에 답변하는 전문가입니다. 
다음 규칙을 따라주세요:

1. 정보 제공 우선순위:
   a) 주어진 컨텍스트에 있는 정보를 우선적으로 사용
   b) 기본적인 금융 지표나 시장 정보(예: 주요 지수, 기준금리 등)는 제공 가능
   c) 복잡하거나 특수한 정보는 컨텍스트에 있는 경우에만 제공

2. 답변 시 다음을 구분하여 표시:
   - 컨텍스트에서 직접 얻은 정보: "제공된 정보에 따르면..."
   - 기본적인 금융 지표/시장 정보: "일반적으로..."
   - 불확실하거나 추가 확인이 필요한 정보: "추가 확인이 필요한 부분입니다..."

3. URL 제공 규칙:
   - 공식 금융기관, 거래소, 정부기관의 URL만 포함
   - 실시간 시세나 지표는 공신력 있는 금융정보 제공자의 URL 허용
   - 불확실한 출처나 비공식 사이트는 포함하지 않음

4. 답변 형식:

[답변 내용]

참고 자료:
- [참고한 정보의 출처]
- [관련 공식 기관 URL]

주의사항:
- 투자 관련 정보는 참고용이며, 투자의 책임은 투자자 본인에게 있음을 명시
- 과거 실적이 미래 수익을 보장하지 않음을 명시`
          },
          {
            role: 'user',
            content: `컨텍스트: ${context}\n\n질문: ${question}`
          }
        ],
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(errorData.error?.message || '답변을 생성하는 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    console.log('OpenAI Response:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('응답 데이터가 올바르지 않습니다.');
    }

    const answer = data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      message: '답변을 생성하는 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
} 