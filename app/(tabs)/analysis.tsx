import { BalanceCard } from "@/components/BalanceCard";
import { BarChart } from "@/components/BarChart";
import { ProgressCircle } from "@/components/ProgressCircle";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, Bell, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type PeriodFilter = "Daily" | "Weekly" | "Monthly" | "Year";

export default function AnalysisScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("Daily");

  // Dynamic chart data based on selected period
  const chartData = useMemo(() => {
    switch (selectedPeriod) {
      case "Daily":
        return {
          data: [
            { day: "Mon", value: 10000 },
            { day: "Tue", value: 5000 },
            { day: "Wed", value: 8000 },
            { day: "Thu", value: 3000 },
            { day: "Fri", value: 12000 },
            { day: "Sat", value: 4000 },
            { day: "Sun", value: 9000 },
          ],
          maxValue: 15000,
          income: "GH₵4,120.00",
          expense: "GH₵1,187.40",
        };
      case "Weekly":
        return {
          data: [
            { day: "1st Week", value: 8000 },
            { day: "2nd Week", value: 3000 },
            { day: "3rd Week", value: 9000 },
            { day: "4th Week", value: 7000 },
          ],
          maxValue: 15000,
          income: "GH₵11,420.00",
          expense: "GH₵20,000.20",
        };
      case "Monthly":
        return {
          data: [
            { day: "Jan", value: 12000 },
            { day: "Feb", value: 6000 },
            { day: "Mar", value: 9000 },
            { day: "Apr", value: 4000 },
            { day: "May", value: 13000 },
            { day: "Jun", value: 5000 },
          ],
          maxValue: 15000,
          income: "GH₵47,200.00",
          expense: "GH₵35,510.20",
        };
      case "Year":
        return {
          data: [
            { day: "2019", value: 60000 },
            { day: "2020", value: 80000 },
            { day: "2021", value: 95000 },
            { day: "2022", value: 65000 },
            { day: "2023", value: 90000 },
          ],
          maxValue: 100000,
          income: "GH₵430,560.00",
          expense: "GH₵320,300.00",
        };
    }
  }, [selectedPeriod]);

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="w-10 h-10" />
          </TouchableOpacity>
          <Text className="text-text-dark text-xl font-bold">Analysis</Text>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
          >
            <Bell size={20} color="#1A3B34" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          onPress={() => router.push("/search")}
          activeOpacity={0.7}
          className="bg-white rounded-full px-4 py-3 flex-row items-center mb-4"
        >
          <Search size={20} color="#A8C5BC" />
          <Text className="flex-1 text-text-gray text-base ml-2">
            Search...
          </Text>
        </TouchableOpacity>

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
        {/* Period Filter */}
        <View className="flex-row mb-6 bg-white/50 rounded-full p-1">
          {(["Daily", "Weekly", "Monthly", "Year"] as PeriodFilter[]).map(
            (period) => (
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
                    "font-semibold text-sm",
                    selectedPeriod === period ? "text-white" : "text-text-gray",
                  )}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* Bar Chart */}
        <BarChart data={chartData.data} maxValue={chartData.maxValue} />

        {/* Income & Expense Cards */}
        <View className="flex-row gap-4 mb-6">
          {/* Income */}
          <View className="flex-1 bg-white rounded-3xl p-6 items-center">
            <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mb-3">
              <ArrowUpRight size={24} color="#00D9A3" />
            </View>
            <Text className="text-text-gray text-sm mb-2">Income</Text>
            <Text className="text-text-dark font-bold text-xl">
              {chartData.income}
            </Text>
          </View>

          {/* Expense */}
          <View className="flex-1 bg-white rounded-3xl p-6 items-center">
            <View className="w-12 h-12 bg-blue-500/20 rounded-xl items-center justify-center mb-3">
              <ArrowDownLeft size={24} color="#3B82F6" />
            </View>
            <Text className="text-text-gray text-sm mb-2">Expense</Text>
            <Text className="text-blue-500 font-bold text-xl">
              {chartData.expense}
            </Text>
          </View>
        </View>

        {/* My Targets */}
        <Text className="text-text-dark font-bold text-lg mb-4">
          My Targets
        </Text>

        {/* Progress Circles */}
        <View className="flex-row gap-4 mb-6">
          <ProgressCircle percentage={30} label="Travel" />
          <ProgressCircle percentage={50} label="Car" />
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
