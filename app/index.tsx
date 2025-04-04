import { StyleSheet, View, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import GetStartedButton from "@/components/get-started/GetStartedButton";

const StartPage = () => {
  const router = useRouter();
  const { colors } = useTheme(); // Use theme colors

  const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    main_logo: {
      marginTop: 100,
      width: 200,
      height: 250,
      marginBottom: 50,
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
      width: 320,
      height: 50,
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

      {/* Product Logo */}
      <Image source={require("../assets/images/safehorizon-logo.png")} style={styles.company_logo} />
    </View>
  );

  

};

export default StartPage;
