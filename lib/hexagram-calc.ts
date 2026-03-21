import { HEXAGRAM_MAP, type HexagramInfo } from './hexagrams';

export interface DecodeResult {
  lineValues: number[];
  baseKey: string;
  transformedKey: string;
  baseHexagram: HexagramInfo;
  transformedHexagram: HexagramInfo;
  movingLines: number[];
  isStatic: boolean;
}

interface CoinState {
  face: 'yang' | 'yin';
}

interface LineInput {
  coins: CoinState[];
}

function computeLineValue(coins: CoinState[]): number {
  const sum = coins.reduce((acc, c) => acc + (c.face === 'yang' ? 3 : 2), 0);
  return sum;
}

function toBaseDigit(value: number): string {
  return value === 7 || value === 9 ? '1' : '0';
}

function toTransformedDigit(value: number): string {
  if (value === 7) return '1';
  if (value === 8) return '0';
  if (value === 9) return '0';
  return '1';
}

export function decodeHexagram(lines: LineInput[]): DecodeResult {
  const lineValues = lines.map((line) => computeLineValue(line.coins));

  const baseKey = lineValues.map(toBaseDigit).join('');
  const transformedKey = lineValues.map(toTransformedDigit).join('');

  const movingLines: number[] = [];
  lineValues.forEach((v, i) => {
    if (v === 6 || v === 9) movingLines.push(i + 1);
  });

  const baseHexagram = HEXAGRAM_MAP[baseKey] ?? {
    number: 0,
    nameZh: '未知',
    namePinyin: 'Wèi Zhī',
    nameEn: 'Unknown',
    meaning: 'Unrecognized pattern.',
  };

  const transformedHexagram = HEXAGRAM_MAP[transformedKey] ?? {
    number: 0,
    nameZh: '未知',
    namePinyin: 'Wèi Zhī',
    nameEn: 'Unknown',
    meaning: 'Unrecognized pattern.',
  };

  return {
    lineValues,
    baseKey,
    transformedKey,
    baseHexagram,
    transformedHexagram,
    movingLines,
    isStatic: baseKey === transformedKey,
  };
}
