#!/usr/bin/env python3
"""
Complete I Ching (易经) Hexagram Reference
==========================================

Encoding scheme:
- Each hexagram is a 6-character string of '0' and '1'
- Index 0 = line 1 (bottom), index 5 = line 6 (top)
- 1 = yang (solid), 0 = yin (broken)
- Binary key = lower_trigram_bits (indices 0-2) + upper_trigram_bits (indices 3-5)

Trigram encodings (index 0 = bottom line of trigram):
  乾 Qian  (Heaven)   ☰ = 111
  坤 Kun   (Earth)    ☷ = 000
  震 Zhen  (Thunder)  ☳ = 100
  坎 Kan   (Water)    ☵ = 010
  艮 Gen   (Mountain) ☶ = 001
  巽 Xun   (Wind)     ☴ = 011
  离 Li    (Fire)     ☲ = 101
  兑 Dui   (Lake)     ☱ = 110
"""

# Trigram definitions: name -> (chinese, symbol, binary)
TRIGRAMS = {
    "Qian":  ("乾", "☰", "111"),  # Heaven
    "Kun":   ("坤", "☷", "000"),  # Earth
    "Zhen":  ("震", "☳", "100"),  # Thunder
    "Kan":   ("坎", "☵", "010"),  # Water
    "Gen":   ("艮", "☶", "001"),  # Mountain
    "Xun":   ("巽", "☴", "011"),  # Wind/Wood
    "Li":    ("离", "☲", "101"),  # Fire
    "Dui":   ("兑", "☱", "110"),  # Lake/Marsh
}

# Reverse lookup: binary -> trigram name
BIN_TO_TRIGRAM = {v[2]: k for k, v in TRIGRAMS.items()}

# All 64 hexagrams in King Wen sequence
# Format: (number, chinese, pinyin, english, binary)
# Binary is bottom-to-top: index 0 = line 1 (bottom), index 5 = line 6 (top)
# Source: Wikibooks "I Ching/The 64 Hexagrams" (Alfred Huang translations)
HEXAGRAMS_RAW = [
    ( 1, "乾",   "qián",       "Initiating (The Creative)",         "111111"),
    ( 2, "坤",   "kūn",        "Responding (The Receptive)",        "000000"),
    ( 3, "屯",   "zhūn",       "Beginning (Difficulty at Start)",   "010001"),
    ( 4, "蒙",   "méng",       "Childhood (Youthful Folly)",        "100010"),
    ( 5, "需",   "xū",         "Needing (Waiting)",                 "010111"),
    ( 6, "訟",   "sòng",       "Contention (Conflict)",             "111010"),
    ( 7, "師",   "shī",        "Multitude (The Army)",              "000010"),
    ( 8, "比",   "bǐ",         "Union (Holding Together)",          "010000"),
    ( 9, "小畜", "xiǎo chù",   "Little Accumulation (Small Taming)","110111"),
    (10, "履",   "lǚ",         "Fulfillment (Treading)",            "111011"),
    (11, "泰",   "tài",        "Advance (Peace)",                   "000111"),
    (12, "否",   "pǐ",         "Hindrance (Standstill)",            "111000"),
    (13, "同人", "tóng rén",   "Seeking Harmony (Fellowship)",      "111101"),
    (14, "大有", "dà yǒu",     "Great Harvest (Great Possession)",  "101111"),
    (15, "謙",   "qiān",       "Humbleness (Modesty)",              "000100"),
    (16, "豫",   "yù",         "Delight (Enthusiasm)",              "001000"),
    (17, "隨",   "suí",        "Following",                         "011001"),
    (18, "蠱",   "gǔ",         "Remedying (Work on the Decayed)",   "100110"),
    (19, "臨",   "lín",        "Approaching",                       "000011"),
    (20, "觀",   "guān",       "Watching (Contemplation)",          "110000"),
    (21, "噬嗑", "shì kè",     "Eradicating (Biting Through)",      "101001"),
    (22, "賁",   "bì",         "Adorning (Grace)",                  "100101"),
    (23, "剝",   "bō",         "Falling Away (Splitting Apart)",    "100000"),
    (24, "復",   "fù",         "Turning Back (Return)",             "000001"),
    (25, "無妄", "wú wàng",    "Without Falsehood (Innocence)",     "111001"),
    (26, "大畜", "dà chù",     "Great Accumulation (Great Taming)", "100111"),
    (27, "頤",   "yí",         "Nourishing (Jaws)",                 "100001"),
    (28, "大過", "dà guò",     "Great Exceeding (Preponderance)",   "011110"),
    (29, "坎",   "kǎn",        "Darkness (The Abysmal, Water)",     "010010"),
    (30, "離",   "lí",         "Brightness (The Clinging, Fire)",   "101101"),
    (31, "咸",   "xián",       "Mutual Influence (Influence)",      "011100"),
    (32, "恆",   "héng",       "Long Lasting (Duration)",           "001110"),
    (33, "遯",   "dùn",        "Retreat",                           "111100"),
    (34, "大壯", "dà zhuàng",  "Great Strength (Great Power)",      "001111"),
    (35, "晉",   "jìn",        "Proceeding Forward (Progress)",     "101000"),
    (36, "明夷", "míng yí",    "Brilliance Injured (Darkening)",    "000101"),
    (37, "家人", "jiā rén",    "Household (The Family)",            "110101"),
    (38, "睽",   "kuí",        "Diversity (Opposition)",            "101011"),
    (39, "蹇",   "jiǎn",       "Hardship (Obstruction)",            "010100"),
    (40, "解",   "xiè",        "Relief (Deliverance)",              "001010"),
    (41, "損",   "sǔn",        "Decreasing (Decrease)",             "100011"),
    (42, "益",   "yì",         "Increasing (Increase)",             "110001"),
    (43, "夬",   "guài",       "Eliminating (Breakthrough)",        "011111"),
    (44, "姤",   "gòu",        "Encountering (Coming to Meet)",     "111110"),
    (45, "萃",   "cuì",        "Bringing Together (Gathering)",     "011000"),
    (46, "升",   "shēng",      "Growing Upward (Pushing Upward)",   "000110"),
    (47, "困",   "kùn",        "Exhausting (Oppression)",           "011010"),
    (48, "井",   "jǐng",       "Replenishing (The Well)",           "010110"),
    (49, "革",   "gé",         "Abolishing the Old (Revolution)",   "011101"),
    (50, "鼎",   "dǐng",       "Establishing the New (The Caldron)","101110"),
    (51, "震",   "zhèn",       "Taking Action (The Arousing)",      "001001"),
    (52, "艮",   "gèn",        "Keeping Still (Stillness)",         "100100"),
    (53, "漸",   "jiàn",       "Developing Gradually (Development)","110100"),
    (54, "歸妹", "guī mèi",    "Marrying Maiden",                   "001011"),
    (55, "豐",   "fēng",       "Abundance (Fullness)",              "001101"),
    (56, "旅",   "lǚ",         "Travelling (The Wanderer)",         "101100"),
    (57, "巽",   "xùn",        "Proceeding Humbly (The Gentle)",    "110110"),
    (58, "兌",   "duì",        "Joyful (The Joyous)",               "011011"),
    (59, "渙",   "huàn",       "Dispersing (Dispersion)",           "110010"),
    (60, "節",   "jié",        "Restricting (Limitation)",          "010011"),
    (61, "中孚", "zhōng fú",   "Innermost Sincerity",               "110011"),
    (62, "小過", "xiǎo guò",   "Little Exceeding (Small Prepond.)", "001100"),
    (63, "既濟", "jì jì",      "Already Fulfilled (After Compl.)",  "010101"),
    (64, "未濟", "wèi jì",     "Not Yet Fulfilled (Before Compl.)", "101010"),
]


