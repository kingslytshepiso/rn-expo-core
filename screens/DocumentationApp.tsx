import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { useTheme } from "../src";
import { DocumentationHome } from "./DocumentationHome";
import { GettingStartedScreen } from "./GettingStartedScreen";
import { ComponentsScreen } from "./ComponentsScreen";
import { LayoutScreen } from "./LayoutScreen";
import { ThemingScreen } from "./ThemingScreen";
import { UtilitiesScreen } from "./UtilitiesScreen";

type Page =
  | "home"
  | "getting-started"
  | "components"
  | "layout"
  | "theming"
  | "utilities";

const pageTitles: Record<Page, string> = {
  home: "rn-expo-core",
  "getting-started": "Getting Started",
  components: "Components",
  layout: "Layout & Responsive",
  theming: "Theming",
  utilities: "Styling Utilities",
};

export const DocumentationApp: React.FC = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMenuVisible(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <DocumentationHome onNavigate={navigate} />;
      case "getting-started":
        return <GettingStartedScreen onNavigate={navigate} />;
      case "components":
        return <ComponentsScreen onNavigate={navigate} />;
      case "layout":
        return <LayoutScreen onNavigate={navigate} />;
      case "theming":
        return <ThemingScreen onNavigate={navigate} />;
      case "utilities":
        return <UtilitiesScreen onNavigate={navigate} />;
      default:
        return <DocumentationHome onNavigate={navigate} />;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header>
        <Appbar.Content title={pageTitles[currentPage]} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action icon="menu" onPress={() => setMenuVisible(true)} />
          }
        >
          <Menu.Item
            onPress={() => navigate("home")}
            title="Home"
            leadingIcon="home"
          />
          <Menu.Item
            onPress={() => navigate("getting-started")}
            title="Getting Started"
            leadingIcon="rocket-launch"
          />
          <Menu.Item
            onPress={() => navigate("components")}
            title="Components"
            leadingIcon="view-module"
          />
          <Menu.Item
            onPress={() => navigate("layout")}
            title="Layout & Responsive"
            leadingIcon="view-dashboard"
          />
          <Menu.Item
            onPress={() => navigate("theming")}
            title="Theming"
            leadingIcon="palette"
          />
          <Menu.Item
            onPress={() => navigate("utilities")}
            title="Styling Utilities"
            leadingIcon="format-paint"
          />
        </Menu>
        {currentPage !== "home" && (
          <Appbar.Action icon="arrow-left" onPress={() => navigate("home")} />
        )}
      </Appbar.Header>
      {renderPage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
