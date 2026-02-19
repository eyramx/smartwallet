import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PasswordSettingsScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    router.back();
  };

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark dark:text-white text-xl font-bold">
          Password Settings
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary dark:bg-dark-bg rounded-t-3xl px-6 pt-8">
        {/* Current Password */}
        <View className="mb-6">
          <Text className="text-text-dark dark:text-dark-text text-sm font-medium mb-2">
            Current Password
          </Text>
          <View className="flex-row items-center bg-white/50 dark:bg-dark-surface rounded-2xl px-4">
            <Text className="flex-1 text-text-dark dark:text-dark-text text-2xl tracking-widest py-4">
              {showCurrentPassword ? currentPassword : "••••••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View className="mb-6">
          <Text className="text-text-dark text-sm font-medium mb-2">
            New Password
          </Text>
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showNewPassword ? newPassword : "••••••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password */}
        <View className="mb-8">
          <Text className="text-text-dark text-sm font-medium mb-2">
            Confirm New Password
          </Text>
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showConfirmPassword ? confirmPassword : "••••••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity
          className="bg-primary rounded-full py-4 mb-8"
          onPress={handleChangePassword}
        >
          <Text className="text-white text-center font-semibold text-base">
            Change Password
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
