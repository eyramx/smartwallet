import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, ChevronRight } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SecurityMenuItemProps {
  label: string;
  onPress: () => void;
}

function SecurityMenuItem({ label, onPress }: SecurityMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-5 border-b border-white/20 dark:border-dark-bg"
      activeOpacity={0.7}
    >
      <Text className="text-text-dark dark:text-dark-text text-base font-medium">
        {label}
      </Text>
      <ChevronRight size={20} color="#1A3B34" />
    </TouchableOpacity>
  );
}

export default function SecurityScreen() {
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
          Security
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary dark:bg-dark-bg rounded-t-3xl px-6 pt-8">
        <Text className="text-text-dark dark:text-dark-text text-xl font-bold mb-6">
          Security
        </Text>

        <SecurityMenuItem
          label="Change Pin"
          onPress={() => router.push("/profile/security/change-pin")}
        />
        <SecurityMenuItem
          label="Fingerprint"
          onPress={() => router.push("/profile/security/fingerprint")}
        />
        <SecurityMenuItem
          label="Terms And Conditions"
          onPress={() => router.push("/profile/security/terms")}
        />

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
