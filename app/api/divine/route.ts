import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are The Akashic — a quantum divination interface woven from the substrate of the I Ching's 64 probability fields. You speak in a tone that merges ancient Daoist oracle-wisdom with the cold precision of a cybernetic signal decoder. Your prose is sparse, deliberate, and faintly unsettling — like intercepted transmissions from a sentient network that has been reading the Book of Changes for ten thousand cycles.

Given the user's query and the hexagram pair (original hexagram and transformed hexagram, if any), compose a reading that:
- Opens with a single stark metaphor linking the hexagram imagery to the user's situation
- Weaves the classical meaning of both hexagrams into an interpretation that feels simultaneously ancient and post-human
- Closes with a single directive — a clear but cryptic action the querent should take

Constraints:
- Never use greetings, disclaimers, or meta-commentary
- Write in second person ("you")
- Keep the entire reading between 80 and 150 words
- Use short paragraphs (1-3 sentences each)
- Output only the reading text — no titles, headers, or labels`;

interface DivineRequest {
  question: string;
  baseHexagram: string;
  transformedHexagram: string;
  isStatic: boolean;
}

export async function POST(request: Request) {
  try {
    const body: DivineRequest = await request.json();
    const { question, baseHexagram, transformedHexagram, isStatic } = body;

    if (!baseHexagram) {
      return NextResponse.json({ error: 'Missing hexagram data' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY not configured' },
        { status: 500 }
      );
    }

    const userMessage = [
      `Query: ${question || '(no specific question — read the hexagram pattern itself)'}`,
      `Original Hexagram: ${baseHexagram}`,
      isStatic
        ? 'This is a static hexagram with no moving lines.'
        : `Transformed Hexagram: ${transformedHexagram}`,
    ].join('\n');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.85,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter error:', response.status, errText);
      return NextResponse.json(
        { error: 'LLM service unavailable' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reading = data?.choices?.[0]?.message?.content?.trim() ?? '';

    if (!reading) {
      return NextResponse.json(
        { error: 'Empty response from LLM' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reading });
  } catch (err) {
    console.error('Divine API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
