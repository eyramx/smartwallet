import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Key,
    Trash2,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function SettingsMenuItem({ icon, label, onPress }: SettingsMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-5 border-b border-white/20"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
          {icon}
        </View>
        <Text className="text-text-dark text-base font-medium">{label}</Text>
      </View>
      <ChevronRight size={20} color="#1A3B34" />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Settings</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <SettingsMenuItem
          icon={<Bell size={20} color="#ffffff" />}
          label="Notification Settings"
          onPress={() => router.push("/profile/settings/notifications")}
        />
        <SettingsMenuItem
          icon={<Key size={20} color="#ffffff" />}
          label="Password Settings"
          onPress={() => router.push("/profile/settings/password")}
        />
        <SettingsMenuItem
          icon={<Trash2 size={20} color="#ffffff" />}
          label="Delete Account"
          onPress={() => router.push("/profile/settings/delete-account")}
        />

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
