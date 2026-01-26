import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { useRouter } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 items-center justify-center px-6">
        {/* Logo */}
        <View className="items-center mb-8">
          <Logo size={80} showText={false} />
          <Text className="text-4xl font-bold text-primary mt-4">FINHQ</Text>
        </View>

        {/* Subtitle */}
        <Text className="text-text-gray text-center mb-12 px-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </Text>

        {/* Buttons */}
        <View className="w-full px-6">
          <Button
            title="Log In"
            onPress={() => router.push("/(auth)/login")}
            variant="primary"
            className="mb-4"
          />
          <Button
            title="Sign Up"
            onPress={() => router.push("/(auth)/sign-up")}
            variant="secondary"
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-6">
          <Text className="text-text-dark font-semibold">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
