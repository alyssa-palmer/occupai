import DetectionInsights from "@/components/home/DetectionInsights";
import PassengerCounter from "@/components/home/PassengerCounter";
import PresenceDisplay from "@/components/home/PresenceDisplay";
import { Text, View } from "react-native";

export default function Home() {
  const pCount = 3;
  const adultDetected = true;
  const childDetected = false;
  return (
    <View>
      <DetectionInsights />
      <PassengerCounter passengerType={"Total Passengers"} count={pCount}/>
      <PresenceDisplay passengerType={"Adult"} detected={adultDetected}/>
      <PresenceDisplay passengerType={"Child"} detected={childDetected}/>
    </View>
  );
}
