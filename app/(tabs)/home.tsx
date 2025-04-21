import DetectionInsights from "@/components/home/DetectionInsights";
import EnvWarn from "@/components/home/EnvWarn";
import PassengerCounter from "@/components/home/PassengerCounter";
import PresenceDisplay from "@/components/home/PresenceDisplay";
import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

{/* Setting up notifications */}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'WARNING!',
    body: 'Unattended child detected! Please return to the vehicle',
    data: { someData: 'goes here' },
  };
  console.log(expoPushToken);

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log("Notification sent!");
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

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
    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({projectId})).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function Home() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(token => setExpoPushToken(token ?? ''))
    .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    });

    return () => {
    notificationListener.current &&
      Notifications.removeNotificationSubscription(notificationListener.current);
    responseListener.current &&
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const pCount = 3;
  const [adultDetected, setAdultDetected] = useState<boolean>(true);
  const [childDetected, setChildDetected] = useState<boolean>(true);
  const [alertSent, setAlertSent] = useState(false);
  const [envTitle, setEnvTitle] = useState<string>("Safe");
  const [envMessage, setEnvMessage] = useState<string>("Waiting for detection data...");

  // Simulating the data for now
  useEffect(() => {
    const timer = setTimeout(() => {
      setChildDetected(true);
      setAdultDetected(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      if (!adultDetected && childDetected){
        setEnvTitle("Warning");
        setEnvMessage("An unattended child is detected in the vehicle. Please make sure a responsible adult is present.");
      }
      else {
        setEnvTitle("Safe");
        setEnvMessage("All is well! No children are unattended in the vehicle.");
      }
  }, [adultDetected, childDetected])

  useEffect(() => {
    if (childDetected && !adultDetected && !alertSent) {
      sendPushNotification(expoPushToken);
      setAlertSent(true); // prevent spamming
    } else if (!childDetected || adultDetected) {
      setAlertSent(false); // reset alert status when safe again
    }
  }, [childDetected, adultDetected, alertSent, expoPushToken]);

  return (
    <View>
      <DetectionInsights />
      <PassengerCounter passengerType={"Total Passengers"} count={pCount}/>
      <PresenceDisplay passengerType={"Adult"} detected={adultDetected}/>
      <PresenceDisplay passengerType={"Child"} detected={childDetected}/>
      <EnvWarn title={envTitle} message={envMessage}/>

    </View>
  );
}
