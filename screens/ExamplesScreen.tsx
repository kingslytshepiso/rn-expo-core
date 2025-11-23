import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  Surface,
  Title,
} from "react-native-paper";
import {
  ResponsiveCard,
  ResponsiveContainer,
  ResponsiveText,
} from "../src/components";
import { useLayout } from "../src/layout";
import { borderRadius, flex, margin, padding } from "../src/styles";
import { useTheme } from "../src/theme";

export const ExamplesScreen: React.FC = () => {
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
        {/* Header Section */}
        <View style={styles.header}>
          <ResponsiveText variant="headline" style={styles.title}>
            Component Utility Package Examples
          </ResponsiveText>
          <ResponsiveText variant="body" style={styles.subtitle}>
            Demonstrating theming, layout tracking, and responsive components
          </ResponsiveText>
        </View>

        <Divider style={margin.bottom(4)} />

        {/* Layout Information Card */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Layout Information</Title>
            <Paragraph>Width: {layout.width}px</Paragraph>
            <Paragraph>Height: {layout.height}px</Paragraph>
            <Paragraph>Breakpoint: {layout.breakpoint}</Paragraph>
            <Paragraph>Device Type: {layout.deviceType}</Paragraph>
            <Paragraph>
              Orientation: {layout.isPortrait ? "Portrait" : "Landscape"}
            </Paragraph>
            <Paragraph>Is Mobile: {layout.isMobile ? "Yes" : "No"}</Paragraph>
            <Paragraph>Is Tablet: {layout.isTablet ? "Yes" : "No"}</Paragraph>
            <Paragraph>Is Desktop: {layout.isDesktop ? "Yes" : "No"}</Paragraph>
          </Card.Content>
        </ResponsiveCard>

        {/* Theme Colors Card */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Theme Colors</Title>
            <View style={[flex.row, flex.wrap, styles.colorGrid]}>
              <ColorSwatch color={theme.colors.primary} label="Primary" />
              <ColorSwatch color={theme.colors.secondary} label="Secondary" />
              <ColorSwatch color={theme.colors.tertiary} label="Tertiary" />
              <ColorSwatch color={theme.colors.error} label="Error" />
              <ColorSwatch color={theme.colors.surface} label="Surface" />
              <ColorSwatch color={theme.colors.background} label="Background" />
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Responsive Text Examples */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Responsive Text Examples</Title>
            <ResponsiveText variant="headline" style={margin.bottom(2)}>
              Headline Text
            </ResponsiveText>
            <ResponsiveText variant="title" style={margin.bottom(2)}>
              Title Text
            </ResponsiveText>
            <ResponsiveText variant="body" style={margin.bottom(2)}>
              Body Text - This adjusts based on device size
            </ResponsiveText>
            <ResponsiveText variant="label">Label Text</ResponsiveText>
          </Card.Content>
        </ResponsiveCard>

        {/* Layout Utilities Examples */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Layout Utilities</Title>
            <View
              style={[
                flex.row,
                flex.spaceBetween,
                padding.all(3),
                borderRadius.md,
                { backgroundColor: theme.colors.surfaceVariant },
                margin.bottom(2),
              ]}
            >
              <Surface style={[padding.all(2), borderRadius.sm]}>
                <ResponsiveText>Flex Row</ResponsiveText>
              </Surface>
              <Surface style={[padding.all(2), borderRadius.sm]}>
                <ResponsiveText>Space Between</ResponsiveText>
              </Surface>
            </View>
            <View
              style={[
                flex.column,
                flex.center,
                padding.all(3),
                borderRadius.md,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Surface
                style={[padding.all(2), borderRadius.sm, margin.bottom(1)]}
              >
                <ResponsiveText>Flex Column</ResponsiveText>
              </Surface>
              <Surface style={[padding.all(2), borderRadius.sm]}>
                <ResponsiveText>Centered</ResponsiveText>
              </Surface>
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Spacing Examples */}
        <ResponsiveCard margin={layout.isDesktop ? 16 : 12}>
          <Card.Content>
            <Title>Spacing Examples</Title>
            <View style={flex.column}>
              {[1, 2, 4, 6, 8].map((spacing) => (
                <View
                  key={spacing}
                  style={[
                    padding.all(spacing),
                    margin.bottom(1),
                    borderRadius.sm,
                    { backgroundColor: theme.colors.primaryContainer },
                  ]}
                >
                  <ResponsiveText>Spacing: {spacing}</ResponsiveText>
                </View>
              ))}
            </View>
          </Card.Content>
        </ResponsiveCard>

        {/* Responsive Container Example */}
        <ResponsiveCard>
          <Card.Content>
            <Title>Responsive Container</Title>
            <Paragraph>
              This container adapts its max width and padding based on the
              device size. On desktop, it has a max width of 1200px and larger
              padding. On mobile, it uses full width with smaller padding.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => console.log("Button pressed")}
              style={margin.top(3)}
            >
              Example Button
            </Button>
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
    <View style={[styles.colorSwatch, margin.bottom(2)]}>
      <View
        style={[styles.colorBox, { backgroundColor: color }, borderRadius.md]}
      />
      <ResponsiveText variant="label" style={styles.colorLabel}>
        {label}
      </ResponsiveText>
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
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  colorGrid: {
    marginTop: 16,
  },
  colorSwatch: {
    width: "48%",
    alignItems: "center",
  },
  colorBox: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  colorLabel: {
    textAlign: "center",
  },
});
