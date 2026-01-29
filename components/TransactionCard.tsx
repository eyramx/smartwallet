import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

interface TransactionCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  time: string;
  date?: string;
  category: string;
  amount: number;
  isExpense?: boolean;
}

export function TransactionCard({
  icon,
  iconBg = "#60A5FA",
  title,
  time,
  date,
  category,
  amount,
  isExpense = false,
}: TransactionCardProps) {
  const timeDate = date ? `${time} - ${date}` : time;

  return (
    <View className="flex-row items-center bg-white rounded-3xl p-4 mb-3">
      {/* Icon */}
      <View
        className="mr-4 w-14 h-14 rounded-full items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </View>

      {/* Details */}
      <View className="flex-1">
        <Text className="text-text-dark font-semibold text-base mb-1">
          {title}
        </Text>
        <Text className="text-text-gray text-sm">{timeDate}</Text>
      </View>

      {/* Category & Amount */}
      <View className="items-end">
        <Text className="text-text-gray text-sm mb-1">{category}</Text>
        <Text
          className={cn(
            "font-bold text-base",
            isExpense ? "text-blue-500" : "text-text-dark",
          )}
        >
          {isExpense ? "-" : ""}GH₵{amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
