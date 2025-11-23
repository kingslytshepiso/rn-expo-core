import { lightTheme, darkTheme } from "../themeConfig";

describe("Theme Configuration", () => {
  it("should have light theme with correct colors", () => {
    expect(lightTheme.colors.primary).toBe("#6200ee");
    expect(lightTheme.colors.surface).toBe("#ffffff");
    expect(lightTheme.colors.background).toBe("#ffffff");
  });

  it("should have dark theme with correct colors", () => {
    expect(darkTheme.colors.primary).toBe("#bb86fc");
    expect(darkTheme.colors.surface).toBe("#121212");
    expect(darkTheme.colors.background).toBe("#121212");
  });

  it("should have font configurations", () => {
    expect(lightTheme.fonts.displayLarge).toBeDefined();
    expect(lightTheme.fonts.bodyMedium).toBeDefined();
    expect(darkTheme.fonts.titleLarge).toBeDefined();
  });
});

