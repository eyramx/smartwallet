import { BudgetProgressCard } from "@/components/BudgetProgressCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useBudget } from "@/contexts/BudgetContext";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  "Food",
  "Transport",
  "Groceries",
  "Rent",
  "Gifts",
  "Medicine",
  "Entertainment",
  "Savings",
  "Other",
];

export default function BudgetsScreen() {
  const router = useRouter();
  const { budgets, addBudget, deleteBudget } = useBudget();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    period: "monthly" as "monthly" | "weekly",
    alertThreshold: "80",
  });

  const handleAddBudget = () => {
    if (!formData.category || !formData.amount) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    const threshold = parseFloat(formData.alertThreshold);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    addBudget({
      category: formData.category,
      amount,
      period: formData.period,
      alertThreshold: threshold,
    });

    setModalVisible(false);
    setFormData({
      category: "",
      amount: "",
      period: "monthly",
      alertThreshold: "80",
    });
  };

  const handleDeleteBudget = (id: string, category: string) => {
    Alert.alert("Delete Budget", `Remove budget for ${category}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBudget(id),
      },
    ]);
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
            Budgets
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="rounded-full bg-primary p-2"
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {budgets.length === 0 ? (
          <View className="mt-20 items-center">
            <Text className="mb-2 text-lg font-semibold text-text-dark dark:text-dark-text">
              No budgets yet
            </Text>
            <Text className="mb-6 text-center text-text-gray dark:text-dark-text-secondary">
              Set monthly budgets to track your spending
            </Text>
            <Button
              title="Create Your First Budget"
              onPress={() => setModalVisible(true)}
            />
          </View>
        ) : (
          <View className="gap-4">
            {budgets.map((budget) => (
              <View key={budget.id} className="relative">
                <BudgetProgressCard budget={budget} />
                <TouchableOpacity
                  onPress={() => handleDeleteBudget(budget.id, budget.category)}
                  className="absolute right-2 top-2 rounded-full bg-red-100 p-2"
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Budget Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <Text className="mb-6 text-xl font-bold text-text-dark">
              New Budget
            </Text>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-text-dark">
                Category
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() =>
                      setFormData((prev) => ({ ...prev, category: cat }))
                    }
                    className={`mr-2 rounded-full px-4 py-2 ${
                      formData.category === cat ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <Text
                      className={
                        formData.category === cat
                          ? "text-white"
                          : "text-text-dark"
                      }
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Input
              label="Budget Amount"
              placeholder="500.00"
              value={formData.amount}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, amount: text }))
              }
              keyboardType="decimal-pad"
            />

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-text-dark">
                Period
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() =>
                    setFormData((prev) => ({ ...prev, period: "weekly" }))
                  }
                  className={`flex-1 rounded-xl py-3 ${
                    formData.period === "weekly" ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      formData.period === "weekly"
                        ? "text-white"
                        : "text-text-dark"
                    }`}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setFormData((prev) => ({ ...prev, period: "monthly" }))
                  }
                  className={`flex-1 rounded-xl py-3 ${
                    formData.period === "monthly"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      formData.period === "monthly"
                        ? "text-white"
                        : "text-text-dark"
                    }`}
                  >
                    Monthly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Input
              label="Alert at (%)"
              placeholder="80"
              value={formData.alertThreshold}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, alertThreshold: text }))
              }
              keyboardType="number-pad"
            />

            <View className="mt-4 flex-row gap-2">
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                variant="secondary"
                className="flex-1"
              />
              <Button
                title="Add Budget"
                onPress={handleAddBudget}
                className="flex-1"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
