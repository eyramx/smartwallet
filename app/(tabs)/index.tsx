import { BalanceCard } from "@/components/BalanceCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { GoalsCard } from "@/components/GoalsCard";
import { TransactionCard } from "@/components/TransactionCard";
import { cn } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { Bell, Plus } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type PeriodFilter = "Daily" | "Weekly" | "Monthly";

const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    recentTransactions: transactions(order_by: { date: desc }, limit: 5) {
      id
      amount
      description
      date
      category {
        name
        icon
        color
        type
      }
    }
    incomeStats: transactions_aggregate(
      where: { category: { type: { _eq: "income" } } }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    expenseStats: transactions_aggregate(
      where: { category: { type: { _eq: "expense" } } }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

export default function HomeScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("Monthly");

  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_DATA);

  if (loading) {
    return (
      <View className="flex-1 bg-secondary items-center justify-center">
        <ActivityIndicator size="large" color="#1A3B34" />
      </View>
    );
  }

  // Calculate totals
  const totalIncome = data?.incomeStats?.aggregate?.sum?.amount || 0;
  const totalExpense = data?.expenseStats?.aggregate?.sum?.amount || 0;
  const totalBalance = totalIncome - totalExpense;
  const expensePercentage =
    totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const targetAmount = 20000.0; // Hardcoded for now, or fetch from settings

  const transactions = data?.recentTransactions || [];

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
            {/* @ts-ignore */}
            <Bell size={20} color="#1A3B34" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard
          totalBalance={totalBalance}
          totalExpense={totalExpense}
          expensePercentage={expensePercentage}
          targetAmount={targetAmount}
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
        <View className="mb-4">
          <Text className="text-lg font-bold text-text-dark mb-4">
            Recent Transactions
          </Text>
          {transactions.length === 0 ? (
            <Text className="text-text-gray text-center py-8">
              No transactions yet
            </Text>
          ) : (
            transactions.map((tx: any) => (
              <TransactionCard
                key={tx.id}
                icon={
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: tx.category?.color || "#3b82f6" }}
                  >
                    <CategoryIcon iconName={tx.category?.icon} />
                  </View>
                }
                title={tx.description}
                time={
                  new Date(tx.date).toLocaleDateString() +
                  " " +
                  new Date(tx.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
                category={tx.category?.name || "Uncategorized"}
                amount={tx.amount}
                isExpense={tx.category?.type === "expense"}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction" as any)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
      >
        {/* @ts-ignore */}
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
