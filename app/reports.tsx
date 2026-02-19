import { Button } from "@/components/Button";
import { useTransaction } from "@/contexts/TransactionContext";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportsScreen() {
  const router = useRouter();
  const { transactions, filterTransactions } = useTransaction();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");

  const generateCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const data = transactions.map((t) => [
      t.date.toLocaleDateString(),
      t.description,
      t.category,
      t.type,
      t.amount.toFixed(2),
    ]);

    const csv = [headers, ...data].map((row) => row.join(",")).join("\n");

    // In a real app, you would use a library like react-native-fs to save the file
    Alert.alert(
      "CSV Generated",
      `${transactions.length} transactions exported.\n\nIn production, this would download the file.`,
      [{ text: "OK" }],
    );

    console.log("CSV Data:", csv);
  };

  const generatePDF = () => {
    Alert.alert(
      "PDF Report",
      "PDF generation would be implemented using a library like react-native-pdf or similar.\n\nThis would create a formatted financial report.",
      [{ text: "OK" }],
    );
  };

  const generateMonthlyReport = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expenses;
    const savingsRate =
      income > 0 ? ((savings / income) * 100).toFixed(1) : "0";

    const categoryBreakdown = transactions
      .filter((t) => t.type === "expense")
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      );

    const topCategories = Object.entries(categoryBreakdown)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    Alert.alert(
      "Monthly Financial Report",
      `Total Income: $${income.toFixed(2)}\nTotal Expenses: $${expenses.toFixed(2)}\nNet Savings: $${savings.toFixed(2)}\nSavings Rate: ${savingsRate}%\n\nTop Spending Categories:\n${topCategories.map(([cat, amt]) => `• ${cat}: $${amt.toFixed(2)}`).join("\n")}`,
      [{ text: "OK" }],
    );
  };

  return (
    <View className="flex-1 bg-secondary dark:bg-dark-bg">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white dark:bg-dark-surface px-6 pb-4 pt-14">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 rounded-full bg-secondary dark:bg-dark-bg p-2"
          >
            <ArrowLeft size={24} color="#1A3B34" />
          </TouchableOpacity>
          <Text className="flex-1 text-2xl font-bold text-text-dark dark:text-dark-text">
            Reports & Export
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Period Selection */}
        <Text className="mb-3 text-base font-semibold text-text-dark dark:text-dark-text">
          Report Period
        </Text>
        <View className="mb-6 flex-row gap-2">
          {(["week", "month", "year"] as const).map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`flex-1 rounded-xl py-3 ${
                selectedPeriod === period
                  ? "bg-primary dark:bg-dark-primary"
                  : "bg-white dark:bg-dark-surface"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  selectedPeriod === period
                    ? "text-white"
                    : "text-text-dark dark:text-dark-text"
                }`}
              >
                This {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Options */}
        <Text className="mb-3 text-base font-semibold text-text-dark dark:text-dark-text">
          Export Formats
        </Text>

        <TouchableOpacity
          onPress={generateCSV}
          className="mb-3 flex-row items-center rounded-2xl bg-white dark:bg-dark-surface p-4"
        >
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
            <FileSpreadsheet size={24} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-base font-semibold text-text-dark dark:text-dark-text">
              Export to CSV
            </Text>
            <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
              Download transactions as spreadsheet
            </Text>
          </View>
          <Download size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={generatePDF}
          className="mb-3 flex-row items-center rounded-2xl bg-white dark:bg-dark-surface p-4"
        >
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <FileText size={24} color="#EF4444" />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-base font-semibold text-text-dark dark:text-dark-text">
              Export to PDF
            </Text>
            <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
              Generate formatted report
            </Text>
          </View>
          <Download size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Reports */}
        <Text className="mb-3 mt-4 text-base font-semibold text-text-dark dark:text-dark-text">
          Financial Reports
        </Text>

        <TouchableOpacity
          onPress={generateMonthlyReport}
          className="mb-3 rounded-2xl bg-white dark:bg-dark-surface p-4"
        >
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary/20 dark:bg-dark-primary/20">
              <Calendar size={20} color="#02C38E" />
            </View>
            <Text className="text-base font-semibold text-text-dark dark:text-dark-text">
              Monthly Summary
            </Text>
          </View>
          <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
            Income, expenses, and savings overview
          </Text>
        </TouchableOpacity>

        <View className="rounded-2xl bg-white dark:bg-dark-surface p-4">
          <Text className="mb-2 text-base font-semibold text-text-dark dark:text-dark-text">
            Tax Summary
          </Text>
          <Text className="mb-4 text-sm text-text-gray dark:text-dark-text-secondary">
            Coming soon: Tax-ready transaction summaries for filing
          </Text>
          <Button title="Coming Soon" variant="secondary" />
        </View>

        {/* Quick Stats */}
        <View className="mt-6 rounded-2xl bg-white dark:bg-dark-surface p-4">
          <Text className="mb-4 text-base font-semibold text-text-dark dark:text-dark-text">
            Quick Stats
          </Text>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
                Total Transactions
              </Text>
              <Text className="text-sm font-semibold text-text-dark dark:text-dark-text">
                {transactions.length}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
                This Month's Income
              </Text>
              <Text className="text-sm font-semibold text-primary dark:text-dark-primary">
                $
                {transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-text-gray dark:text-dark-text-secondary">
                This Month's Expenses
              </Text>
              <Text className="text-sm font-semibold text-red-500">
                $
                {transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
