import DetectionInsights from "@/components/home/DetectionInsights";
import EnvWarn from "@/components/home/EnvWarn";
import PassengerCounter from "@/components/home/PassengerCounter";
import PresenceDisplay from "@/components/home/PresenceDisplay";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore"; 
import { auth, db } from "@/lib/firebaseConfig";
import { Platform, View } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


export default function Home() {
  const userId = auth.currentUser?.uid;
  const [pCount, setPCount] = useState<number>(0);
  const [adultDetected, setAdultDetected] = useState<boolean>(false);
  const [childDetected, setChildDetected] = useState<boolean>(false);
  const [envTitle, setEnvTitle] = useState<string>("Safe");
  const [envMessage, setEnvMessage] = useState<string>("Waiting for detection data...");
  
  const unsub = onSnapshot(doc(db, "detections", userId!), (doc) => {
    const userData = doc.data();
    if (userData) {
      setAdultDetected(userData.adultDetected);
      setChildDetected(userData.childDetected);
      setPCount(userData.totalPassengers);
    }
    
  });

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
