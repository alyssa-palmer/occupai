import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface PassengerCounterProps{
    passengerType: string;
    count: number;
}

function PassengerCounter (props: PassengerCounterProps) {
    const { passengerType, count } = props;
    const theme = useTheme();
    const styles = StyleSheet.create({
        container:{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.colors.tertiaryContainer,
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 20,
        },
        text:{
            fontSize: 24,
            color: theme.colors.onTertiary,
            fontWeight: "bold",
        }

    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{passengerType}</Text>
            <Text style={styles.text}>{count}</Text>
        </View>
    )

}
export default PassengerCounter;