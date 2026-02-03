import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ChangePinScreen() {
  const router = useRouter();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleChangePin = () => {
    // TODO: Implement pin change logic
    router.back();
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Change Pin</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        {/* Current Pin */}
        <View className="mb-6">
          <Text className="text-text-dark text-sm font-medium mb-2">
            Current Pin
          </Text>
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showCurrentPin ? currentPin : "••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCurrentPin(!showCurrentPin)}
            >
              {showCurrentPin ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* New Pin */}
        <View className="mb-6">
          <Text className="text-text-dark text-sm font-medium mb-2">
            New Pin
          </Text>
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showNewPin ? newPin : "••••"}
            </Text>
            <TouchableOpacity onPress={() => setShowNewPin(!showNewPin)}>
              {showNewPin ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Pin */}
        <View className="mb-8">
          <Text className="text-text-dark text-sm font-medium mb-2">
            Confirm Pin
          </Text>
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showConfirmPin ? confirmPin : "••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowConfirmPin(!showConfirmPin)}
            >
              {showConfirmPin ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Pin Button */}
        <TouchableOpacity
          className="bg-primary rounded-full py-4 mb-8"
          onPress={handleChangePin}
        >
          <Text className="text-white text-center font-semibold text-base">
            Change Pin
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
