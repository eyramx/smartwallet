import { TrendingDown } from "lucide-react-native";
import { Text, View } from "react-native";

interface BalanceCardProps {
  totalBalance: number;
  totalExpense: number;
  expensePercentage?: number;
  targetAmount?: number;
}

export function BalanceCard({
  totalBalance,
  totalExpense,
  expensePercentage = 0,
  targetAmount = 0,
}: BalanceCardProps) {
  const formattedBalance = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(totalBalance);

  const formattedExpense = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(totalExpense);

  return (
    <View className="bg-secondary rounded-3xl p-6 shadow-sm">
      <View className="mb-6">
        <Text className="text-text-gray mb-1 text-base">Total Balance</Text>
        <Text className="text-4xl font-bold text-text-dark">
          {formattedBalance}
        </Text>
      </View>

      <View className="flex-row justify-between items-center bg-white/50 p-4 rounded-2xl">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
            <TrendingDown size={20} color="#FF6B6B" />
          </View>
          <View>
            <Text className="text-text-gray text-xs">Total Expense</Text>
            <Text className="text-text-dark font-bold text-base">
              {formattedExpense}
            </Text>
          </View>
        </View>

        <View className="bg-red-100 px-3 py-1 rounded-full">
          <Text className="text-red-500 text-xs font-bold">
            {expensePercentage.toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
