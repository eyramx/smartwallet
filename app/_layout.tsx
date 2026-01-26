import { NhostReactProvider } from "@nhost/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { nhost } from "../lib/nhost";

export default function RootLayout() {
  return (
    <NhostReactProvider nhost={nhost}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="onboarding/step-1" />
        <Stack.Screen name="onboarding/step-2" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </NhostReactProvider>
  );
}
