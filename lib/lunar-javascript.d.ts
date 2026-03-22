declare module 'lunar-javascript' {
  interface SolarInstance {
    getLunar(): LunarInstance;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
  }

  interface LunarInstance {
    getEightChar(): EightCharInstance;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getDayInGanZhi(): string;
    getTimeInGanZhi(): string;
  }

  interface EightCharInstance {
    getYear(): string;
    getYearGan(): string;
    getYearZhi(): string;
    getYearWuXing(): string;
    getYearNaYin(): string;
    getMonth(): string;
    getMonthGan(): string;
    getMonthZhi(): string;
    getMonthWuXing(): string;
    getMonthNaYin(): string;
    getDay(): string;
    getDayGan(): string;
    getDayZhi(): string;
    getDayWuXing(): string;
    getDayNaYin(): string;
    getTime(): string;
    getTimeGan(): string;
    getTimeZhi(): string;
    getTimeWuXing(): string;
    getTimeNaYin(): string;
    setSect(sect: number): void;
    getSect(): number;
  }

  export const Solar: {
    fromDate(date: Date): SolarInstance;
    fromYmd(y: number, m: number, d: number): SolarInstance;
    fromYmdHms(y: number, m: number, d: number, h: number, mi: number, s: number): SolarInstance;
  };

  export const Lunar: {
    fromDate(date: Date): LunarInstance;
  };

  export const EightChar: {
    fromLunar(lunar: LunarInstance): EightCharInstance;
  };
}
