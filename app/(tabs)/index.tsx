import { BalanceCard } from "@/components/BalanceCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { GoalsCard } from "@/components/GoalsCard";
import { TransactionCard } from "@/components/TransactionCard";
import { cn } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { Bell, Plus } from "lucide-react-native";
import { useMemo, useState } from "react"; // Added useMemo and useState
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
  query GetDashboardData($lastWeek: timestamptz!, $filterDate: timestamptz!) {
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
    incomePeriod: transactions_aggregate(
      where: {
        category: { type: { _eq: "income" } }
        date: { _gte: $filterDate }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    expensePeriod: transactions_aggregate(
      where: {
        category: { type: { _eq: "expense" } }
        date: { _gte: $filterDate }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    incomeLastWeek: transactions_aggregate(
      where: {
        category: { type: { _eq: "income" } }
        date: { _gte: $lastWeek }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    foodLastWeek: transactions_aggregate(
      where: {
        category: { name: { _ilike: "%food%" } }
        date: { _gte: $lastWeek }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category?: {
    name: string;
    icon: string;
    color: string;
    type: string;
  };
}

export default function HomeScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("Monthly");

  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const filterDate = useMemo(() => {
    const date = new Date();
    if (selectedPeriod === "Daily") date.setHours(0, 0, 0, 0);
    else if (selectedPeriod === "Weekly") date.setDate(date.getDate() - 7);
    else if (selectedPeriod === "Monthly") date.setMonth(date.getMonth() - 1);
    return date.toISOString();
  }, [selectedPeriod]);

  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_DATA, {
    variables: {
      lastWeek: lastWeekDate.toISOString(),
      filterDate: filterDate,
    },
  });

  if (loading) {
    return (
      <View className="flex-1 bg-secondary dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#1A3B34" />
      </View>
    );
  }

  // Calculate totals based on filtered period
  const totalIncome = data?.incomePeriod?.aggregate?.sum?.amount || 0;
  const totalExpense = data?.expensePeriod?.aggregate?.sum?.amount || 0;
  const totalBalance = totalIncome - totalExpense;
  const expensePercentage =
    totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const targetAmount = 20000.0; // Hardcoded for now, or fetch from settings

  const incomeLastWeek = data?.incomeLastWeek?.aggregate?.sum?.amount || 0;
  const foodLastWeek = data?.foodLastWeek?.aggregate?.sum?.amount || 0;

  const transactions = data?.recentTransactions || [];

  return (
    <View className="flex-1 bg-secondary dark:bg-dark-bg">
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View className="bg-primary dark:bg-dark-primary pt-12 pb-6 px-6">
        {/* Greeting & Notification */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-text-dark dark:text-white text-2xl font-bold">
              Hi, Welcome Back
            </Text>
            <Text className="text-text-dark/70 dark:text-white/80 text-sm">
              Good Morning
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
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
        <GoalsCard
          revenueLastWeek={`GH₵${incomeLastWeek.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          foodLastWeek={`GH₵${foodLastWeek.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        />

        {/* Period Filter */}
        <View className="flex-row mb-6 bg-white/50 dark:bg-dark-surface/50 rounded-full p-1">
          {(["Daily", "Weekly", "Monthly"] as PeriodFilter[]).map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={cn(
                "flex-1 py-3 rounded-full items-center",
                selectedPeriod === period
                  ? "bg-primary dark:bg-dark-primary"
                  : "bg-transparent",
              )}
            >
              <Text
                className={cn(
                  "font-semibold",
                  selectedPeriod === period
                    ? "text-white"
                    : "text-text-gray dark:text-dark-text-secondary",
                )}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-text-dark dark:text-white mb-4">
            Recent Transactions
          </Text>
          {transactions.length === 0 ? (
            <Text className="text-text-gray text-center py-8">
              No transactions yet
            </Text>
          ) : (
            transactions.map((tx: Transaction) => (
              <TransactionCard
                key={tx.id}
                icon={
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: tx.category?.color || "#3b82f6" }}
                  >
                    <CategoryIcon
                      iconName={tx.category?.icon || "shopping-bag"}
                    />
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
