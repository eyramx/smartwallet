import { NhostProvider, useAuthenticationStatus } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
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

export default function RootLayout() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <AuthGuard>
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
          </Stack>
          <StatusBar style="auto" />
        </AuthGuard>
      </NhostApolloProvider>
    </NhostProvider>
  );
}
