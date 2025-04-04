import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#17726D", // main brand color
    primaryContainer: "#17726D",
    onPrimary: "#FFFFFF", // Text on primary buttons
    secondary: "#d1cab6", // Beige Supporting color
    secondaryContainer: "#d1cab6",
    onSecondary: "#000000", // Text on secondary buttons
    tertiary: "#8fc7c4",    // alternative blue option
    tertiaryContainer: "#8fc7c4", 
    onTertiary: "#000000", // Text on tertiary buttons
    background: "#FFFFFF", // App background
    surface: "#F5F5F5", // Light gray for cards
  },
};

export default theme;
