import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SupportScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark dark:text-white text-xl font-bold">
          Online Support
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary dark:bg-dark-bg rounded-t-3xl px-6 pt-8">
        <Text className="text-text-dark dark:text-dark-text text-lg font-semibold mb-4">
          Active Chats
        </Text>

        <View className="bg-white/50 dark:bg-dark-surface rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-dark dark:text-dark-text text-base font-semibold mb-1">
                Support Assistant
              </Text>
              <Text className="text-text-gray dark:text-dark-text-secondary text-sm">
                Hello! I'm here to assist you
              </Text>
            </View>
            <Text className="text-text-gray dark:text-dark-text-secondary text-xs">
              2 Min Ago
            </Text>
          </View>
        </View>

        <Text className="text-text-dark dark:text-dark-text text-lg font-semibold mb-4">
          Ended Chats
        </Text>

        <View className="bg-white/50 dark:bg-dark-surface rounded-2xl p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-dark dark:text-dark-text text-base font-semibold mb-1">
                Help Center
              </Text>
              <Text className="text-text-gray dark:text-dark-text-secondary text-sm">
                Your account is ready to use...
              </Text>
            </View>
            <Text className="text-text-gray dark:text-dark-text-secondary text-xs">
              Feb 08 -2024
            </Text>
          </View>
        </View>

        <View className="bg-white/50 dark:bg-dark-surface rounded-2xl p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-dark dark:text-dark-text text-base font-semibold mb-1">
                Support Assistant
              </Text>
              <Text className="text-text-gray dark:text-dark-text-secondary text-sm">
                Hello! I'm here to assist you
              </Text>
            </View>
            <Text className="text-text-gray dark:text-dark-text-secondary text-xs">
              Dic 24 -2023
            </Text>
          </View>
        </View>

        <View className="bg-white/50 dark:bg-dark-surface rounded-2xl p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-dark text-base font-semibold mb-1">
                Support Assistant
              </Text>
              <Text className="text-text-gray text-sm">
                Hello! I'm here to assist you
              </Text>
            </View>
            <Text className="text-text-gray text-xs">Sep 10 -2023</Text>
          </View>
        </View>

        <View className="bg-white/50 rounded-2xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-dark text-base font-semibold mb-1">
                Help Center
              </Text>
              <Text className="text-text-gray text-sm">
                Hi, how are you today?
              </Text>
            </View>
            <Text className="text-text-gray text-xs">June 12 -2023</Text>
          </View>
        </View>

        {/* Start Another Chat Button */}
        <TouchableOpacity className="bg-primary rounded-full py-4 mb-8">
          <Text className="text-white text-center font-semibold text-base">
            Start Another Chat
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
