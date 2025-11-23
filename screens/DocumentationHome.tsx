import React from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  Title,
  Surface,
} from "react-native-paper";
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

interface DocumentationHomeProps {
  onNavigate: (page: Page) => void;
}

export const DocumentationHome: React.FC<DocumentationHomeProps> = ({
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
        {/* Hero Section */}
        <View style={styles.hero}>
          <ResponsiveText variant="headline" style={styles.heroTitle}>
            rn-expo-core
          </ResponsiveText>
          <ResponsiveText variant="title" style={styles.heroSubtitle}>
            React Native Expo Component Utility Package
          </ResponsiveText>
          <ResponsiveText variant="body" style={styles.heroDescription}>
            A comprehensive utility package for cross-platform React Native Expo
            projects. Provides theming, layout styling classes, and real-time
            layout tracking for responsive design.
          </ResponsiveText>
          <View style={[flex.row, flex.wrap, styles.heroActions]}>
            <Button
              mode="contained"
              onPress={() => onNavigate("getting-started")}
              style={margin.right(2)}
            >
              Get Started
            </Button>
            <Button
              mode="outlined"
              onPress={() =>
                Linking.openURL(
                  "https://github.com/kingslytshepiso/rn-expo-core",
                )
              }
            >
              View on GitHub
            </Button>
          </View>
        </View>

        <Divider style={margin.vertical(4)} />

        {/* Features Grid */}
        <View style={styles.features}>
          <ResponsiveText variant="title" style={margin.bottom(3)}>
            Features
          </ResponsiveText>
          <View
            style={[flex.row, flex.wrap, { gap: layout.isDesktop ? 16 : 12 }]}
          >
            <FeatureCard
              title="🎨 Theming System"
              description="Built on React Native Paper with light/dark theme support and custom theme options"
              onPress={() => onNavigate("theming")}
            />
            <FeatureCard
              title="📱 Responsive Design"
              description="Real-time layout tracking for mobile, tablet, and desktop with breakpoint utilities"
              onPress={() => onNavigate("layout")}
            />
            <FeatureCard
              title="🧩 Components"
              description="Pre-built responsive components that adapt to different screen sizes"
              onPress={() => onNavigate("components")}
            />
            <FeatureCard
              title="🎯 Layout Utilities"
              description="Reusable styling classes for spacing, flexbox, and border radius"
              onPress={() => onNavigate("utilities")}
            />
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinks}>
          <ResponsiveText variant="title" style={margin.bottom(3)}>
            Documentation
          </ResponsiveText>
          <View style={flex.column}>
            <DocLink
              title="Getting Started"
              description="Installation and setup guide"
              onPress={() => onNavigate("getting-started")}
            />
            <DocLink
              title="Components"
              description="Responsive components and their usage"
              onPress={() => onNavigate("components")}
            />
            <DocLink
              title="Layout & Responsive"
              description="Layout tracking and responsive utilities"
              onPress={() => onNavigate("layout")}
            />
            <DocLink
              title="Theming"
              description="Theme configuration and customization"
              onPress={() => onNavigate("theming")}
            />
            <DocLink
              title="Styling Utilities"
              description="Spacing, flexbox, and layout utilities"
              onPress={() => onNavigate("utilities")}
            />
            <DocLink
              title="API Reference"
              description="Complete TypeScript API documentation"
              onPress={() =>
                Linking.openURL(
                  "https://kingslytshepiso.github.io/rn-expo-core/",
                )
              }
            />
          </View>
        </View>
      </ResponsiveContainer>
    </ScrollView>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  onPress,
}) => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <Surface
      style={[
        styles.featureCard,
        {
          width: layout.isDesktop ? "48%" : "100%",
          backgroundColor: theme.colors.surface,
        },
        padding.all(3),
        borderRadius.md,
      ]}
    >
      <ResponsiveText variant="title" style={margin.bottom(1)}>
        {title}
      </ResponsiveText>
      <ResponsiveText variant="body" style={margin.bottom(2)}>
        {description}
      </ResponsiveText>
      <Button mode="text" onPress={onPress} compact>
        Learn More →
      </Button>
    </Surface>
  );
};

interface DocLinkProps {
  title: string;
  description: string;
  onPress: () => void;
}

const DocLink: React.FC<DocLinkProps> = ({ title, description, onPress }) => {
  const theme = useTheme();

  return (
    <Card
      style={[margin.bottom(2), { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  hero: {
    marginBottom: 32,
    alignItems: "center",
  },
  heroTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    marginBottom: 16,
    textAlign: "center",
    opacity: 0.8,
  },
  heroDescription: {
    marginBottom: 24,
    textAlign: "center",
    maxWidth: 600,
    opacity: 0.7,
  },
  heroActions: {
    justifyContent: "center",
  },
  features: {
    marginBottom: 32,
  },
  featureCard: {
    marginBottom: 12,
  },
  quickLinks: {
    marginBottom: 32,
  },
});
