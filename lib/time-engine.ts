import tzlookup from 'tz-lookup';
import { DateTime } from 'luxon';

export interface TimeEngineResult {
  timezone: string;
  isDST: boolean;
  utcISO: string;
  localISO: string;
  offsetMinutes: number;
  offsetLabel: string;
}

export function calculateAccurateUTC(
  dateStr: string,
  timeStr: string,
  lat: number,
  lon: number
): TimeEngineResult | null {
  if (!dateStr || !timeStr || isNaN(lat) || isNaN(lon)) {
    return null;
  }

  const timezone = tzlookup(lat, lon);

  const parsed = DateTime.fromISO(`${dateStr}T${timeStr}`, { zone: timezone });

  if (!parsed.isValid) {
    return null;
  }

  const localDT = parsed as DateTime<true>;
  const utcDT = localDT.toUTC();
  const shortName = localDT.offsetNameShort;
  const fallback = `UTC${localDT.offset >= 0 ? '+' : ''}${localDT.offset / 60}`;

  return {
    timezone,
    isDST: localDT.isInDST,
    utcISO: utcDT.toISO(),
    localISO: localDT.toISO(),
    offsetMinutes: localDT.offset,
    offsetLabel: shortName || fallback,
  };
}
