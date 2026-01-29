import { CheckCircle2, Receipt, Wallet } from "lucide-react-native";
import { Text, View } from "react-native";

interface BalanceCardProps {
  totalBalance: number;
  totalExpense: number;
  expensePercentage: number;
  targetAmount: number;
}

export function BalanceCard({
  totalBalance,
  totalExpense,
  expensePercentage,
  targetAmount,
}: BalanceCardProps) {
  return (
    <View className="mb-6">
      {/* Balance & Expense */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <View className="flex-row items-center mb-1">
            <Wallet size={16} color="rgba(255,255,255,0.8)" />
            <Text className="text-white/80 text-sm ml-2">Total Balance</Text>
          </View>
          <Text className="text-white text-3xl font-bold">
            GH₵
            {totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>

        <View className="items-end">
          <View className="flex-row items-center mb-1">
            <Receipt size={16} color="rgba(255,255,255,0.8)" />
            <Text className="text-white/80 text-sm ml-2">Total Expense</Text>
          </View>
          <Text className="text-blue-400 text-2xl font-bold">
            -GH₵
            {totalExpense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="bg-text-dark/20 rounded-full h-8 flex-row items-center px-1 mb-2">
        <View
          className="bg-white rounded-full h-6 items-center justify-center"
          style={{ width: `${expensePercentage}%` }}
        >
          <Text className="text-text-dark font-semibold text-xs px-3">
            {expensePercentage}%
          </Text>
        </View>
        <Text className="text-white font-semibold text-sm ml-auto mr-2">
          GH₵
          {targetAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      {/* Status Message */}
      <View className="flex-row items-center">
        <CheckCircle2 size={16} color="rgba(255,255,255,0.9)" />
        <Text className="text-white/90 text-sm ml-2">
          {expensePercentage}% Of Your Expenses, Looks Good.
        </Text>
      </View>
    </View>
  );
}
