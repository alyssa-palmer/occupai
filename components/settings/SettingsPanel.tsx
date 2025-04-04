import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import Slider from "./Slider";


const SettingsPanel = () => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        main_container: {
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: 20,
            backgroundColor: "#e6e3d3",
            borderRadius: 10,
            marginHorizontal: 10,
            marginTop: 10
        },
        slider_container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
        },
        title_text: {
            color: theme.colors.onSecondary,
            fontSize: 24,
        },
        options_text: {
            color: theme.colors.onSecondary,
            fontSize: 16,
            alignContent: "center",
            padding: 15,
        },
    });
    return (
        <View style={styles.main_container}>
            <Text style={styles.title_text}>Alerts and Notifications</Text>
            <View style={styles.slider_container}>
                <Text style={styles.options_text}>Enable Alerts</Text>
                <Slider></Slider>
            </View>
            <View style={styles.slider_container}>
                <Text style={styles.options_text}>Enable Notifications</Text>
                <Slider></Slider>
            </View>
        </View>
    )
}

export default SettingsPanel