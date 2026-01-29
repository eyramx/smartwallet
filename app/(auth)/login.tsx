import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "expo-router";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Replace with real Nhost auth when backend is ready
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Mock authentication - accept "admin"/"admin"
    setTimeout(() => {
      if (email === "admin" && password === "admin") {
        setIsLoading(false);
        router.replace("/(tabs)");
      } else {
        setIsLoading(false);
        Alert.alert(
          "Login Failed",
          "Invalid credentials. Use email: admin, password: admin",
        );
      }
    }, 500); // Simulate network delay
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="pt-16 pb-6 px-6">
        <Text className="text-3xl font-bold text-text-dark">Log In</Text>
      </View>

      {/* Form */}
      <View className="flex-1 bg-secondary rounded-t-[30px] px-6 pt-8">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Email"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Forgot Password */}
          <TouchableOpacity className="items-end mb-6">
            <Text className="text-text-dark font-semibold">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Log In"
            onPress={handleLogin}
            variant="primary"
            loading={isLoading}
            className="mb-4"
          />

          {/* Sign Up Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up")}
            className="items-center mb-8"
          >
            <Text className="text-text-gray">
              Don't have an account?{" "}
              <Text className="text-primary font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
