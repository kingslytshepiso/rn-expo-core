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

interface LayoutScreenProps {
  onNavigate: (page: Page) => void;
}

export const LayoutScreen: React.FC<LayoutScreenProps> = ({ onNavigate }) => {
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
          Layout & Responsive Design
        </ResponsiveText>

        {/* useLayout Hook */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>useLayout Hook</Title>
            <Paragraph style={margin.top(2)}>
              Access real-time layout information and device type:
            </Paragraph>
            <CodeBlock>
              {`const {
  width,
  height,
  breakpoint,
  deviceType,
  isMobile,
  isTablet,
  isDesktop,
  matches
} = useLayout();`}
            </CodeBlock>
            <View
              style={[
                margin.top(3),
                padding.all(3),
                { backgroundColor: theme.colors.surfaceVariant },
                borderRadius.md,
              ]}
            >
              <ResponsiveText>Width: {layout.width}px</ResponsiveText>
              <ResponsiveText>Height: {layout.height}px</ResponsiveText>
              <ResponsiveText>Breakpoint: {layout.breakpoint}</ResponsiveText>
              <ResponsiveText>Device Type: {layout.deviceType}</ResponsiveText>
              <ResponsiveText>
                Is Mobile: {layout.isMobile ? "Yes" : "No"}
              </ResponsiveText>
              <ResponsiveText>
                Is Tablet: {layout.isTablet ? "Yes" : "No"}
              </ResponsiveText>
              <ResponsiveText>
                Is Desktop: {layout.isDesktop ? "Yes" : "No"}
              </ResponsiveText>
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Breakpoints */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Breakpoints</Title>
            <Paragraph style={margin.top(2)}>
              Predefined breakpoints for responsive design:
            </Paragraph>
            <CodeBlock>
              {`BREAKPOINTS = {
  xs: 0,    // Extra small (phones)
  sm: 576,  // Small (phones landscape)
  md: 768,  // Medium (tablets)
  lg: 992,  // Large (desktops)
  xl: 1200, // Extra large
  xxl: 1400 // Extra extra large
}`}
            </CodeBlock>
          </Card.Content>
        </ResponsiveCard>

        {/* Responsive Values */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Responsive Values</Title>
            <Paragraph style={margin.top(2)}>
              Use responsive values that adapt to breakpoints:
            </Paragraph>
            <CodeBlock>
              {`// Single value
padding={16}

// Responsive object
padding={{ xs: 8, md: 16, lg: 24 }}

// Function
padding={(width) => width > 768 ? 24 : 16}`}
            </CodeBlock>
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
});
