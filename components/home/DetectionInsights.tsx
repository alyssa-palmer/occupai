import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const DetectionInsights = () => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center",
            height: 100,
            flexDirection: "row",
        },
        text: {
            color: theme.colors.primary,
            fontSize: 36,
            fontWeight: "bold",
        },
    });

    return (
    <View style={styles.container}>
        <Ionicons
            name="people"
            size={48}
            color={theme.colors.primary}
        />
        <Text style={styles.text}> Detection Insights</Text>
    </View>
    )
}
export default DetectionInsights;