import { useTheme as usePaperTheme } from "react-native-paper";
import { AppTheme } from "./themeConfig";

export const useTheme = (): AppTheme => {
  return usePaperTheme() as AppTheme;
};

