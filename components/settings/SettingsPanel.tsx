import { View, Text, StyleSheet, Alert } from "react-native"
import { Button, useTheme, Card } from "react-native-paper"
import Slider from "./Slider";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";


const SettingsPanel = () => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        main_container: {
            justifyContent: "flex-start",
            backgroundColor: theme.colors.primaryContainer,
            padding: 20,
            margin: 10,
        },
        slider_container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
        },
        title_text: {
            color: theme.colors.onPrimary,
            fontSize: 24,
            fontWeight: "bold"
        },
        options_text: {
            color: theme.colors.onPrimary,
            fontSize: 16,
        },
        button_text: {
            color: theme.colors.onPrimary,
            fontSize: 18,
        },
        sign_out_button: {
            borderColor: theme.colors.onPrimary,
        }
    });

    function handleSignOut() {
        signOut(auth).then(() => {
            router.replace("/login");
          }).catch((error) => {
            console.error("Error during sign out:", error);
            Alert.alert("Error!", "Sign out failed. Please try again.")
          });

    }
    return (
        <Card style={styles.main_container} mode="elevated">
            <Card.Title titleStyle={styles.title_text} titleVariant="headlineMedium" title="Account Settings"/>
            <Card.Content>
                <Text style={styles.options_text}>Sign out using the button below:</Text>
            </Card.Content>
            <Card.Actions>
            <Button style={styles.sign_out_button} labelStyle={styles.button_text} onPress={handleSignOut}>Sign Out</Button>
            </Card.Actions>
        </Card>
    )
}

export default SettingsPanel