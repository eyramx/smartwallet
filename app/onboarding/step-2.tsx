import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function OnboardingStep2() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="pt-16 pb-8 px-6">
        <Text className="text-3xl font-bold text-text-dark text-center">
          ¿Are You Ready To{"\n"}Take Control Of{"\n"}Your Finaces?
        </Text>
      </View>

      {/* Content Card */}
      <View className="flex-1 bg-secondary rounded-t-[30px] items-center justify-between pt-12 pb-8 px-6">
        {/* Illustration placeholder */}
        <View className="w-64 h-64 bg-secondary rounded-full items-center justify-center">
          <View className="w-48 h-48 bg-primary/10 rounded-full items-center justify-center">
            <Text className="text-6xl">📱</Text>
          </View>
        </View>

        {/* Navigation */}
        <View className="w-full">
          <Button
            title="Next"
            onPress={() => router.replace("/(tabs)")}
            variant="primary"
          />

          {/* Pagination dots */}
          <View className="flex-row justify-center mt-4 gap-2">
            <View className="w-3 h-3 rounded-full bg-text-light" />
            <View className="w-3 h-3 rounded-full bg-primary" />
          </View>
        </View>
      </View>
    </View>
  );
}
