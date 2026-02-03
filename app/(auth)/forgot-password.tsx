import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    // Navigation to verify pin or logic here
    // For UI flow, let's navigate to verify-pin (assumed next step)
    router.push("/(auth)/verify-pin");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-12 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 mb-8">
          <Text className="text-3xl font-bold text-text-dark text-center mb-4">
            Forgot Password
          </Text>
          <Text className="text-text-gray text-center text-lg">
            Please enter your email to reset the password
          </Text>
        </View>

        <View className="mb-8">
          <Input
            label="Email"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-8"
          />

          <Button
            title="Reset Password"
            onPress={handleReset}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
}
