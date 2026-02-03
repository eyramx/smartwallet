import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 items-center justify-center px-6">
        {/* Logo */}
        <View className="items-center mb-8">
          <TrendingUp size={100} color="#00D9A3" strokeWidth={3} />
          <Text className="text-5xl font-bold text-primary mt-4">FinWise</Text>
        </View>

        {/* Subtitle */}
        <Text className="text-text-gray text-center mb-12 px-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Text>

        {/* Buttons */}
        <View className="w-full px-6">
          <TouchableOpacity
            className="bg-primary rounded-full py-4 mb-4"
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text className="text-text-dark text-center font-bold text-lg">
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary/20 rounded-full py-4"
            onPress={() => router.push("/(auth)/sign-up")}
            activeOpacity={0.8}
          >
            <Text className="text-text-dark text-center font-bold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-6">
          <Text className="text-text-dark font-semibold">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
