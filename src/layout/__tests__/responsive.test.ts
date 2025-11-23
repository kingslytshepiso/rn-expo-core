import { getResponsiveValue, ResponsiveValue } from "../responsive";

describe("Responsive Utilities", () => {
  describe("getResponsiveValue", () => {
    it("should return value directly when not an object", () => {
      expect(getResponsiveValue(10, 500)).toBe(10);
      expect(getResponsiveValue("test", 500)).toBe("test");
      expect(getResponsiveValue(true, 500)).toBe(true);
    });

    it("should return correct value for breakpoint", () => {
      const responsive: ResponsiveValue<number> = {
        xs: 10,
        sm: 20,
        md: 30,
        lg: 40,
      };

      expect(getResponsiveValue(responsive, 100)).toBe(10); // xs
      expect(getResponsiveValue(responsive, 600)).toBe(20); // sm
      expect(getResponsiveValue(responsive, 800)).toBe(30); // md
      expect(getResponsiveValue(responsive, 1000)).toBe(40); // lg
    });

    it("should return largest matching breakpoint", () => {
      const responsive: ResponsiveValue<number> = {
        md: 30,
        lg: 40,
      };

      expect(getResponsiveValue(responsive, 1200)).toBe(40); // lg (matches both, should use larger)
    });
  });
});

