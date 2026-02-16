import { AlertCircle } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import { Budget } from "@/contexts/BudgetContext";
import { cn } from "@/lib/utils";

interface BudgetProgressCardProps {
  budget: Budget;
  className?: string;
}

export const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({
  budget,
  className,
}) => {
  const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
  const isOverBudget = budget.spent > budget.amount;
  const isNearLimit = percentage >= budget.alertThreshold;

  const getProgressColor = () => {
    if (isOverBudget) return "bg-red-500";
    if (isNearLimit) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <View
      className={cn(
        "rounded-2xl bg-white dark:bg-dark-surface p-4 shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-text-dark dark:text-dark-text">
          {budget.category}
        </Text>
        {isNearLimit && (
          <AlertCircle size={20} color={isOverBudget ? "#EF4444" : "#F59E0B"} />
        )}
      </View>

      {/* Amount */}
      <View className="mb-2 flex-row items-baseline justify-between">
        <Text className="text-2xl font-bold text-text-dark dark:text-dark-text">
          ${budget.spent.toFixed(2)}
        </Text>
        <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
          of ${budget.amount.toFixed(2)}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-bg">
        <View
          className={cn("h-full rounded-full", getProgressColor())}
          style={{ width: `${percentage}%` }}
        />
      </View>

      {/* Status */}
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xs text-text-gray">
          {percentage.toFixed(0)}% used
        </Text>
        <Text className="text-xs text-text-gray">
          ${(budget.amount - budget.spent).toFixed(2)} remaining
        </Text>
      </View>

      {isOverBudget && (
        <Text className="mt-2 text-xs text-red-500">
          You've exceeded your budget by $
          {(budget.spent - budget.amount).toFixed(2)}
        </Text>
      )}
    </View>
  );
};
