/**
 * Spacing scale based on 8px grid system
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Get spacing value
 */
export const getSpacing = (key: SpacingKey | number): number => {
  // If it's a SpacingKey (string), return the spacing value
  if (typeof key !== "number") {
    return spacing[key] ?? 0;
  }
  // If it's a number and exists as a key in spacing, return the spacing value
  if (key in spacing) {
    return spacing[key as SpacingKey];
  }
  // If it's a number but not a key, return the number directly
  return key;
};
