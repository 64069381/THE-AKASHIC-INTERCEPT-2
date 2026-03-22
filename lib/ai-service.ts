interface ApiNode {
  name: string;
  baseURL: string;
  apiKey: string | undefined;
  model: string;
}

function getApiNodes(): ApiNode[] {
  return [
    {
      name: 'OpenRouter',
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      model: 'google/gemini-3.1-pro-preview',
    },
    {
      name: 'DeepSeek',
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: 'deepseek-chat',
    },
  ];
}

export async function fetchOracleReading(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const apiNodes = getApiNodes().filter((node) => node.apiKey);

  if (apiNodes.length === 0) {
    throw new Error('星界网络波动，神谕暂时断开，请稍后再试。');
  }

  for (const node of apiNodes) {
    try {
      console.log(`[Oracle] Attempting node: ${node.name}`);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${node.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${node.apiKey}`,
        },
        body: JSON.stringify({
          model: node.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.8,
          max_tokens: 1024,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'unknown');
        console.warn(
          `[Oracle] Node ${node.name} returned ${res.status}: ${errorText}`
        );
        continue;
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        console.warn(`[Oracle] Node ${node.name} returned empty content`);
        continue;
      }

      console.log(`[Oracle] Success via ${node.name}`);
      return content;
    } catch (err) {
      console.warn(
        `[Oracle] Node ${node.name} failed:`,
        err instanceof Error ? err.message : err
      );
      continue;
    }
  }

  throw new Error('星界网络波动，神谕暂时断开，请稍后再试。');
}
