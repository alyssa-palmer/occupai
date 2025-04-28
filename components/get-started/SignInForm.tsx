import { router } from "expo-router";
import { Formik } from "formik";
import { TextInput, View, Text, StyleSheet, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import * as Yup from 'yup';
import Constants from "expo-constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const SignInForm = () => {

    const colors = useTheme().colors;

    async function signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.navigate("/home");
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert("Error!", `Sign in failed due to: ${errorMessage}`);
                throw error; // IMPORTANT: rethrow to catch inside onSubmit
            });
    }

    return (
        <View>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()   
                .email('Invalid Email')           
                .required('Required'),
            password: Yup.string()
                .required('Required'),
          })}
          onSubmit={async (values, formikActions) => {
            try{
                await signInUser( values.email, values.password);
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
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
              <TextInput
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                placeholder="Enter Password"
                style={styles.input}
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
                onPress={() => router.navigate("./signup")}
                mode="outlined"
                textColor={colors.primary}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}>
                New here? Sign Up!
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
    paddingTop: Constants.statusBarHeight + 200,
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

export default SignInForm;