import DetectionInsights from "@/components/home/DetectionInsights";
import EnvWarn from "@/components/home/EnvWarn";
import PassengerCounter from "@/components/home/PassengerCounter";
import PresenceDisplay from "@/components/home/PresenceDisplay";
import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function Home() {

  const pCount = 3;
  const [adultDetected, setAdultDetected] = useState<boolean>(true);
  const [childDetected, setChildDetected] = useState<boolean>(true);
  const [envTitle, setEnvTitle] = useState<string>("Safe");
  const [envMessage, setEnvMessage] = useState<string>("Waiting for detection data...");

  useEffect(() => {
    setAdultDetected(true);
    setChildDetected(true);
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
