import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#17726D", // main brand color
    primaryContainer: "#17726D",
    onPrimary: "#FFFFFF", // Text on primary buttons
    secondary: "#B4A692", // Supporting color
    secondaryContainer: "#B4A692",
    tertiary: "#5DB9D2",    // alternative blue option
    tertiaryContainer: "#5DB9D2",
    background: "#FFFFFF", // App background
    surface: "#F5F5F5", // Light gray for cards

  },
};

export default theme;
