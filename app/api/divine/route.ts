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
  let step = 'init';
  try {
    step = 'parsing request body';
    const body = await request.json();
    const { question, baseHexagram, transformedHexagram, isStatic } = body;

    console.log('[divine] Received body keys:', Object.keys(body));
    console.log('[divine] baseHexagram:', typeof baseHexagram, baseHexagram ? 'present' : 'MISSING');

    if (!baseHexagram) {
      return NextResponse.json({ error: 'Missing hexagram data' }, { status: 400 });
    }

    step = 'reading API key';
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is missing from env');
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured on server' }, { status: 500 });
    }
    console.log('[divine] API key length:', apiKey.length, 'starts with:', apiKey.substring(0, 8) + '...');

    step = 'building prompt';
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

    step = 'calling OpenRouter fetch';
    console.log('[divine] Calling OpenRouter with model:', payload.model);

    let response: Response;
    try {
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://akashic-iching.app',
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchErr: unknown) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      console.error('[divine] fetch() itself threw:', msg);
      return NextResponse.json(
        { error: `Network error calling OpenRouter: ${msg}` },
        { status: 502 }
      );
    }

    step = 'reading response body';
    const responseText = await response.text();
    console.log('[divine] OpenRouter status:', response.status, 'body length:', responseText.length);
    console.log('[divine] OpenRouter body preview:', responseText.substring(0, 500));

    if (!response.ok) {
      console.error('[divine] OpenRouter error body:', responseText);
      return NextResponse.json(
        { error: `OpenRouter API error ${response.status}: ${responseText.substring(0, 500)}` },
        { status: 502 }
      );
    }

    step = 'parsing JSON';
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('[divine] JSON parse failed, raw:', responseText.substring(0, 500));
      return NextResponse.json(
        { error: `OpenRouter returned non-JSON: ${responseText.substring(0, 200)}` },
        { status: 502 }
      );
    }

    step = 'extracting choices';
    const choices = data.choices as Array<{ message?: { content?: string } }> | undefined;
    if (!choices || !Array.isArray(choices) || choices.length === 0) {
      console.error('[divine] No choices in response:', JSON.stringify(data).substring(0, 500));
      return NextResponse.json(
        { error: `OpenRouter returned no choices. Full response: ${JSON.stringify(data).substring(0, 500)}` },
        { status: 502 }
      );
    }

    const reading = choices[0]?.message?.content?.trim() ?? '';

    if (!reading) {
      console.error('[divine] Empty reading content. choices[0]:', JSON.stringify(choices[0]).substring(0, 300));
      return NextResponse.json(
        { error: `OpenRouter returned empty content. choices[0]: ${JSON.stringify(choices[0]).substring(0, 300)}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ reading });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : '';
    console.error(`[divine] FATAL at step="${step}":`, message, '\n', stack);
    return NextResponse.json(
      { error: `Server error at step "${step}": ${message}` },
      { status: 500 }
    );
  }
}