def decompose_hexagram(binary_str):
    """
    Decompose a 6-char binary string into lower and upper trigrams.
    binary_str[0:3] = lower trigram (lines 1-3)
    binary_str[3:6] = upper trigram (lines 4-6)
    """
    lower = binary_str[0:3]
    upper = binary_str[3:6]
    return lower, upper


def trigram_name(binary_trigram):
    """Look up trigram name from its 3-char binary code."""
    return BIN_TO_TRIGRAM.get(binary_trigram, "???")


def trigram_info(name):
    """Get full trigram info (chinese, symbol, binary)."""
    return TRIGRAMS.get(name, ("?", "?", "???"))


def verify_all():
    """Verify all 64 hexagrams and print the complete reference table."""
    print("=" * 120)
    print("COMPLETE I CHING HEXAGRAM REFERENCE - All 64 Hexagrams with Binary Keys")
    print("=" * 120)
    print(f"{'#':>3}  {'Chinese':<6} {'Pinyin':<14} {'English':<38} "
          f"{'Binary':^8} {'Lower Tri':^16} {'Upper Tri':^16}")
    print("-" * 120)

    errors = []
    for num, chinese, pinyin, english, binary in HEXAGRAMS_RAW:
        lower_bin, upper_bin = decompose_hexagram(binary)
        lower_name = trigram_name(lower_bin)
        upper_name = trigram_name(upper_bin)
        lower_info = trigram_info(lower_name)
        upper_info = trigram_info(upper_name)

        # Validate that trigrams are recognized
        if lower_name == "???" or upper_name == "???":
            errors.append((num, chinese, binary, lower_bin, upper_bin))

        lower_display = f"{lower_info[0]} {lower_name:<5} {lower_info[1]} ({lower_bin})"
        upper_display = f"{upper_info[0]} {upper_name:<5} {upper_info[1]} ({upper_bin})"

        print(f"{num:>3}  {chinese:<6} {pinyin:<14} {english:<38} "
              f"{binary:^8} {lower_display:<18} {upper_display:<18}")

    print("-" * 120)

    if errors:
        print(f"\nERRORS FOUND: {len(errors)} hexagrams have unrecognized trigrams:")
        for num, chinese, binary, lower, upper in errors:
            print(f"  Hex {num} ({chinese}): binary={binary}, "
                  f"lower={lower} ({trigram_name(lower)}), "
                  f"upper={upper} ({trigram_name(upper)})")
    else:
        print("\nVERIFICATION PASSED: All 64 hexagrams correctly decompose into valid trigrams.")

    # Cross-check: verify the 8x8 matrix from Wilhelm/Baynes
    # The matrix has lower trigrams as rows, upper trigrams as columns
    # Row/column order: Qian, Zhen, Kan, Gen, Kun, Xun, Li, Dui
    trigram_order = ["Qian", "Zhen", "Kan", "Gen", "Kun", "Xun", "Li", "Dui"]

    # Expected King Wen numbers from the Wilhelm/Baynes matrix (from Kheper site)
    # Rows = lower trigram, Columns = upper trigram
    wilhelm_matrix = [
        # Upper:  Qian  Zhen  Kan   Gen   Kun   Xun   Li    Dui
        [  1,    34,    5,   26,   11,    9,   14,   43],  # Lower: Qian
        [ 25,    51,    3,   27,   24,   42,   21,   17],  # Lower: Zhen
        [  6,    40,   29,    4,    7,   59,   64,   47],  # Lower: Kan
        [ 33,    62,   39,   52,   15,   53,   56,   31],  # Lower: Gen
        [ 12,    16,    8,   23,    2,   20,   35,   45],  # Lower: Kun
        [ 44,    32,   48,   18,   46,   57,   50,   28],  # Lower: Xun
        [ 13,    55,   63,   22,   36,   37,   30,   49],  # Lower: Li
        [ 10,    54,   60,   41,   19,   61,   38,   58],  # Lower: Dui
    ]

    print("\n" + "=" * 80)
    print("CROSS-CHECK: Verifying against Wilhelm/Baynes 8x8 trigram matrix")
    print("=" * 80)

    # Build a lookup: (lower_trigram_name, upper_trigram_name) -> King Wen number
    binary_to_num = {binary: num for num, _, _, _, binary in HEXAGRAMS_RAW}

    matrix_errors = []
    for row_idx, lower_tri_name in enumerate(trigram_order):
        for col_idx, upper_tri_name in enumerate(trigram_order):
            expected_num = wilhelm_matrix[row_idx][col_idx]
            lower_bin = TRIGRAMS[lower_tri_name][2]
            upper_bin = TRIGRAMS[upper_tri_name][2]
            full_binary = lower_bin + upper_bin
            actual_num = binary_to_num.get(full_binary, None)

            if actual_num != expected_num:
                matrix_errors.append(
                    f"  Lower={lower_tri_name}({lower_bin}) + "
                    f"Upper={upper_tri_name}({upper_bin}) = '{full_binary}': "
                    f"expected Hex {expected_num}, got Hex {actual_num}"
                )

    if matrix_errors:
        print(f"\nMATRIX CROSS-CHECK ERRORS ({len(matrix_errors)}):")
        for err in matrix_errors:
            print(err)
    else:
        print("\nMATRIX CROSS-CHECK PASSED: All 64 entries match the Wilhelm/Baynes matrix.")

    # Print the 8x8 lookup matrix
    print("\n" + "=" * 80)
    print("8x8 TRIGRAM LOOKUP MATRIX (Lower \\ Upper)")
    print("=" * 80)
    header = "Lower\\Upper  " + "  ".join(
        f"{TRIGRAMS[t][0]}{t:>5}" for t in trigram_order
    )
    print(header)
    print("-" * len(header))
    for row_idx, lower_tri in enumerate(trigram_order):
        row = f"{TRIGRAMS[lower_tri][0]} {lower_tri:<5}({TRIGRAMS[lower_tri][2]}) "
        for col_idx, upper_tri in enumerate(trigram_order):
            lower_bin = TRIGRAMS[lower_tri][2]
            upper_bin = TRIGRAMS[upper_tri][2]
            full_binary = lower_bin + upper_bin
            num = binary_to_num.get(full_binary, "??")
            row += f" {num:>4}  "
        print(row)

    # Print the binary key dictionary for easy copy-paste
    print("\n" + "=" * 80)
    print("BINARY KEY DICTIONARY (for direct use in code)")
    print("=" * 80)
    print("HEXAGRAM_BINARY = {")
    for num, chinese, pinyin, english, binary in HEXAGRAMS_RAW:
        lower_bin, upper_bin = decompose_hexagram(binary)
        lower_name = trigram_name(lower_bin)
        upper_name = trigram_name(upper_bin)
        print(f'    "{binary}": {num:>2},  '
              f'# {chinese} {english} '
              f'(lower={lower_name}, upper={upper_name})')
    print("}")

    print("\n# Reverse lookup: King Wen number -> binary key")
    print("HEXAGRAM_NUMBER = {")
    for num, chinese, pinyin, english, binary in HEXAGRAMS_RAW:
        print(f'    {num:>2}: "{binary}",  # {chinese} {english}')
    print("}")


if __name__ == "__main__":
    verify_all()
