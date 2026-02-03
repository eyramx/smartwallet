import { BalanceCard } from "@/components/BalanceCard";
import { GoalsCard } from "@/components/GoalsCard";
import { TransactionCard } from "@/components/TransactionCard";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import {
  Bell,
  Briefcase,
  Home as HomeIcon,
  ShoppingBag,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PeriodFilter = "Daily" | "Weekly" | "Monthly";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("Monthly");

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View className="bg-primary pt-12 pb-6 px-6">
        {/* Greeting & Notification */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-text-dark text-2xl font-bold">
              Hi, Welcome Back
            </Text>
            <Text className="text-text-dark/70 text-sm">Good Morning</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
          >
            <Bell size={20} color="#1A3B34" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard
          totalBalance={7783.0}
          totalExpense={1187.4}
          expensePercentage={30}
          targetAmount={20000.0}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Goals Card */}
        <GoalsCard revenueLastWeek="GH₵4,000.00" foodLastWeek="GH₵100.00" />

        {/* Period Filter */}
        <View className="flex-row mb-6 bg-white/50 rounded-full p-1">
          {(["Daily", "Weekly", "Monthly"] as PeriodFilter[]).map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={cn(
                "flex-1 py-3 rounded-full items-center",
                selectedPeriod === period ? "bg-primary" : "bg-transparent",
              )}
            >
              <Text
                className={cn(
                  "font-semibold",
                  selectedPeriod === period ? "text-white" : "text-text-gray",
                )}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <TransactionCard
          icon={
            <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center">
              <Briefcase size={24} color="#ffffff" />
            </View>
          }
          title="Salary"
          time="18:27 - April 30"
          category="Monthly"
          amount={4000.0}
        />

        <TransactionCard
          icon={
            <View className="w-12 h-12 bg-blue-400 rounded-xl items-center justify-center">
              <ShoppingBag size={24} color="#ffffff" />
            </View>
          }
          title="Groceries"
          time="17:00 - April 24"
          category="Pantry"
          amount={100.0}
          isExpense
        />

        <TransactionCard
          icon={
            <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
              <HomeIcon size={24} color="#ffffff" />
            </View>
          }
          title="Rent"
          time="8:30 - April 15"
          category="Rent"
          amount={674.4}
          isExpense
        />

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
