import { ViewStyle } from "react-native";
import { getSpacing, SpacingKey } from "./spacing";

/**
 * Flexbox layout utilities
 */
export const flex = {
  row: {
    flexDirection: "row" as const,
  },
  column: {
    flexDirection: "column" as const,
  },
  wrap: {
    flexWrap: "wrap" as const,
  },
  nowrap: {
    flexWrap: "nowrap" as const,
  },
  center: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  centerHorizontal: {
    alignItems: "center" as const,
  },
  centerVertical: {
    justifyContent: "center" as const,
  },
  spaceBetween: {
    justifyContent: "space-between" as const,
  },
  spaceAround: {
    justifyContent: "space-around" as const,
  },
  spaceEvenly: {
    justifyContent: "space-evenly" as const,
  },
  start: {
    justifyContent: "flex-start" as const,
    alignItems: "flex-start" as const,
  },
  end: {
    justifyContent: "flex-end" as const,
    alignItems: "flex-end" as const,
  },
  stretch: {
    alignItems: "stretch" as const,
  },
} as const;

/**
 * Padding utilities
 */
export const padding = {
  all: (value: SpacingKey | number): ViewStyle => ({
    padding: getSpacing(value),
  }),
  horizontal: (value: SpacingKey | number): ViewStyle => ({
    paddingHorizontal: getSpacing(value),
  }),
  vertical: (value: SpacingKey | number): ViewStyle => ({
    paddingVertical: getSpacing(value),
  }),
  top: (value: SpacingKey | number): ViewStyle => ({
    paddingTop: getSpacing(value),
  }),
  bottom: (value: SpacingKey | number): ViewStyle => ({
    paddingBottom: getSpacing(value),
  }),
  left: (value: SpacingKey | number): ViewStyle => ({
    paddingLeft: getSpacing(value),
  }),
  right: (value: SpacingKey | number): ViewStyle => ({
    paddingRight: getSpacing(value),
  }),
};

/**
 * Margin utilities
 */
export const margin = {
  all: (value: SpacingKey | number): ViewStyle => ({
    margin: getSpacing(value),
  }),
  horizontal: (value: SpacingKey | number): ViewStyle => ({
    marginHorizontal: getSpacing(value),
  }),
  vertical: (value: SpacingKey | number): ViewStyle => ({
    marginVertical: getSpacing(value),
  }),
  top: (value: SpacingKey | number): ViewStyle => ({
    marginTop: getSpacing(value),
  }),
  bottom: (value: SpacingKey | number): ViewStyle => ({
    marginBottom: getSpacing(value),
  }),
  left: (value: SpacingKey | number): ViewStyle => ({
    marginLeft: getSpacing(value),
  }),
  right: (value: SpacingKey | number): ViewStyle => ({
    marginRight: getSpacing(value),
  }),
};

/**
 * Width utilities
 */
export const width = {
  full: { width: "100%" as const },
  half: { width: "50%" as const },
  third: { width: "33.333%" as const },
  quarter: { width: "25%" as const },
  auto: { width: "auto" as const },
  fixed: (value: number): ViewStyle => ({ width: value }),
};

/**
 * Height utilities
 */
export const height = {
  full: { height: "100%" as const },
  half: { height: "50%" as const },
  third: { height: "33.333%" as const },
  quarter: { height: "25%" as const },
  auto: { height: "auto" as const },
  fixed: (value: number): ViewStyle => ({ height: value }),
};

/**
 * Position utilities
 */
export const position = {
  absolute: { position: "absolute" as const },
  relative: { position: "relative" as const },
  fixed: { position: "absolute" as const }, // React Native doesn't have fixed
};

/**
 * Border radius utilities
 */
export const borderRadius = {
  none: { borderRadius: 0 },
  sm: { borderRadius: 4 },
  md: { borderRadius: 8 },
  lg: { borderRadius: 12 },
  xl: { borderRadius: 16 },
  full: { borderRadius: 9999 },
  custom: (value: number): ViewStyle => ({ borderRadius: value }),
};
