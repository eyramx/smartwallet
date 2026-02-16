import React from "react";
import { Text, View } from "react-native";

import { FinancialGoal } from "@/contexts/GoalContext";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: FinancialGoal;
  className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, className }) => {
  const percentage = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100,
  );
  const daysLeft = Math.ceil(
    (goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  const isOverdue = daysLeft < 0;
  const isNearDeadline = daysLeft < 30 && daysLeft >= 0;

  return (
    <View className={cn("rounded-2xl bg-white p-5 shadow-sm", className)}>
      {/* Header */}
      <View className="mb-4 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-lg font-bold text-text-dark">
            {goal.name}
          </Text>
          <Text className="text-sm text-text-gray">{goal.category}</Text>
        </View>
        <View
          className="h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: goal.color + "20" }}
        >
          <Text style={{ color: goal.color, fontSize: 20 }}>🎯</Text>
        </View>
      </View>

      {/* Progress */}
      <View className="mb-3">
        <View className="mb-2 flex-row items-baseline justify-between">
          <Text className="text-2xl font-bold text-text-dark">
            ${goal.currentAmount.toFixed(0)}
          </Text>
          <Text className="text-sm text-text-gray">
            of ${goal.targetAmount.toFixed(0)}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full rounded-full"
            style={{
              backgroundColor: goal.color,
              width: `${percentage}%`,
            }}
          />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-xs text-text-gray">
            {percentage.toFixed(0)}% Complete
          </Text>
          <Text
            className={`text-xs ${
              isOverdue
                ? "text-red-500"
                : isNearDeadline
                  ? "text-yellow-600"
                  : "text-text-gray"
            }`}
          >
            {isOverdue
              ? `${Math.abs(daysLeft)} days overdue`
              : `${daysLeft} days left`}
          </Text>
        </View>
      </View>

      {/* Remaining Amount */}
      <View className="rounded-lg bg-secondary px-3 py-2">
        <Text className="text-xs text-text-gray">
          ${(goal.targetAmount - goal.currentAmount).toFixed(0)} more needed
        </Text>
      </View>
    </View>
  );
};
