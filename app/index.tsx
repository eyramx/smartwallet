import { Logo } from "@/components/Logo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <StatusBar barStyle="light-content" />
      <Logo size={100} showText={true} />
      <Text className="text-white/80 mt-4">Smart Financial Management</Text>
    </View>
  );
}
