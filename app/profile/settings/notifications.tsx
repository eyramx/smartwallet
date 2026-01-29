import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

interface NotificationSettingProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function NotificationSetting({
  label,
  value,
  onValueChange,
}: NotificationSettingProps) {
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-white/20">
      <Text className="text-text-dark text-base font-medium">{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: "#00D9A3" }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(true);
  const [soundCall, setSoundCall] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [transactionUpdate, setTransactionUpdate] = useState(false);
  const [expenseReminder, setExpenseReminder] = useState(false);
  const [budgetNotifications, setBudgetNotifications] = useState(false);
  const [lowBalanceAlerts, setLowBalanceAlerts] = useState(false);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">
          Notification Settings
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <NotificationSetting
          label="General Notification"
          value={generalNotification}
          onValueChange={setGeneralNotification}
        />
        <NotificationSetting
          label="Sound"
          value={sound}
          onValueChange={setSound}
        />
        <NotificationSetting
          label="Sound Call"
          value={soundCall}
          onValueChange={setSoundCall}
        />
        <NotificationSetting
          label="Vibrate"
          value={vibrate}
          onValueChange={setVibrate}
        />
        <NotificationSetting
          label="Transaction Update"
          value={transactionUpdate}
          onValueChange={setTransactionUpdate}
        />
        <NotificationSetting
          label="Expense Reminder"
          value={expenseReminder}
          onValueChange={setExpenseReminder}
        />
        <NotificationSetting
          label="Budget Notifications"
          value={budgetNotifications}
          onValueChange={setBudgetNotifications}
        />
        <NotificationSetting
          label="Low Balance Alerts"
          value={lowBalanceAlerts}
          onValueChange={setLowBalanceAlerts}
        />

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
