import {
  flex,
  padding,
  margin,
  borderRadius,
  width,
  height,
} from "../layoutStyles";
import { getSpacing } from "../spacing";

describe("Layout Styles", () => {
  describe("flex", () => {
    it("should have row direction", () => {
      expect(flex.row.flexDirection).toBe("row");
    });

    it("should have column direction", () => {
      expect(flex.column.flexDirection).toBe("column");
    });

    it("should have wrap", () => {
      expect(flex.wrap.flexWrap).toBe("wrap");
    });

    it("should have center alignment", () => {
      expect(flex.center.justifyContent).toBe("center");
      expect(flex.center.alignItems).toBe("center");
    });

    it("should have spaceBetween", () => {
      expect(flex.spaceBetween.justifyContent).toBe("space-between");
    });
  });

  describe("padding", () => {
    it("should apply padding to all sides", () => {
      const result = padding.all(2);
      expect(result.padding).toBe(getSpacing(2));
    });

    it("should apply horizontal padding", () => {
      const result = padding.horizontal(4);
      expect(result.paddingHorizontal).toBe(getSpacing(4));
    });

    it("should apply vertical padding", () => {
      const result = padding.vertical(3);
      expect(result.paddingVertical).toBe(getSpacing(3));
    });

    it("should apply top padding", () => {
      const result = padding.top(2);
      expect(result.paddingTop).toBe(getSpacing(2));
    });

    it("should apply bottom padding", () => {
      const result = padding.bottom(4);
      expect(result.paddingBottom).toBe(getSpacing(4));
    });

    it("should apply left padding", () => {
      const result = padding.left(1);
      expect(result.paddingLeft).toBe(getSpacing(1));
    });

    it("should apply right padding", () => {
      const result = padding.right(2);
      expect(result.paddingRight).toBe(getSpacing(2));
    });

    it("should handle number values directly", () => {
      const result = padding.all(25);
      expect(result.padding).toBe(25);
    });
  });

  describe("margin", () => {
    it("should apply margin to all sides", () => {
      const result = margin.all(2);
      expect(result.margin).toBe(getSpacing(2));
    });

    it("should apply horizontal margin", () => {
      const result = margin.horizontal(4);
      expect(result.marginHorizontal).toBe(getSpacing(4));
    });

    it("should apply vertical margin", () => {
      const result = margin.vertical(3);
      expect(result.marginVertical).toBe(getSpacing(3));
    });

    it("should apply top margin", () => {
      const result = margin.top(2);
      expect(result.marginTop).toBe(getSpacing(2));
    });

    it("should apply bottom margin", () => {
      const result = margin.bottom(4);
      expect(result.marginBottom).toBe(getSpacing(4));
    });

    it("should apply left margin", () => {
      const result = margin.left(1);
      expect(result.marginLeft).toBe(getSpacing(1));
    });

    it("should apply right margin", () => {
      const result = margin.right(2);
      expect(result.marginRight).toBe(getSpacing(2));
    });
  });

  describe("borderRadius", () => {
    it("should have none", () => {
      expect(borderRadius.none.borderRadius).toBe(0);
    });

    it("should have small radius", () => {
      expect(borderRadius.sm.borderRadius).toBe(4);
    });

    it("should have medium radius", () => {
      expect(borderRadius.md.borderRadius).toBe(8);
    });

    it("should have large radius", () => {
      expect(borderRadius.lg.borderRadius).toBe(12);
    });

    it("should have extra large radius", () => {
      expect(borderRadius.xl.borderRadius).toBe(16);
    });

    it("should have full radius", () => {
      expect(borderRadius.full.borderRadius).toBe(9999);
    });

    it("should allow custom radius", () => {
      const result = borderRadius.custom(20);
      expect(result.borderRadius).toBe(20);
    });
  });

  describe("width", () => {
    it("should have full width", () => {
      expect(width.full.width).toBe("100%");
    });

    it("should have half width", () => {
      expect(width.half.width).toBe("50%");
    });

    it("should have fixed width", () => {
      const result = width.fixed(200);
      expect(result.width).toBe(200);
    });
  });

  describe("height", () => {
    it("should have full height", () => {
      expect(height.full.height).toBe("100%");
    });

    it("should have half height", () => {
      expect(height.half.height).toBe("50%");
    });

    it("should have fixed height", () => {
      const result = height.fixed(300);
      expect(result.height).toBe(300);
    });
  });
});
