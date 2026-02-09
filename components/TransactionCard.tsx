import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

interface TransactionCardProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  category: string;
  amount: number;
  isExpense?: boolean;
}

export function TransactionCard({
  icon,
  title,
  time,
  category,
  amount,
  isExpense = false,
}: TransactionCardProps) {
  const formattedAmount = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount);

  return (
    <View className="flex-row items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm">
      <View className="flex-row items-center gap-4">
        {icon}
        <View>
          <Text className="text-text-dark font-bold text-base">{title}</Text>
          <Text className="text-text-gray text-xs">{time}</Text>
        </View>
      </View>

      <View className="items-end">
        <Text
          className={cn(
            "font-bold text-base",
            isExpense ? "text-red-500" : "text-green-500",
          )}
        >
          {isExpense ? "-" : "+"}
          {formattedAmount}
        </Text>
        <Text className="text-text-gray text-xs">{category}</Text>
      </View>
    </View>
  );
}
