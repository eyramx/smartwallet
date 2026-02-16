import { usePreferences } from "@/contexts/PreferencesContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    DollarSign,
    Globe,
    Key,
    Moon,
    Sun,
    Trash2,
} from "lucide-react-native";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  value?: string;
}

function SettingsMenuItem({
  icon,
  label,
  onPress,
  value,
}: SettingsMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-white/20 dark:border-dark-text-secondary/20 py-5"
      activeOpacity={0.7}
    >
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
          {icon}
        </View>
        <Text className="text-base font-medium text-text-dark dark:text-dark-text">
          {label}
        </Text>
      </View>
      {value ? (
        <Text className="mr-2 text-sm text-text-gray dark:text-dark-text-secondary">
          {value}
        </Text>
      ) : null}
      <ChevronRight size={20} color="#1A3B34" />
    </TouchableOpacity>
  );
}

interface ToggleItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function ToggleItem({
  icon,
  label,
  description,
  value,
  onValueChange,
}: ToggleItemProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-white/20 dark:border-dark-text-secondary/20 py-5">
      <View className="flex-1 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-base font-medium text-text-dark dark:text-dark-text">
            {label}
          </Text>
          {description && (
            <Text className="text-xs text-text-gray dark:text-dark-text-secondary">
              {description}
            </Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: "#02C38E" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const { preferences, updatePreferences } = usePreferences();

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-6 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark dark:text-white">
          Settings
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-dark-surface"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 rounded-t-3xl bg-secondary dark:bg-dark-bg px-6 pt-8">
        {/* Preferences Section */}
        <Text className="mb-3 text-sm font-semibold uppercase text-text-gray dark:text-dark-text-secondary">
          Preferences
        </Text>

        <SettingsMenuItem
          icon={<DollarSign size={20} color="#ffffff" />}
          label="Currency"
          value={preferences.currency}
          onPress={() => {
            // Currency selector modal would go here
            const currencies = [
              { code: "USD", symbol: "$" },
              { code: "EUR", symbol: "€" },
              { code: "GBP", symbol: "£" },
              { code: "GHS", symbol: "GH₵" },
            ];
            // For demo, cycle through currencies
            const current = currencies.findIndex(
              (c) => c.code === preferences.currency,
            );
            const next = currencies[(current + 1) % currencies.length];
            updatePreferences({
              currency: next.code,
              currencySymbol: next.symbol,
            });
          }}
        />

        <SettingsMenuItem
          icon={<Globe size={20} color="#ffffff" />}
          label="Language"
          value={preferences.language}
          onPress={() => {
            // Language selector would go here
          }}
        />

        <ToggleItem
          icon={
            isDarkMode ? (
              <Moon size={20} color="#ffffff" />
            ) : (
              <Sun size={20} color="#ffffff" />
            )
          }
          label="Dark Mode"
          description="Toggle dark/light theme"
          value={isDarkMode}
          onValueChange={() => toggleTheme()}
        />

        {/* Notifications Section */}
        <Text className="mb-3 mt-6 text-sm font-semibold uppercase text-text-gray dark:text-dark-text-secondary">
          Notifications
        </Text>

        <ToggleItem
          icon={<Bell size={20} color="#ffffff" />}
          label="Enable Notifications"
          description="Receive push notifications"
          value={preferences.notificationsEnabled}
          onValueChange={(value) =>
            updatePreferences({ notificationsEnabled: value })
          }
        />

        <ToggleItem
          icon={<Bell size={20} color="#ffffff" />}
          label="Budget Alerts"
          description="Alert when approaching budget limits"
          value={preferences.budgetAlerts}
          onValueChange={(value) => updatePreferences({ budgetAlerts: value })}
        />

        <ToggleItem
          icon={<Bell size={20} color="#ffffff" />}
          label="Goal Reminders"
          description="Remind me about my savings goals"
          value={preferences.goalReminders}
          onValueChange={(value) => updatePreferences({ goalReminders: value })}
        />

        <ToggleItem
          icon={<Bell size={20} color="#ffffff" />}
          label="Weekly Reports"
          description="Receive weekly spending summaries"
          value={preferences.weeklyReports}
          onValueChange={(value) => updatePreferences({ weeklyReports: value })}
        />

        {/* Account Section */}
        <Text className="mb-3 mt-6 text-sm font-semibold uppercase text-text-gray dark:text-dark-text-secondary">
          Account
        </Text>

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
