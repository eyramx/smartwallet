import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, Camera } from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">
          Edit My Profile
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl">
        {/* Profile Image */}
        <View className="items-center pt-8 pb-6">
          <View className="relative">
            <View className="w-32 h-32 rounded-full bg-gray-400 overflow-hidden" />
            <TouchableOpacity className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full items-center justify-center">
              <Camera size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="text-text-dark text-2xl font-bold mt-4 mb-1">
            John Smith
          </Text>
          <Text className="text-text-gray text-sm">ID: 25030024</Text>
        </View>

        {/* Form */}
        <View className="px-6">
          <Text className="text-text-dark text-xl font-bold mb-6">
            Account Settings
          </Text>

          {/* Username */}
          <View className="mb-4">
            <Text className="text-text-dark text-sm font-medium mb-2">
              Username
            </Text>
            <TextInput
              className="bg-white/50 rounded-2xl px-4 py-4 text-base text-text-dark"
              placeholder="John Smith"
              placeholderTextColor="#A8C5BC"
            />
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-text-dark text-sm font-medium mb-2">
              Phone
            </Text>
            <TextInput
              className="bg-white/50 rounded-2xl px-4 py-4 text-base text-text-dark"
              placeholder="+44 555 5555 55"
              placeholderTextColor="#A8C5BC"
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View className="mb-6">
            <Text className="text-text-dark text-sm font-medium mb-2">
              Email Address
            </Text>
            <TextInput
              className="bg-white/50 rounded-2xl px-4 py-4 text-base text-text-dark"
              placeholder="example@example.com"
              placeholderTextColor="#A8C5BC"
              keyboardType="email-address"
            />
          </View>

          {/* Push Notifications Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-dark text-base font-medium">
              Push Notifications
            </Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#D1D5DB", true: "#00D9A3" }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Dark Theme Toggle */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-text-dark text-base font-medium">
              Turn Dark Theme
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#D1D5DB", true: "#00D9A3" }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity className="bg-primary rounded-full py-4 mb-8">
            <Text className="text-white text-center font-semibold text-base">
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
