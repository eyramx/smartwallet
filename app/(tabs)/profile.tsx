import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    BarChart3,
    Bell,
    FileText,
    HelpCircle,
    List,
    LogOut,
    Repeat,
    Settings,
    Shield,
    Target,
    User,
    Wallet,
} from "lucide-react-native";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function ProfileMenuItem({ icon, label, onPress }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center mb-4"
      activeOpacity={0.7}
    >
      <View className="w-14 h-14 rounded-full bg-blue-400 dark:bg-dark-primary items-center justify-center mr-4">
        {icon}
      </View>
      <Text className="text-text-dark dark:text-dark-text text-base font-medium flex-1">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfileTabScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    // TODO: Clear auth state
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <View className="w-10 h-10" />
        </TouchableOpacity>
        <Text className="text-text-dark dark:text-white text-xl font-bold">
          Profile
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <ScrollView className="flex-1 bg-secondary dark:bg-dark-bg rounded-t-3xl">
        {/* Profile Image & Name */}
        <View className="items-center pt-8 pb-6">
          <View className="w-32 h-32 rounded-full bg-gray-300 dark:bg-dark-surface mb-4 overflow-hidden">
            {/* Placeholder for profile image */}
            <View className="w-full h-full bg-gray-400 dark:bg-gray-600" />
          </View>
          <Text className="text-text-dark dark:text-dark-text text-2xl font-bold mb-1">
            John Smith
          </Text>
          <Text className="text-text-gray dark:text-dark-text-secondary text-sm">
            ID: 25030024
          </Text>
        </View>

        {/* Menu Items */}
        <View className="px-6 pt-6">
          {/* Personal Section */}
          <Text className="text-xs font-semibold uppercase text-text-gray dark:text-dark-text-secondary mb-3">
            Personal
          </Text>
          <ProfileMenuItem
            icon={<User size={24} color="#ffffff" />}
            label="Edit Profile"
            onPress={() => router.push("/profile/edit")}
          />
          <ProfileMenuItem
            icon={<Shield size={24} color="#ffffff" />}
            label="Security"
            onPress={() => router.push("/profile/security")}
          />
          <ProfileMenuItem
            icon={<Settings size={24} color="#ffffff" />}
            label="Settings"
            onPress={() => router.push("/profile/settings")}
          />

          {/* Financial Tools Section */}
          <Text className="text-xs font-semibold uppercase text-text-gray mb-3 mt-6">
            Financial Tools
          </Text>
          <ProfileMenuItem
            icon={<Wallet size={24} color="#ffffff" />}
            label="Budgets"
            onPress={() => router.push("/budgets")}
          />
          <ProfileMenuItem
            icon={<List size={24} color="#ffffff" />}
            label="Categories"
            onPress={() => router.push("/categories-management")}
          />
          <ProfileMenuItem
            icon={<Target size={24} color="#ffffff" />}
            label="Financial Goals"
            onPress={() => router.push("/financial-goals")}
          />
          <ProfileMenuItem
            icon={<Repeat size={24} color="#ffffff" />}
            label="Recurring Transactions"
            onPress={() => router.push("/recurring-transactions")}
          />

          {/* Reports & Data Section */}
          <Text className="text-xs font-semibold uppercase text-text-gray mb-3 mt-6">
            Reports & Data
          </Text>
          <ProfileMenuItem
            icon={<BarChart3 size={24} color="#ffffff" />}
            label="Analytics"
            onPress={() => router.push("/analysis")}
          />
          <ProfileMenuItem
            icon={<FileText size={24} color="#ffffff" />}
            label="Reports & Export"
            onPress={() => router.push("/reports")}
          />

          {/* Support Section */}
          <Text className="text-xs font-semibold uppercase text-text-gray mb-3 mt-6">
            Support
          </Text>
          <ProfileMenuItem
            icon={<HelpCircle size={24} color="#ffffff" />}
            label="Help"
            onPress={() => router.push("/profile/help")}
          />
          <ProfileMenuItem
            icon={<LogOut size={24} color="#ffffff" />}
            label="Logout"
            onPress={() => setShowLogoutModal(true)}
          />
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-8">
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm">
            <Text className="text-text-dark text-xl font-bold text-center mb-4">
              End Session
            </Text>
            <Text className="text-text-gray text-center mb-6">
              Are you sure you want to log out?
            </Text>

            {/* Yes, End Session Button */}
            <TouchableOpacity
              className="bg-primary rounded-full py-4 mb-3"
              onPress={handleLogout}
            >
              <Text className="text-white text-center font-semibold text-base">
                Yes, End Session
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-secondary rounded-full py-4"
              onPress={() => setShowLogoutModal(false)}
            >
              <Text className="text-text-dark text-center font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
