import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react-native";
import { Text, View } from "react-native";

interface TransactionCardProps {
  icon?: React.ReactNode;
  iconBg?: string;
  title: string;
  time?: string;
  date?: string;
  category: string;
  amount: number;
  isExpense?: boolean;
  type?: "income" | "expense";
}

export function TransactionCard({
  icon,
  iconBg = "#60A5FA",
  title,
  time,
  date,
  category,
  amount,
  isExpense,
  type,
}: TransactionCardProps) {
  const timeDate = time && date ? `${time} - ${date}` : time || date || "";
  const isExpenseType = type === "expense" || isExpense;

  return (
    <View className="mb-3 flex-row items-center rounded-3xl bg-white dark:bg-dark-surface p-4">
      {/* Icon */}
      <View
        className="mr-4 h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg }}
      >
        {icon || <DollarSign size={24} color="#fff" />}
      </View>

      {/* Details */}
      <View className="flex-1">
        <Text className="mb-1 text-base font-semibold text-text-dark dark:text-dark-text">
          {title}
        </Text>
        {timeDate && (
          <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
            {timeDate}
          </Text>
        )}
      </View>

      {/* Category & Amount */}
      <View className="items-end">
        <Text className="mb-1 text-sm text-text-gray dark:text-dark-text-secondary">
          {category}
        </Text>
        <Text
          className={cn(
            "text-base font-bold",
            isExpenseType ? "text-red-500" : "text-primary",
          )}
        >
          {isExpenseType ? "-" : "+"}${amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
