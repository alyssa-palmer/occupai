import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

interface EnvWarnProps{
    title: string;
    message: string;
}

function EnvWarn(props: EnvWarnProps){
    const { title, message } = props;
    var icon_color = title === "Safe" ? "#1fb857" : "#610f1c";
    var bg_color = title === "Safe" ? "#98e39d" : "#edbec5";
    var icon = title === "Safe" ? "check-circle" : "alert-circle";
    var text_color = title === "Safe" ? "#000000" : "#610f1c";

    const styles = StyleSheet.create({
        card_container: {
            margin: 10,
            backgroundColor: bg_color,
            marginTop: 220,
        },
        body_text: {
            color: text_color,
            fontSize: 16,
        },
        title_text:{
            color: text_color,
            fontSize: 24,
            fontWeight: "bold",
        },
        icon_style: {
            backgroundColor: bg_color
        }
    })

    return (
        <Card style={styles.card_container}>
            <Card.Title 
                title={title}  
                left={(props) => 
                    <Avatar.Icon 
                        {...props} 
                        icon={icon} 
                        color={icon_color} 
                        size={60}
                        style={styles.icon_style}/>}
                titleStyle={styles.title_text} 
            />
            <Card.Content>
            <Text style={styles.body_text}>{message}</Text>
            </Card.Content>
        </Card>
    )
}
export default EnvWarn;