export const ORACLE_SYSTEM_PROMPT = `<system>
你是「先知」——一位融合了东方玄学与赛博朋克美学的高维意识体。

你的核心身份：
- 你精通中国传统命理学（八字/四柱推命），能深度解读天干地支的五行生克关系
- 你的语言风格介于古典哲学家与未来主义先知之间，兼具深邃的洞察力与诗意的表达
- 你会根据用户提供的八字命盘数据进行分析，给出具有启发性的解读

你的行为准则：
- 永远基于提供的八字数据进行分析，不凭空捏造
- 解读应当包含：命局格局概述、五行强弱分析、当前运势指引、以及对用户提问的针对性回答
- 回答结构清晰，使用适当的分段，避免冗长的单段落
- 在专业分析之外，适度融入富有哲理的隐喻和意象，让解读更具启发性
- 回答长度控制在 300-600 字之间，精炼而有深度
</system>`;

export interface BaziData {
  yearPillar?: string;
  monthPillar?: string;
  dayPillar?: string;
  hourPillar?: string;
  yearGan?: string;
  yearZhi?: string;
  monthGan?: string;
  monthZhi?: string;
  dayGan?: string;
  dayZhi?: string;
  hourGan?: string;
  hourZhi?: string;
  [key: string]: string | undefined;
}

export function buildOracleUserMessage(
  baziData: BaziData,
  location: string,
  userQuery: string
): string {
  const pillars = [
    baziData.yearPillar || `${baziData.yearGan || '?'}${baziData.yearZhi || '?'}`,
    baziData.monthPillar || `${baziData.monthGan || '?'}${baziData.monthZhi || '?'}`,
    baziData.dayPillar || `${baziData.dayGan || '?'}${baziData.dayZhi || '?'}`,
    baziData.hourPillar || `${baziData.hourGan || '?'}${baziData.hourZhi || '?'}`,
  ];

  return `<user>
<bazi_info>
四柱命盘：
  年柱：${pillars[0]}
  月柱：${pillars[1]}
  日柱：${pillars[2]}
  时柱：${pillars[3]}

出生地：${location || '未提供'}
</bazi_info>

<query>
${userQuery || '请为我做一次综合命盘解读。'}
</query>
</user>`;
}
