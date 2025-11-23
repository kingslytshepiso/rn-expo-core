import {
  getBreakpoint,
  getDeviceType,
  matchesBreakpoint,
} from "../breakpoints";

describe("Breakpoints", () => {
  describe("getBreakpoint", () => {
    it("should return xs for small widths", () => {
      expect(getBreakpoint(100)).toBe("xs");
      expect(getBreakpoint(575)).toBe("xs");
    });

    it("should return sm for small breakpoint", () => {
      expect(getBreakpoint(576)).toBe("sm");
      expect(getBreakpoint(767)).toBe("sm");
    });

    it("should return md for medium breakpoint", () => {
      expect(getBreakpoint(768)).toBe("md");
      expect(getBreakpoint(991)).toBe("md");
    });

    it("should return lg for large breakpoint", () => {
      expect(getBreakpoint(992)).toBe("lg");
      expect(getBreakpoint(1199)).toBe("lg");
    });

    it("should return xl for extra large breakpoint", () => {
      expect(getBreakpoint(1200)).toBe("xl");
      expect(getBreakpoint(1399)).toBe("xl");
    });

    it("should return xxl for extra extra large breakpoint", () => {
      expect(getBreakpoint(1400)).toBe("xxl");
      expect(getBreakpoint(2000)).toBe("xxl");
    });
  });

  describe("getDeviceType", () => {
    it("should return mobile for small widths", () => {
      expect(getDeviceType(500)).toBe("mobile");
      expect(getDeviceType(767)).toBe("mobile");
    });

    it("should return tablet for medium widths", () => {
      expect(getDeviceType(768)).toBe("tablet");
      expect(getDeviceType(991)).toBe("tablet");
    });

    it("should return desktop for large widths", () => {
      expect(getDeviceType(992)).toBe("desktop");
      expect(getDeviceType(1200)).toBe("desktop");
    });
  });

  describe("matchesBreakpoint", () => {
    it("should return true when width matches breakpoint", () => {
      expect(matchesBreakpoint(800, "md")).toBe(true);
      expect(matchesBreakpoint(1000, "lg")).toBe(true);
    });

    it("should return false when width does not match breakpoint", () => {
      expect(matchesBreakpoint(500, "md")).toBe(false);
      expect(matchesBreakpoint(700, "lg")).toBe(false);
    });
  });
});
