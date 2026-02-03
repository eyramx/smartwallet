import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import { StatusBar, Text, View } from "react-native";

export default function SuccessScreen() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      <StatusBar barStyle="dark-content" />

      <View className="bg-secondary rounded-full p-8 mb-8">
        <Check size={48} color="#02C38E" />
      </View>

      <Text className="text-3xl font-bold text-text-dark text-center mb-4">
        Password Changed
      </Text>

      <Text className="text-text-gray text-center text-lg mb-12">
        Password changed successfully, you can login again with a new password
      </Text>

      <Button
        title="Back To Login"
        onPress={handleBackToLogin}
        variant="primary"
        className="w-full"
      />
    </View>
  );
}
