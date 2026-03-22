import { Solar } from 'lunar-javascript';

export interface BaziPillar {
  ganZhi: string;
  gan: string;
  zhi: string;
  wuXing: string;
  naYin: string;
}

export interface BaziResult {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour: BaziPillar;
  lmt: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    iso: string;
  };
}

export function calculateBazi(utcISO: string, longitude: number): BaziResult | null {
  if (!utcISO || isNaN(longitude)) {
    return null;
  }

  const utcMs = new Date(utcISO).getTime();
  const lmtMs = utcMs + (longitude / 15) * 3600000;
  const lmtDate = new Date(lmtMs);

  const year = lmtDate.getUTCFullYear();
  const month = lmtDate.getUTCMonth() + 1;
  const day = lmtDate.getUTCDate();
  const hour = lmtDate.getUTCHours();
  const minute = lmtDate.getUTCMinutes();
  const second = lmtDate.getUTCSeconds();

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  return {
    year: {
      ganZhi: eightChar.getYear(),
      gan: eightChar.getYearGan(),
      zhi: eightChar.getYearZhi(),
      wuXing: eightChar.getYearWuXing(),
      naYin: eightChar.getYearNaYin(),
    },
    month: {
      ganZhi: eightChar.getMonth(),
      gan: eightChar.getMonthGan(),
      zhi: eightChar.getMonthZhi(),
      wuXing: eightChar.getMonthWuXing(),
      naYin: eightChar.getMonthNaYin(),
    },
    day: {
      ganZhi: eightChar.getDay(),
      gan: eightChar.getDayGan(),
      zhi: eightChar.getDayZhi(),
      wuXing: eightChar.getDayWuXing(),
      naYin: eightChar.getDayNaYin(),
    },
    hour: {
      ganZhi: eightChar.getTime(),
      gan: eightChar.getTimeGan(),
      zhi: eightChar.getTimeZhi(),
      wuXing: eightChar.getTimeWuXing(),
      naYin: eightChar.getTimeNaYin(),
    },
    lmt: {
      year,
      month,
      day,
      hour,
      minute,
      second,
      iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
    },
  };
}
