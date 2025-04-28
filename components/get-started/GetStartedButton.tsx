import { useRouter } from "expo-router";
import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

const GetStartedButton = () => {
  const theme = useTheme();
  const router = useRouter();
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 20,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderRadius: 20,
      marginHorizontal: 5,
      padding: 15,
    },
    buttonText: {
      color: theme.colors.primary,
      fontSize: 20,
    },
  });

  // Animated value
  const borderColorRef = new Animated.Value(0);

  // handlers
  const handlePress = () => {
    Animated.timing(borderColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };
  const handleRelease = () => {
    Animated.timing(borderColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate the background color
  const borderColor = borderColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.primaryContainer, theme.colors.tertiaryContainer],
  });

  // Applying the interpolated backgroundColor
  return (
    <Pressable
      onPressIn={handlePress}
      onPressOut={handleRelease}
      onPress={() => router.navigate("./login")}
    >
      <Animated.View style={[styles.buttonContainer, { borderColor }]}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Animated.View>
    </Pressable>
  );
};

export default GetStartedButton;
