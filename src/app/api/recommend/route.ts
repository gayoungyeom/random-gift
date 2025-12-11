import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { gifts } from '@/data/gifts';
import { UserAnswer } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { answers } = (await request.json()) as { answers: UserAnswer[] };

    const userTags = answers.map((a) => a.tag);

    const prompt = `
당신은 선물 추천 전문가입니다. 사용자의 성향 태그를 보고 가장 적합한 선물을 추천해주세요.

사용자 성향 태그: ${userTags.join(', ')}

선물 목록:
${gifts
  .map((g) => `- ID: ${g.id}, 이름: ${g.name}, 태그: ${g.tags.join(', ')}`)
  .join('\n')}

위 선물 목록 중에서 사용자의 성향 태그와 가장 잘 맞는 선물 하나를 선택하세요.
단순히 태그 일치 개수만 보지 말고, 전체적인 성향을 고려해서 가장 어울리는 선물을 골라주세요.

반드시 다음 형식으로만 응답하세요 (다른 텍스트 없이):
{"giftId": "선택한 선물의 ID"}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content?.trim() || '';
    const parsed = JSON.parse(responseText);
    const selectedGift = gifts.find((g) => g.id === parsed.giftId);

    if (!selectedGift) {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      return NextResponse.json({ gift: randomGift });
    }

    return NextResponse.json({ gift: selectedGift });
  } catch (error) {
    console.error('Recommendation error:', error);
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    return NextResponse.json({ gift: randomGift });
  }
}
