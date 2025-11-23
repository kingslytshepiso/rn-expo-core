import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Paragraph, Title } from "react-native-paper";
import { CodeBlock } from "./CodeBlock";
import {
  ResponsiveCard,
  ResponsiveContainer,
  ResponsiveText,
  useLayout,
  borderRadius,
  flex,
  margin,
  padding,
  useTheme,
} from "../src";

type Page =
  | "home"
  | "getting-started"
  | "components"
  | "layout"
  | "theming"
  | "utilities";

interface ThemingScreenProps {
  onNavigate: (page: Page) => void;
}

export const ThemingScreen: React.FC<ThemingScreenProps> = ({ onNavigate }) => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ResponsiveContainer
        maxWidth={layout.isDesktop ? 1200 : undefined}
        padding={layout.isDesktop ? 24 : layout.isTablet ? 20 : 16}
      >
        <ResponsiveText variant="headline" style={margin.bottom(2)}>
          Theming
        </ResponsiveText>

        {/* Built-in Themes */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Built-in Themes</Title>
            <Paragraph style={margin.top(2)}>
              Use light, dark, or auto (follows system):
            </Paragraph>
            <CodeBlock>
              {`<AppProviders theme="auto">
  <App />
</AppProviders>

// Or
<ThemeProvider theme="light">
  <App />
</ThemeProvider>`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* Custom Themes */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Custom Themes</Title>
            <Paragraph style={margin.top(2)}>
              Pass your own React Native Paper theme:
            </Paragraph>
            <CodeBlock>
              {`import { MD3Theme } from 'rn-expo-core';
import { MD3LightTheme } from 'react-native-paper';

const customTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
  },
};

<AppProviders theme={customTheme}>
  <App />
</AppProviders>`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* useTheme Hook */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>useTheme Hook</Title>
            <Paragraph style={margin.top(2)}>
              Access theme colors and properties:
            </Paragraph>
            <CodeBlock>
              {`const theme = useTheme();

<View style={{ backgroundColor: theme.colors.primary }}>
  <Text style={{ color: theme.colors.onPrimary }}>
    Themed Text
  </Text>
</View>`}
            </CodeBlock>
            <View style={[margin.top(3), flex.row, flex.wrap, { gap: 12 }]}>
              <ColorSwatch color={theme.colors.primary} label="Primary" />
              <ColorSwatch color={theme.colors.secondary} label="Secondary" />
              <ColorSwatch color={theme.colors.tertiary} label="Tertiary" />
              <ColorSwatch color={theme.colors.error} label="Error" />
            </View>
          </Card.Content>
        </ResponsiveCard>
      </ResponsiveContainer>
    </ScrollView>
  );
};

interface ColorSwatchProps {
  color: string;
  label: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, label }) => {
  return (
    <View style={styles.colorSwatch}>
      <View
        style={[styles.colorBox, { backgroundColor: color }, borderRadius.md]}
      />
      <ResponsiveText variant="label">{label}</ResponsiveText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  colorSwatch: {
    alignItems: "center",
    width: 80,
  },
  colorBox: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
});
