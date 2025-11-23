import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Paragraph, Title } from "react-native-paper";
import { CodeBlock } from "./CodeBlock";
import {
  ResponsiveCard,
  ResponsiveContainer,
  ResponsiveText,
  useLayout,
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

interface GettingStartedScreenProps {
  onNavigate: (page: Page) => void;
}

export const GettingStartedScreen: React.FC<GettingStartedScreenProps> = ({
  onNavigate,
}) => {
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
          Getting Started
        </ResponsiveText>

        {/* Installation */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Installation</Title>
            <Paragraph style={margin.top(2)}>
              Install the package and its peer dependencies:
            </Paragraph>
            <CodeBlock>
              {`npm install rn-expo-core
npx expo install react-native-paper react-native-safe-area-context react-native-screens`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* Quick Setup */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Quick Setup</Title>
            <Paragraph style={margin.top(2)}>
              Wrap your app with AppProviders:
            </Paragraph>
            <CodeBlock>
              {`import { AppProviders } from 'rn-expo-core';

export default function App() {
  return (
    <AppProviders theme="auto">
      <YourApp />
    </AppProviders>
  );
}`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* Individual Providers */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Individual Providers</Title>
            <Paragraph style={margin.top(2)}>
              For more control, use providers individually:
            </Paragraph>
            <CodeBlock>
              {`import { ThemeProvider, LayoutTracker } from 'rn-expo-core';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme="auto">
        <LayoutTracker>
          <YourApp />
        </LayoutTracker>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* Next Steps */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Next Steps</Title>
            <Paragraph style={margin.top(2)}>
              Explore the documentation to learn more:
            </Paragraph>
            <View style={styles.nextSteps}>
              <Card
                style={[
                  styles.stepCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
                onPress={() => onNavigate("components")}
              >
                <Card.Content>
                  <Title>Components →</Title>
                  <Paragraph>Learn about responsive components</Paragraph>
                </Card.Content>
              </Card>
              <Card
                style={[
                  styles.stepCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
                onPress={() => onNavigate("layout")}
              >
                <Card.Content>
                  <Title>Layout →</Title>
                  <Paragraph>Understand layout tracking</Paragraph>
                </Card.Content>
              </Card>
            </View>
          </Card.Content>
        </ResponsiveCard>
      </ResponsiveContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  nextSteps: {
    marginTop: 16,
    gap: 12,
  },
  stepCard: {
    marginBottom: 12,
  },
});
