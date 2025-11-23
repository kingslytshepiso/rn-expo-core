import { getSpacing, spacing } from "../spacing";

describe("Spacing", () => {
  it("should return correct spacing values from keys", () => {
    expect(getSpacing(0)).toBe(0);
    expect(getSpacing(1)).toBe(4);
    expect(getSpacing(2)).toBe(8);
    expect(getSpacing(4)).toBe(16);
    expect(getSpacing(8)).toBe(32);
  });

  it("should return number value when passed directly (not a spacing key)", () => {
    expect(getSpacing(10)).toBe(40); // 10 is a spacing key, returns spacing[10] = 40
    expect(getSpacing(25)).toBe(25); // 25 is not a spacing key, returns 25
  });

  it("should have all spacing keys defined", () => {
    expect(spacing[0]).toBe(0);
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[64]).toBe(256);
  });
});
