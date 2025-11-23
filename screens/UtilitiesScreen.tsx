import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Paragraph, Title, Surface } from "react-native-paper";
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
  getSpacing,
} from "../src";

type Page =
  | "home"
  | "getting-started"
  | "components"
  | "layout"
  | "theming"
  | "utilities";

interface UtilitiesScreenProps {
  onNavigate: (page: Page) => void;
}

export const UtilitiesScreen: React.FC<UtilitiesScreenProps> = ({
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
          Styling Utilities
        </ResponsiveText>

        {/* Spacing */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Spacing</Title>
            <Paragraph style={margin.top(2)}>
              Use the spacing scale based on 8px grid:
            </Paragraph>
            <CodeBlock>
              {`import { padding, margin, getSpacing } from 'rn-expo-core';

// Padding utilities
padding.all(4)      // 16px all sides
padding.horizontal(2) // 8px left/right
padding.vertical(3)  // 12px top/bottom

// Margin utilities
margin.top(2)        // 8px top
margin.bottom(4)     // 16px bottom

// Get spacing value
getSpacing(4)        // Returns 16`}
            </CodeBlock>
            <View style={margin.top(3)}>
              {[1, 2, 4, 6].map((spacing) => (
                <View
                  key={spacing}
                  style={[
                    padding.all(spacing),
                    margin.bottom(1),
                    borderRadius.sm,
                    { backgroundColor: theme.colors.primaryContainer },
                  ]}
                >
                  <ResponsiveText>
                    Spacing: {spacing} ({getSpacing(spacing)}px)
                  </ResponsiveText>
                </View>
              ))}
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Flexbox */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Flexbox Utilities</Title>
            <Paragraph style={margin.top(2)}>
              Common flexbox patterns:
            </Paragraph>
            <CodeBlock>
              {`import { flex } from 'rn-expo-core';

// Row layout
flex.row
flex.spaceBetween
flex.center
flex.wrap

// Column layout
flex.column
flex.alignCenter`}
            </CodeBlock>
            <View
              style={[
                margin.top(3),
                flex.row,
                flex.spaceBetween,
                padding.all(3),
                borderRadius.md,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Surface style={[padding.all(2), borderRadius.sm]}>
                <ResponsiveText>Item 1</ResponsiveText>
              </Surface>
              <Surface style={[padding.all(2), borderRadius.sm]}>
                <ResponsiveText>Item 2</ResponsiveText>
              </Surface>
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Border Radius */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Border Radius</Title>
            <Paragraph style={margin.top(2)}>
              Predefined border radius values:
            </Paragraph>
            <CodeBlock>
              {`import { borderRadius } from 'rn-expo-core';

borderRadius.sm   // Small
borderRadius.md   // Medium
borderRadius.lg   // Large
borderRadius.full // Full circle`}
            </CodeBlock>
            <View style={[margin.top(3), flex.row, flex.wrap, { gap: 12 }]}>
              <View
                style={[
                  styles.radiusExample,
                  borderRadius.sm,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <View
                style={[
                  styles.radiusExample,
                  borderRadius.md,
                  { backgroundColor: theme.colors.secondary },
                ]}
              />
              <View
                style={[
                  styles.radiusExample,
                  borderRadius.lg,
                  { backgroundColor: theme.colors.tertiary },
                ]}
              />
              <View
                style={[
                  styles.radiusExample,
                  borderRadius.full,
                  { backgroundColor: theme.colors.error },
                ]}
              />
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
  radiusExample: {
    width: 60,
    height: 60,
  },
});
