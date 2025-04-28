import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react"; 
import SignInForm from "@/components/get-started/SignInForm";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";

const LoginPage = () => {
  const [loading, setLoading] = useState(true); // for showing a spinner if you want

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in already
        router.replace('/home'); // Important: use replace so they can't go "back" to login
      } else {
        // No user signed in
        setLoading(false); // Done loading, show login form
      }
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />; // or a better spinner
  }
  return (
    <View>
      <SignInForm />
    </View>
  )
}

export default LoginPage;