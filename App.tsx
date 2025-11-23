import { StatusBar } from "expo-status-bar";
import React from "react";
// Demo app imports from the package
import { DocumentationApp } from "./screens/DocumentationApp";
import { AppProviders } from "./src";

export default function App() {
  return (
    <AppProviders theme="auto">
      <DocumentationApp />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
