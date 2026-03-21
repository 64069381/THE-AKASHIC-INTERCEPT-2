import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, baseHexagram, transformedHexagram, isStatic } = body;

    if (!baseHexagram) {
      return NextResponse.json({ error: 'Missing hexagram data' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is missing from env');
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured on server' }, { status: 500 });
    }

    const userMessage = [
      `Query: ${question || '(no specific question — read the hexagram pattern itself)'}`,
      `Original Hexagram: ${baseHexagram}`,
      isStatic
        ? 'This is a static hexagram with no moving lines.'
        : `Transformed Hexagram: ${transformedHexagram}`,
    ].join('\n');

    const payload = {
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'user', content: SYSTEM_PROMPT + '\n\n---\n\n' + userMessage },
      ],
      temperature: 0.85,
      max_tokens: 400,
    };

    console.log('[divine] Calling OpenRouter with model:', payload.model);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://akashic-iching.app',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('[divine] OpenRouter status:', response.status, 'body length:', responseText.length);

    if (!response.ok) {
      console.error('[divine] OpenRouter error body:', responseText);
      return NextResponse.json(
        { error: `LLM returned ${response.status}: ${responseText.substring(0, 300)}` },
        { status: 502 }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('[divine] JSON parse failed:', parseErr, 'raw:', responseText.substring(0, 300));
      return NextResponse.json({ error: 'LLM returned non-JSON response' }, { status: 502 });
    }

    const choices = data.choices as Array<{ message?: { content?: string } }> | undefined;
    const reading = choices?.[0]?.message?.content?.trim() ?? '';

    if (!reading) {
      console.error('[divine] Empty reading. Full response:', JSON.stringify(data).substring(0, 500));
      return NextResponse.json({ error: 'LLM returned empty reading' }, { status: 502 });
    }

    return NextResponse.json({ reading });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : '';
    console.error('[divine] FATAL:', message, '\n', stack);
    return NextResponse.json({ error: message || 'Unknown fatal error' }, { status: 500 });
  }
}
