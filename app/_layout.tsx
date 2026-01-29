import { NhostReactProvider } from "@nhost/react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import "../global.css";
import { nhost } from "../lib/nhost";

function RootNavigator() {
  const { isDarkMode } = useTheme();

  return (
    <View className={isDarkMode ? "dark flex-1" : "flex-1"}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="onboarding/step-1" />
        <Stack.Screen name="onboarding/step-2" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="search" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="category/food" />
        <Stack.Screen name="category/transport" />
        <Stack.Screen name="category/groceries" />
        <Stack.Screen name="category/rent" />
        <Stack.Screen name="category/gifts" />
        <Stack.Screen name="category/medicine" />
        <Stack.Screen name="category/entertainment" />
        <Stack.Screen name="category/savings" />
        <Stack.Screen name="savings/travel" />
        <Stack.Screen name="savings/house" />
        <Stack.Screen name="savings/car" />
        <Stack.Screen name="savings/wedding" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="profile/security" />
        <Stack.Screen name="profile/settings" />
        <Stack.Screen name="profile/help" />
        <Stack.Screen name="profile/support" />
        <Stack.Screen name="profile/security/change-pin" />
        <Stack.Screen name="profile/security/fingerprint" />
        <Stack.Screen name="profile/security/terms" />
        <Stack.Screen name="profile/settings/notifications" />
        <Stack.Screen name="profile/settings/password" />
        <Stack.Screen name="profile/settings/delete-account" />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "auto"} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NhostReactProvider nhost={nhost}>
        <RootNavigator />
      </NhostReactProvider>
    </ThemeProvider>
  );
}
