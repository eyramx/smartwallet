import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/step-1");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <StatusBar barStyle="light-content" />
      <TrendingUp size={80} color="#1A3B34" strokeWidth={3} />
      <Text className="text-text-dark text-5xl font-bold mt-4">FinWise</Text>
    </View>
  );
}
