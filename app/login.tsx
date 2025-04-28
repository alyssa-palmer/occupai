import { View, Text, Alert, TextInput, StyleSheet } from "react-native";
import React from "react"; 
import { Button } from "react-native-paper";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Constants from "expo-constants";
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import SignInForm from "@/components/get-started/SignInForm";


function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

async function signInUser(email: string, password: string){
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          handleRegistrationError('Permission not granted to get push token for push notification!');
          return;
        }
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          handleRegistrationError('Project ID not found');
        }
        try { // check if their email is already in the database
          const pushTokenString = (await Notifications.getExpoPushTokenAsync({projectId})).data;
          console.log("Expo push token", pushTokenString);
          firestore()
            .collection('users')
            .doc('tester')
            .get()
            .then(documentSnapshot => {
              console.log('User exists: ', documentSnapshot.exists);
              if (documentSnapshot.exists) {
                if (documentSnapshot.data()?.expoPushToken !== pushTokenString){
                  firestore()
                    .collection('users')
                    .doc('tester')
                    .update({
                      expoPushToken: pushTokenString,
                    })
                    .then(() => {
                      console.log('User updated!');
                      console.log('User data: ', documentSnapshot.data());
                    });
                }
              }
            });
        } catch (e: unknown) {
          handleRegistrationError(`${e}`);
        }
      } else {
        handleRegistrationError('Error during sign in. Please try again.');
    }
    
}

const LoginPage = () => {
    return (
      <View>
        <SignInForm />
      </View>
    )
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

export default LoginPage;