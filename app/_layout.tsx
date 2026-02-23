import { NhostProvider, useAuthenticationStatus } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";

import { BudgetProvider } from "../contexts/BudgetContext";
import { CategoryProvider } from "../contexts/CategoryContext";
import { GoalProvider } from "../contexts/GoalContext";
import { PreferencesProvider } from "../contexts/PreferencesContext";
import { RecurringTransactionProvider } from "../contexts/RecurringTransactionContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { TransactionProvider } from "../contexts/TransactionContext";
import "../global.css";
import { nhost } from "../lib/nhost";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0];
    const inAuthGroup =
      currentSegment === "(auth)" ||
      currentSegment === "welcome" ||
      currentSegment === "onboarding";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && currentSegment === "(tabs)") {
      router.replace("/welcome");
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}

function RootNavigator() {
  const { isDarkMode } = useTheme();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setColorScheme]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/sign-up" />
      <Stack.Screen name="onboarding/step-1" />
      <Stack.Screen name="onboarding/step-2" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-transaction"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="search" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="budgets" />
      <Stack.Screen name="categories-management" />
      <Stack.Screen name="recurring-transactions" />
      <Stack.Screen name="financial-goals" />
      <Stack.Screen name="reports" />
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
  );
}

export default function RootLayout() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <ThemeProvider>
          <PreferencesProvider>
            <BudgetProvider>
              <CategoryProvider>
                <TransactionProvider>
                  <RecurringTransactionProvider>
                    <GoalProvider>
                      <AuthGuard>
                        <View className="flex-1">
                          <RootNavigator />
                          <StatusBar style="auto" />
                        </View>
                      </AuthGuard>
                    </GoalProvider>
                  </RecurringTransactionProvider>
                </TransactionProvider>
              </CategoryProvider>
            </BudgetProvider>
          </PreferencesProvider>
        </ThemeProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}
