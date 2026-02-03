import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useSignInEmailPassword } from "@nhost/react";
import { useRouter } from "expo-router";
import { Fingerprint } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    const result = await signInEmailPassword(email, password);
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(tabs)");
    }
    if (isError) {
      Alert.alert(
        "Login Failed",
        error?.message || "An unknown error occurred",
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-12 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mt-10 mb-12">
          <Text className="text-4xl font-bold text-text-dark text-center">
            Welcome
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <Input
            label="Email"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="mb-4">
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="mb-2"
            />
            {/* Forgot Password - Aligned relative to password input if needed, or just right aligned */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              className="items-end"
            >
              <Text className="text-text-dark/60 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Button
            title="Log In"
            onPress={handleLogin}
            variant="primary"
            className="mt-4 mb-8"
          />

          {/* Fingerprint / Biometric */}
          <View className="items-center mb-8">
            <Text className="text-text-dark/60 mb-4 font-medium">
              Use Fingerprint To Access
            </Text>
            <TouchableOpacity className="bg-secondary/50 p-4 rounded-full">
              <Fingerprint size={32} color="#02C38E" />
            </TouchableOpacity>
          </View>

          {/* Divider or "Or" (not explicitly asked but common, skipping for now based on strict design list) */}

          {/* Social Login */}
          <View className="flex-row justify-center space-x-6 mb-8 gap-6">
            {/* Facebook Placeholder */}
            <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center">
              <Text className="font-bold text-blue-600 text-xl">f</Text>
            </TouchableOpacity>
            {/* Google Placeholder */}
            <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center">
              <Text className="font-bold text-red-500 text-xl">G</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Link */}
        <View className="flex-1 justify-end items-center mb-4">
          <Text className="text-text-gray">
            Don't have an account?{" "}
            <Text
              onPress={() => router.push("/(auth)/sign-up")}
              className="text-primary font-bold"
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
