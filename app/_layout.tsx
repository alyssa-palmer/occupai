import theme from "@/theming/Theme";
import { Slot } from "expo-router";
import { Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as Notifications from 'expo-notifications';

export default function Layout() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return (
    <PaperProvider theme={theme}>
      <Slot/>
    </PaperProvider>
  );
}
