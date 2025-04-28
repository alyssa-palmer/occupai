import { router } from "expo-router";
import { Formik } from "formik";
import { TextInput, View, Text, StyleSheet, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import * as Yup from 'yup';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
  
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

const firebaseConfig = {
    apiKey: "AIzaSyD3bLLVXWil-jeb7a7W_nETD0p1Qx2kW7s",
    authDomain: "occupai-40146.firebaseapp.com",
    projectId: "occupai-40146",
    storageBucket: "occupai-40146.firebasestorage.app",
    messagingSenderId: "414737502484",
    appId: "1:414737502484:web:9b6445e5cff81926913201",
    measurementId: "G-ZM63E5SZ67"
};


const SignUpForm = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const colors = useTheme().colors;

    async function signUpUser(user_email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user_email, password);
            const userId = userCredential.user.uid;

            const userDeviceToken = await registerForPushNotificationsAsync();

            if (!userDeviceToken) {
                throw new Error('Failed to get push token. Try again.');
            }

            await setDoc(doc(db, "users", userId), {
                email: user_email,
                deviceToken: userDeviceToken,
            });

            await setDoc(doc(db, "detections", userId), {
                adultDetected: false,
                childDetected: false,
                totalPassengers: 0,
            });

            Alert.alert("Success!", "Registration successful!");
            router.navigate("/home");

        } catch (error: any) {
            console.error("Signup error:", error);
            Alert.alert("Error!", `Registration failed: ${error.message}`);
        }
    }

    var emailInput: TextInput | null = null;
    var passwordInput: TextInput | null = null;

    return (
        <View>
        <Text style={styles.title}>Get Started Below!</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()   
                .email('Invalid Email')           
                .required('Required'),
            password: Yup.string()
                .required('Required')
                .min(8, "Password must be at least 8 characters")
          })}
          onSubmit={async (values, formikActions) => {
            try{
                await signUpUser( values.email, values.password);
            }catch(error){
                
            }finally{
                formikActions.setSubmitting(false);
            }
            }}>
          {props => (
            <View>
             <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                autoFocus
                placeholder="Enter Email Address"
                style={styles.input}
                onSubmitEditing={() => {
                    // on certain forms, it is nice to move the user's focus
                    // to the next input when they press enter.
                    emailInput?.focus();
                  }}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
              <TextInput
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                placeholder="Create Password"
                style={styles.input}
                ref={el => passwordInput = el}
              />
              {props.touched.password && props.errors.password ? (
                <Text style={styles.error}>{props.errors.password}</Text>
              ) : null}
              <Button
                onPress={() => props.handleSubmit()}
                mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}>
                Submit
              </Button>
              <Button
                onPress={() => router.navigate("./login")}
                mode="outlined"
                textColor={colors.primary}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}>
                Go Back
              </Button>
            </View>
          )}
        </Formik>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

export default SignUpForm;