export interface HexagramInfo {
  number: number;
  nameZh: string;
  namePinyin: string;
  nameEn: string;
  meaning: string;
}

// Key format: 6-char binary string, index 0 = bottom line (line 1), index 5 = top line (line 6)
// 1 = yang (solid), 0 = yin (broken)
// Lower trigram = positions 0-2, Upper trigram = positions 3-5
//
// Trigram encoding (bottom to top within trigram):
//   Qian/Heaven  = 111    Kun/Earth    = 000
//   Zhen/Thunder = 100    Xun/Wind     = 011
//   Kan/Water    = 010    Li/Fire      = 101
//   Gen/Mountain = 001    Dui/Lake     = 110

export const HEXAGRAM_MAP: Record<string, HexagramInfo> = {
  // Lower=Heaven(111), Upper=Heaven(111)
  '111111': { number: 1, nameZh: '乾', namePinyin: 'Qián', nameEn: 'The Creative', meaning: 'Pure yang, the creative force of heaven. Great power and initiative bring success through perseverance.' },
  // Lower=Earth(000), Upper=Earth(000)
  '000000': { number: 2, nameZh: '坤', namePinyin: 'Kūn', nameEn: 'The Receptive', meaning: 'Pure yin, the receptive earth. Devotion and yielding bring great success through following.' },
  // Lower=Thunder(100), Upper=Water(010) — 水雷屯
  '100010': { number: 3, nameZh: '屯', namePinyin: 'Zhūn', nameEn: 'Difficulty at the Beginning', meaning: 'Thunder below water. Initial obstacles require patience; gather helpers rather than rushing forward.' },
  // Lower=Water(010), Upper=Mountain(001) — 山水蒙
  '010001': { number: 4, nameZh: '蒙', namePinyin: 'Méng', nameEn: 'Youthful Folly', meaning: 'Water below mountain. The young and inexperienced seek guidance; sincerity and discipline bring clarity.' },
  // Lower=Heaven(111), Upper=Water(010) — 水天需
  '111010': { number: 5, nameZh: '需', namePinyin: 'Xū', nameEn: 'Waiting', meaning: 'Water above heaven. Patience and nourishment; wait for the right moment with confidence.' },
  // Lower=Water(010), Upper=Heaven(111) — 天水讼
  '010111': { number: 6, nameZh: '讼', namePinyin: 'Sòng', nameEn: 'Conflict', meaning: 'Heaven above water. Dispute and contention; seek mediation rather than pressing to the end.' },
  // Lower=Water(010), Upper=Earth(000) — 地水师
  '010000': { number: 7, nameZh: '师', namePinyin: 'Shī', nameEn: 'The Army', meaning: 'Water within earth. Disciplined collective action under wise leadership brings order.' },
  // Lower=Earth(000), Upper=Water(010) — 水地比
  '000010': { number: 8, nameZh: '比', namePinyin: 'Bǐ', nameEn: 'Holding Together', meaning: 'Water above earth. Unity and alliance; seek a leader and form bonds of mutual support.' },
  // Lower=Heaven(111), Upper=Wind(011) — 风天小畜
  '111011': { number: 9, nameZh: '小畜', namePinyin: 'Xiǎo Xù', nameEn: 'Small Taming', meaning: 'Wind above heaven. Gentle restraint of the strong; small accumulations lead to eventual progress.' },
  // Lower=Lake(110), Upper=Heaven(111) — 天泽履
  '110111': { number: 10, nameZh: '履', namePinyin: 'Lǚ', nameEn: 'Treading', meaning: 'Heaven above lake. Walking carefully; proper conduct ensures safety.' },
  // Lower=Heaven(111), Upper=Earth(000) — 地天泰
  '111000': { number: 11, nameZh: '泰', namePinyin: 'Tài', nameEn: 'Peace', meaning: 'Earth above heaven. Heaven and earth in harmony; a time of prosperity and smooth progress.' },
  // Lower=Earth(000), Upper=Heaven(111) — 天地否
  '000111': { number: 12, nameZh: '否', namePinyin: 'Pǐ', nameEn: 'Standstill', meaning: 'Heaven above earth. Stagnation and decline; the great departs while the petty approaches.' },
  // Lower=Fire(101), Upper=Heaven(111) — 天火同人
  '101111': { number: 13, nameZh: '同人', namePinyin: 'Tóng Rén', nameEn: 'Fellowship', meaning: 'Heaven above fire. Gathering with others in the open; fellowship based on shared principles succeeds.' },
  // Lower=Heaven(111), Upper=Fire(101) — 火天大有
  '111101': { number: 14, nameZh: '大有', namePinyin: 'Dà Yǒu', nameEn: 'Great Possession', meaning: 'Fire above heaven. Supreme success and great abundance through virtue and clarity.' },
  // Lower=Mountain(001), Upper=Earth(000) — 地山谦
  '001000': { number: 15, nameZh: '谦', namePinyin: 'Qiān', nameEn: 'Modesty', meaning: 'Mountain within earth. Humility brings success; the modest are elevated while the proud are diminished.' },
  // Lower=Earth(000), Upper=Thunder(100) — 雷地豫
  '000100': { number: 16, nameZh: '豫', namePinyin: 'Yù', nameEn: 'Enthusiasm', meaning: 'Thunder above earth. Joyous enthusiasm inspires devoted following; set plans in motion.' },
  // Lower=Thunder(100), Upper=Lake(110) — 泽雷随
  '100110': { number: 17, nameZh: '随', namePinyin: 'Suí', nameEn: 'Following', meaning: 'Lake above thunder. Adapting to the time with flexibility; success through willing following.' },
  // Lower=Wind(011), Upper=Mountain(001) — 山风蛊
  '011001': { number: 18, nameZh: '蛊', namePinyin: 'Gǔ', nameEn: 'Work on the Decayed', meaning: 'Mountain above wind. Correcting what has been corrupted; repair the damage with care and deliberation.' },
  // Lower=Lake(110), Upper=Earth(000) — 地泽临
  '110000': { number: 19, nameZh: '临', namePinyin: 'Lín', nameEn: 'Approach', meaning: 'Earth above lake. The great approaches; a time of increasing influence and authority.' },
  // Lower=Earth(000), Upper=Wind(011) — 风地观
  '000011': { number: 20, nameZh: '观', namePinyin: 'Guān', nameEn: 'Contemplation', meaning: 'Wind above earth. Standing back to observe and reflect; contemplation precedes wise action.' },
  // Lower=Thunder(100), Upper=Fire(101) — 火雷噬嗑
  '100101': { number: 21, nameZh: '噬嗑', namePinyin: 'Shì Kè', nameEn: 'Biting Through', meaning: 'Fire above thunder. Decisive action to remove obstacles; justice and punishment restore order.' },
  // Lower=Fire(101), Upper=Mountain(001) — 山火贲
  '101001': { number: 22, nameZh: '贲', namePinyin: 'Bì', nameEn: 'Grace', meaning: 'Mountain above fire. Elegance and adornment; beauty in form but substance matters more.' },
  // Lower=Earth(000), Upper=Mountain(001) — 山地剥
  '000001': { number: 23, nameZh: '剥', namePinyin: 'Bō', nameEn: 'Splitting Apart', meaning: 'Mountain above earth. Decay and dissolution; do not act, but wait for the cycle to complete.' },
  // Lower=Thunder(100), Upper=Earth(000) — 地雷复
  '100000': { number: 24, nameZh: '复', namePinyin: 'Fù', nameEn: 'Return', meaning: 'Thunder within earth. The turning point; the light returns after darkness. Rest and renewal.' },
  // Lower=Thunder(100), Upper=Heaven(111) — 天雷无妄
  '100111': { number: 25, nameZh: '无妄', namePinyin: 'Wú Wàng', nameEn: 'Innocence', meaning: 'Heaven above thunder. Acting without guile or ulterior motive; unexpected misfortune if one deviates from truth.' },
  // Lower=Heaven(111), Upper=Mountain(001) — 山天大畜
  '111001': { number: 26, nameZh: '大畜', namePinyin: 'Dà Xù', nameEn: 'Great Taming', meaning: 'Mountain above heaven. Accumulated power and wisdom; restraint of the great brings good fortune.' },
  // Lower=Thunder(100), Upper=Mountain(001) — 山雷颐
  '100001': { number: 27, nameZh: '颐', namePinyin: 'Yí', nameEn: 'Nourishment', meaning: 'Mountain above thunder. Proper nourishment of body and mind; be mindful of what you consume and provide.' },
  // Lower=Wind(011), Upper=Lake(110) — 泽风大过
  '011110': { number: 28, nameZh: '大过', namePinyin: 'Dà Guò', nameEn: 'Great Excess', meaning: 'Lake above wind. The beam sags under pressure; extraordinary times demand extraordinary measures.' },
  // Lower=Water(010), Upper=Water(010) — 坎为水
  '010010': { number: 29, nameZh: '坎', namePinyin: 'Kǎn', nameEn: 'The Abysmal', meaning: 'Water upon water. Repeated danger; maintain sincerity and flow like water through peril.' },
  // Lower=Fire(101), Upper=Fire(101) — 离为火
  '101101': { number: 30, nameZh: '离', namePinyin: 'Lí', nameEn: 'The Clinging', meaning: 'Fire upon fire. Radiance and clarity through dependence; cling to what is right and illuminate others.' },
  // Lower=Mountain(001), Upper=Lake(110) — 泽山咸
  '001110': { number: 31, nameZh: '咸', namePinyin: 'Xián', nameEn: 'Influence', meaning: 'Lake above mountain. Mutual attraction and resonance; openness and sensitivity draw others near.' },
  // Lower=Wind(011), Upper=Thunder(100) — 雷风恒
  '011100': { number: 32, nameZh: '恒', namePinyin: 'Héng', nameEn: 'Duration', meaning: 'Thunder above wind. Enduring consistency; perseverance in the right course brings lasting success.' },
  // Lower=Mountain(001), Upper=Heaven(111) — 天山遁
  '001111': { number: 33, nameZh: '遁', namePinyin: 'Dùn', nameEn: 'Retreat', meaning: 'Heaven above mountain. Strategic withdrawal; retreating at the right time preserves strength.' },
  // Lower=Heaven(111), Upper=Thunder(100) — 雷天大壮
  '111100': { number: 34, nameZh: '大壮', namePinyin: 'Dà Zhuàng', nameEn: 'Great Power', meaning: 'Thunder above heaven. Overwhelming strength; power must be guided by righteousness.' },
  // Lower=Earth(000), Upper=Fire(101) — 火地晋
  '000101': { number: 35, nameZh: '晋', namePinyin: 'Jìn', nameEn: 'Progress', meaning: 'Fire above earth. The sun rises over the earth; rapid advancement and recognition.' },
  // Lower=Fire(101), Upper=Earth(000) — 地火明夷
  '101000': { number: 36, nameZh: '明夷', namePinyin: 'Míng Yí', nameEn: 'Darkening of the Light', meaning: 'Earth above fire. Brilliance hidden within; protect your inner light in adverse times.' },
  // Lower=Fire(101), Upper=Wind(011) — 风火家人
  '101011': { number: 37, nameZh: '家人', namePinyin: 'Jiā Rén', nameEn: 'The Family', meaning: 'Wind above fire. Order within the household; proper roles and relationships bring harmony.' },
  // Lower=Lake(110), Upper=Fire(101) — 火泽睽
  '110101': { number: 38, nameZh: '睽', namePinyin: 'Kuí', nameEn: 'Opposition', meaning: 'Fire above lake. Estrangement and divergence; small matters can still be accomplished despite division.' },
  // Lower=Mountain(001), Upper=Water(010) — 水山蹇
  '001010': { number: 39, nameZh: '蹇', namePinyin: 'Jiǎn', nameEn: 'Obstruction', meaning: 'Water above mountain. Dangerous obstacles ahead; turn inward and seek allies to overcome hardship.' },
  // Lower=Water(010), Upper=Thunder(100) — 雷水解
  '010100': { number: 40, nameZh: '解', namePinyin: 'Xiè', nameEn: 'Deliverance', meaning: 'Thunder above water. Release from tension; act swiftly to resolve issues then return to normalcy.' },
  // Lower=Lake(110), Upper=Mountain(001) — 山泽损
  '110001': { number: 41, nameZh: '损', namePinyin: 'Sǔn', nameEn: 'Decrease', meaning: 'Mountain above lake. Sacrifice below to benefit above; sincere decrease leads to eventual increase.' },
  // Lower=Thunder(100), Upper=Wind(011) — 风雷益
  '100011': { number: 42, nameZh: '益', namePinyin: 'Yì', nameEn: 'Increase', meaning: 'Wind above thunder. Benevolent increase from above; a time to undertake great projects.' },
  // Lower=Heaven(111), Upper=Lake(110) — 泽天夬
  '111110': { number: 43, nameZh: '夬', namePinyin: 'Guài', nameEn: 'Breakthrough', meaning: 'Lake above heaven. Resolute determination to remove corruption; proclaim the truth boldly.' },
  // Lower=Wind(011), Upper=Heaven(111) — 天风姤
  '011111': { number: 44, nameZh: '姤', namePinyin: 'Gòu', nameEn: 'Coming to Meet', meaning: 'Heaven above wind. An unexpected encounter; be wary of yielding to inferior influences.' },
  // Lower=Earth(000), Upper=Lake(110) — 泽地萃
  '000110': { number: 45, nameZh: '萃', namePinyin: 'Cuì', nameEn: 'Gathering Together', meaning: 'Lake above earth. Assembly and congregation; gather resources and allies under a worthy leader.' },
  // Lower=Wind(011), Upper=Earth(000) — 地风升
  '011000': { number: 46, nameZh: '升', namePinyin: 'Shēng', nameEn: 'Pushing Upward', meaning: 'Earth above wind. Steady upward growth like a tree; effort and adaptability bring advancement.' },
  // Lower=Water(010), Upper=Lake(110) — 泽水困
  '010110': { number: 47, nameZh: '困', namePinyin: 'Kùn', nameEn: 'Oppression', meaning: 'Lake above water. Exhaustion and confinement; maintain inner strength despite external hardship.' },
  // Lower=Wind(011), Upper=Water(010) — 水风井
  '011010': { number: 48, nameZh: '井', namePinyin: 'Jǐng', nameEn: 'The Well', meaning: 'Water above wind. An inexhaustible source of nourishment; cultivate your depths to benefit all.' },
  // Lower=Fire(101), Upper=Lake(110) — 泽火革
  '101110': { number: 49, nameZh: '革', namePinyin: 'Gé', nameEn: 'Revolution', meaning: 'Lake above fire. Fundamental transformation; when the time is right, change is believed and embraced.' },
  // Lower=Wind(011), Upper=Fire(101) — 火风鼎
  '011101': { number: 50, nameZh: '鼎', namePinyin: 'Dǐng', nameEn: 'The Cauldron', meaning: 'Fire above wind. Sacred vessel of transformation; nourishing the worthy and offering to the divine.' },
  // Lower=Thunder(100), Upper=Thunder(100) — 震为雷
  '100100': { number: 51, nameZh: '震', namePinyin: 'Zhèn', nameEn: 'The Arousing', meaning: 'Thunder upon thunder. Shock and awakening; the fearful find courage through repeated challenge.' },
  // Lower=Mountain(001), Upper=Mountain(001) — 艮为山
  '001001': { number: 52, nameZh: '艮', namePinyin: 'Gèn', nameEn: 'Keeping Still', meaning: 'Mountain upon mountain. Stillness and meditation; know when to stop and find peace in non-action.' },
  // Lower=Mountain(001), Upper=Wind(011) — 风山渐
  '001011': { number: 53, nameZh: '渐', namePinyin: 'Jiàn', nameEn: 'Development', meaning: 'Wind above mountain. Gradual progress like a tree growing on a mountain; patient development.' },
  // Lower=Lake(110), Upper=Thunder(100) — 雷泽归妹
  '110100': { number: 54, nameZh: '归妹', namePinyin: 'Guī Mèi', nameEn: 'The Marrying Maiden', meaning: 'Thunder above lake. Subordinate position; accept limitations and act within proper bounds.' },
  // Lower=Fire(101), Upper=Thunder(100) — 雷火丰
  '101100': { number: 55, nameZh: '丰', namePinyin: 'Fēng', nameEn: 'Abundance', meaning: 'Thunder above fire. Fullness and brilliance at its peak; act decisively while abundance lasts.' },
  // Lower=Mountain(001), Upper=Fire(101) — 火山旅
  '001101': { number: 56, nameZh: '旅', namePinyin: 'Lǚ', nameEn: 'The Wanderer', meaning: 'Fire above mountain. The traveler; exercise caution and propriety when away from home.' },
  // Lower=Wind(011), Upper=Wind(011) — 巽为风
  '011011': { number: 57, nameZh: '巽', namePinyin: 'Xùn', nameEn: 'The Gentle', meaning: 'Wind upon wind. Gentle but persistent penetration; small continuous efforts achieve great results.' },
  // Lower=Lake(110), Upper=Lake(110) — 兑为泽
  '110110': { number: 58, nameZh: '兑', namePinyin: 'Duì', nameEn: 'The Joyous', meaning: 'Lake upon lake. Joy and open communication; genuine gladness comes from inner truth shared freely.' },
  // Lower=Water(010), Upper=Wind(011) — 风水涣
  '010011': { number: 59, nameZh: '涣', namePinyin: 'Huàn', nameEn: 'Dispersion', meaning: 'Wind above water. Dissolving barriers and rigidity; spiritual practice and sincerity reunite the scattered.' },
  // Lower=Lake(110), Upper=Water(010) — 水泽节
  '110010': { number: 60, nameZh: '节', namePinyin: 'Jié', nameEn: 'Limitation', meaning: 'Water above lake. Proper boundaries and restraint; moderation preserves resources and sustains joy.' },
  // Lower=Lake(110), Upper=Wind(011) — 风泽中孚
  '110011': { number: 61, nameZh: '中孚', namePinyin: 'Zhōng Fú', nameEn: 'Inner Truth', meaning: 'Wind above lake. Sincerity at the core; inner truth influences even the most resistant forces.' },
  // Lower=Mountain(001), Upper=Thunder(100) — 雷山小过
  '001100': { number: 62, nameZh: '小过', namePinyin: 'Xiǎo Guò', nameEn: 'Small Excess', meaning: 'Thunder above mountain. Small matters succeed while great undertakings do not; attend to details.' },
  // Lower=Fire(101), Upper=Water(010) — 水火既济
  '101010': { number: 63, nameZh: '既济', namePinyin: 'Jì Jì', nameEn: 'After Completion', meaning: 'Water above fire. Everything in its place; success achieved but vigilance is needed to maintain it.' },
  // Lower=Water(010), Upper=Fire(101) — 火水未济
  '010101': { number: 64, nameZh: '未济', namePinyin: 'Wèi Jì', nameEn: 'Before Completion', meaning: 'Fire above water. The final transition is not yet complete; careful discernment guides the last steps.' },
};
