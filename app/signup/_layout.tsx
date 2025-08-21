import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function _Layout() {
  return (
  <>
  <StatusBar hidden/>
    <Slot/>
  </>
)}
