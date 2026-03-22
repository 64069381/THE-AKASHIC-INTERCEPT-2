import { create } from 'zustand';

export interface LocationData {
  latitude: string;
  longitude: string;
  city: string;
  matchedAddress: string;
}

export interface BaziData {
  yearPillar: string | null;
  monthPillar: string | null;
  dayPillar: string | null;
  hourPillar: string | null;
}

export interface OracleMessage {
  id: string;
  role: 'user' | 'oracle';
  content: string;
  timestamp: number;
}

interface AppState {
  locationData: LocationData | null;
  baziData: BaziData | null;
  trueSolarTime: string | null;
  oracleMessages: OracleMessage[];

  setLocationData: (data: LocationData) => void;
  setBaziData: (data: BaziData) => void;
  setTrueSolarTime: (time: string | null) => void;
  setOracleMessages: (messages: OracleMessage[]) => void;
  addOracleMessage: (message: OracleMessage) => void;
  resetOracleMessages: () => void;
}

const INITIAL_ORACLE_MESSAGE: OracleMessage = {
  id: '0',
  role: 'oracle',
  content: 'The channel is open. Speak your inquiry, and the pattern shall be revealed.',
  timestamp: Date.now(),
};

export const useAppStore = create<AppState>((set) => ({
  locationData: null,
  baziData: null,
  trueSolarTime: null,
  oracleMessages: [INITIAL_ORACLE_MESSAGE],

  setLocationData: (data) => set({ locationData: data }),
  setBaziData: (data) => set({ baziData: data }),
  setTrueSolarTime: (time) => set({ trueSolarTime: time }),
  setOracleMessages: (messages) => set({ oracleMessages: messages }),
  addOracleMessage: (message) =>
    set((state) => ({ oracleMessages: [...state.oracleMessages, message] })),
  resetOracleMessages: () =>
    set({
      oracleMessages: [
        {
          id: Date.now().toString(),
          role: 'oracle',
          content: 'A new thread begins. The slate is cleared, but the pattern remembers. What do you seek?',
          timestamp: Date.now(),
        },
      ],
    }),
}));
