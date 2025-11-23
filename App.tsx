import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Demo app imports from the package
import { ExamplesScreen } from "./screens/ExamplesScreen";
import { LayoutTracker, ThemeProvider } from "./src";

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
