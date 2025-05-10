import { StyleSheet, View, Image, Platform } from "react-native";
import { Text, useTheme } from "react-native-paper";
import GetStartedButton from "@/components/get-started/GetStartedButton";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const StartPage = () => {
  const { colors } = useTheme(); // Use theme colors

  const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },
    main_logo: {
      marginTop: 25,
      width: 200,
      height: 200,
      marginBottom: 50,
      resizeMode: 'contain'
    },
    title: {
      marginTop: 1,
      fontWeight: "bold",
      color: colors.primary,
      fontSize: 48,
    },
    sub_text: {
      textAlign: "center",
      color: "#808080",
      marginVertical: 10,
      fontSize: 16,
    },
    company_logo: {
      marginTop: 150,
      width: 200,
      height: 100,
      resizeMode: "contain",
      bottom: 1,
    },
    get_started_button: {
      marginTop: 20,
      marginBottom: 20,
      padding: 5,
      backgroundColor: colors.primaryContainer,
    }

  });

  return (
    <View style={styles.container}>
      {/* Product Logo */}
      <Image source={require("../assets/images/occupai-logo.png")} style={styles.main_logo} />

      {/* Title */}
      <Text style={styles.title}>
        Welcome!
      </Text>

      {/* Subtitle */}
      <Text style={styles.sub_text}>
        Let's ensure no child is left behind
        {"\n"}
        when you exit the vehicle
      </Text>

      {/* Get Started Button */}
      <GetStartedButton />

      {/* Company Logo */}
      <Image source={require("../assets/images/safehorizon-logo.png")} style={styles.company_logo} />
    </View>
  );

  

};

export default StartPage;
