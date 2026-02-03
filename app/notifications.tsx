import { NotificationCard } from "@/components/NotificationCard";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Bell,
    DollarSign,
    Receipt,
    Star,
} from "lucide-react-native";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A3B34" />
          </TouchableOpacity>
          <Text className="text-text-dark text-xl font-bold">Notification</Text>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center">
            <Bell size={20} color="#1A3B34" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Today */}
        <Text className="text-text-dark font-bold text-lg mb-4">Today</Text>

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <Bell size={24} color="#ffffff" />
            </View>
          }
          title="Reminder!"
          description="Set up your automatic savings to meet your savings goal..."
          time="17:00 - April 24"
        />

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <Star size={24} color="#ffffff" />
            </View>
          }
          title="New Update"
          description="Set up your automatic savings to meet your savings goal..."
          time="17:00 - April 24"
        />

        {/* Yesterday */}
        <Text className="text-text-dark font-bold text-lg mb-4 mt-4">
          Yesterday
        </Text>

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <DollarSign size={24} color="#ffffff" />
            </View>
          }
          title="Transactions"
          description="A new transaction has been registered"
          transactionDetails="Groceries | Pantry | -$100,00"
          time="17:00 - April 24"
        />

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <Bell size={24} color="#ffffff" />
            </View>
          }
          title="Reminder!"
          description="Set up your automatic savings to meet your savings goal..."
          time="17:00 - April 24"
        />

        {/* This Weekend */}
        <Text className="text-text-dark font-bold text-lg mb-4 mt-4">
          This Weekend
        </Text>

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <Receipt size={24} color="#ffffff" />
            </View>
          }
          title="Expense Record"
          description="We recommend that you be more attentive to your finances."
          time="17:00 - April 24"
        />

        <NotificationCard
          icon={
            <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center">
              <DollarSign size={24} color="#ffffff" />
            </View>
          }
          title="Transactions"
          description="A new transaction has been registered"
          transactionDetails="Food | Dinner | -$70,40"
          time="17:00 - April 24"
        />

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
