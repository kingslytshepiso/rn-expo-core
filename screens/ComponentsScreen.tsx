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

interface ComponentsScreenProps {
  onNavigate: (page: Page) => void;
}

export const ComponentsScreen: React.FC<ComponentsScreenProps> = ({
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
          Components
        </ResponsiveText>

        {/* ResponsiveContainer */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>ResponsiveContainer</Title>
            <Paragraph style={margin.top(2)}>
              A container component that adapts its max width and padding based
              on device size.
            </Paragraph>
            <CodeBlock>
              {`<ResponsiveContainer
  maxWidth={{ md: 768, lg: 1200 }}
  padding={16}
>
  <YourContent />
</ResponsiveContainer>`}
            </CodeBlock>
            <View
              style={[
                margin.top(3),
                padding.all(3),
                borderRadius.md,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <ResponsiveText>
                Live Example: This container adapts!
              </ResponsiveText>
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* ResponsiveText */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>ResponsiveText</Title>
            <Paragraph style={margin.top(2)}>
              Text component with responsive font sizes based on device type.
            </Paragraph>
            <CodeBlock>
              {`<ResponsiveText variant="headline">
  Headline Text
</ResponsiveText>
<ResponsiveText variant="body">
  Body Text
</ResponsiveText>`}
            </CodeBlock>
            <View style={margin.top(3)}>
              <ResponsiveText variant="headline" style={margin.bottom(1)}>
                Headline Example
              </ResponsiveText>
              <ResponsiveText variant="title" style={margin.bottom(1)}>
                Title Example
              </ResponsiveText>
              <ResponsiveText variant="body">
                Body text example that adapts to screen size
              </ResponsiveText>
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* ResponsiveCard */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>ResponsiveCard</Title>
            <Paragraph style={margin.top(2)}>
              A card component with responsive padding and margins.
            </Paragraph>
            <CodeBlock>
              {`<ResponsiveCard
  margin={16}
  padding={12}
>
  <Card.Content>
    <Title>Card Title</Title>
    <Paragraph>Card content</Paragraph>
  </Card.Content>
</ResponsiveCard>`}
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
