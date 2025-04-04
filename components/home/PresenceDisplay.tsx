import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

interface PresenceDisplayProps {
    passengerType: string;
    detected: boolean;
}

function PresenceDisplay(props: PresenceDisplayProps){
    const { passengerType, detected } = props;
    const theme = useTheme();
    const styles = StyleSheet.create({
        container:{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.colors.secondaryContainer,
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
            <Text style={styles.text}>{detected ? "Yes" : "No"}</Text>
        </View>

    );
}

export default PresenceDisplay;