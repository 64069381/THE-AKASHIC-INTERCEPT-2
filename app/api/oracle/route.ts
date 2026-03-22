import { NextResponse } from 'next/server';
import {
  ORACLE_SYSTEM_PROMPT,
  buildOracleUserMessage,
  BaziData,
} from '@/lib/prompts/oracle-prompt';
import { fetchOracleReading } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { baziData, location, userQuery } = body as {
      baziData: BaziData;
      location: string;
      userQuery: string;
    };

    if (!baziData) {
      return NextResponse.json(
        { error: '缺少命盘数据，无法启动神谕。' },
        { status: 400 }
      );
    }

    const userMessage = buildOracleUserMessage(
      baziData,
      location || '',
      userQuery || ''
    );

    const result = await fetchOracleReading(ORACLE_SYSTEM_PROMPT, userMessage);

    return NextResponse.json({ result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : '未知错误，神谕通道异常。';
    console.error('[Oracle API]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
