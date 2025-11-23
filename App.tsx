import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/theme";
import { LayoutTracker } from "./src/layout";
import { ExamplesScreen } from "./screens/ExamplesScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>
          <ExamplesScreen />
          <StatusBar style="auto" />
        </LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
