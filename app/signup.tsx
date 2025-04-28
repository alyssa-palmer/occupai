import SignUpForm from "@/components/signup/SignUpForm";
import { View, Image, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      justifyContent: "center",
    },
    image_container: {
        marginTop: 200,
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
        flex: 1,
    },
    company_logo: {
        alignItems: "center",
        marginTop: 150,
        width: 200,
        height: 100,
        resizeMode: "contain",
        bottom: 1,
    }
});

const SignUpPage = () => {
    return (
        <View style={styles.container}>
            <SignUpForm />
            {/* Company Logo */}
            <View style={styles.image_container}>
                <Image source={require("../assets/images/safehorizon-logo.png")} style={styles.company_logo} />
            </View>
        </View>
    )

}

export default SignUpPage;