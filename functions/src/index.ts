import fetch from "node-fetch";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";

require("firebase-functions/logger/compat");

initializeApp();
const db = getFirestore();

/**
 * It sends the warning push notitification to the user
 */
async function sendPushNotification(expoPushToken: string) {
  console.log("sendPushNotification function called.");
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "⚠️ Child Left Behind Alert",
    body: "A child has been detected alone in the vehicle!",
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const result = await response.json();
  console.log("Result of push notification fetch", result);
}

const detectPath = "detections/{userId}";
export const checkDetections = onDocumentUpdated(detectPath, async (event) => {
  if (!event.data) {
    console.error("No data in event");
    return;
  }

  const after = event.data.after.data();
  const {adultDetected, childDetected} = after;

  if (!adultDetected && childDetected) {
    console.log("If condition met");
    const userId = event.params.userId;

    try {
      // Fetch Expo Push Token from Firestore
      const userDoc = await db.collection("users").doc(userId).get();
      const expoPushToken = userDoc.data()?.deviceToken;

      if (!expoPushToken) {
        console.error("No Expo push token found for user:", userId);
        return;
      }

      // Send the push notification
      await sendPushNotification(expoPushToken);
      console.log("Push notification sent to", userId);
    } catch (error) {
      console.error("Error fetching user data or sending notification:", error);
    }
  }
});
