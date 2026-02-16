import { Button } from "@/components/Button";
import { GoalCard } from "@/components/GoalCard";
import { Input } from "@/components/Input";
import { FinancialGoal, useGoal } from "@/contexts/GoalContext";
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

const GOAL_CATEGORIES = [
  { name: "Travel", color: "#FF6B6B", icon: "plane" },
  { name: "Vehicle", color: "#4ECDC4", icon: "car" },
  { name: "Home", color: "#95E1D3", icon: "home" },
  { name: "Education", color: "#AA96DA", icon: "book" },
  { name: "Wedding", color: "#FCBAD3", icon: "heart" },
  { name: "Savings", color: "#A8E6CF", icon: "piggy-bank" },
  { name: "Investment", color: "#FFE66D", icon: "trending-up" },
  { name: "Other", color: "#C7CEEA", icon: "target" },
];

export default function FinancialGoalsScreen() {
  const router = useRouter();
  const { goals, addGoal, deleteGoal, contributeToGoal } = useGoal();
  const [modalVisible, setModalVisible] = useState(false);
  const [contributeModalVisible, setContributeModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    category: "",
    color: GOAL_CATEGORIES[0].color,
    icon: GOAL_CATEGORIES[0].icon,
  });
  const [contributionAmount, setContributionAmount] = useState("");

  const handleOpenModal = () => {
    setFormData({
      name: "",
      targetAmount: "",
      deadline: "",
      category: "",
      color: GOAL_CATEGORIES[0].color,
      icon: GOAL_CATEGORIES[0].icon,
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.targetAmount || !formData.category) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const targetAmount = parseFloat(formData.targetAmount);
    if (isNaN(targetAmount) || targetAmount <= 0) {
      Alert.alert("Error", "Please enter a valid target amount");
      return;
    }

    // Default deadline to 1 year from now if not provided
    const deadline = formData.deadline
      ? new Date(formData.deadline)
      : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    addGoal({
      name: formData.name,
      targetAmount,
      deadline,
      category: formData.category,
      color: formData.color,
      icon: formData.icon,
    });

    setModalVisible(false);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Goal", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteGoal(id),
      },
    ]);
  };

  const handleOpenContribute = (goal: FinancialGoal) => {
    setSelectedGoal(goal);
    setContributionAmount("");
    setContributeModalVisible(true);
  };

  const handleContribute = () => {
    if (!selectedGoal) return;

    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (selectedGoal.currentAmount + amount > selectedGoal.targetAmount) {
      Alert.alert(
        "Notice",
        "This contribution exceeds your goal. The amount will be capped at the target.",
      );
    }

    contributeToGoal(selectedGoal.id, amount);
    setContributeModalVisible(false);
    setSelectedGoal(null);
  };

  const handleSelectCategory = (category: (typeof GOAL_CATEGORIES)[0]) => {
    setFormData((prev) => ({
      ...prev,
      category: category.name,
      color: category.color,
      icon: category.icon,
    }));
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
            Financial Goals
          </Text>
          <TouchableOpacity
            onPress={handleOpenModal}
            className="rounded-full bg-primary p-2"
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {goals.length === 0 ? (
          <View className="mt-20 items-center">
            <Text className="mb-2 text-lg font-semibold text-text-dark">
              No goals yet
            </Text>
            <Text className="mb-6 text-center text-text-gray">
              Set savings goals and track your progress
            </Text>
            <Button title="Create Your First Goal" onPress={handleOpenModal} />
          </View>
        ) : (
          <View className="gap-4">
            {goals.map((goal) => (
              <View key={goal.id} className="relative">
                <TouchableOpacity
                  onPress={() => handleOpenContribute(goal)}
                  activeOpacity={0.7}
                >
                  <GoalCard goal={goal} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(goal.id, goal.name)}
                  className="absolute right-2 top-2 rounded-full bg-red-100 p-2"
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="max-h-[85%] rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <Text className="mb-6 text-xl font-bold text-text-dark">
              New Financial Goal
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Input
                label="Goal Name"
                placeholder="e.g., Vacation to Paris"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
              />

              <Input
                label="Target Amount"
                placeholder="5000.00"
                value={formData.targetAmount}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, targetAmount: text }))
                }
                keyboardType="decimal-pad"
              />

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-text-dark">
                  Category
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-2"
                >
                  {GOAL_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.name}
                      onPress={() => handleSelectCategory(cat)}
                      className={`mr-2 rounded-full px-4 py-2 ${
                        formData.category === cat.name
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      <Text
                        className={
                          formData.category === cat.name
                            ? "text-white"
                            : "text-text-dark"
                        }
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View className="mt-4 flex-row gap-2">
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  variant="secondary"
                  className="flex-1"
                />
                <Button
                  title="Create Goal"
                  onPress={handleSave}
                  className="flex-1"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Contribute Modal */}
      <Modal
        visible={contributeModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setContributeModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <Text className="mb-6 text-xl font-bold text-text-dark">
              Add Contribution
            </Text>

            {selectedGoal && (
              <View className="mb-4 rounded-xl bg-secondary p-4">
                <Text className="mb-1 text-sm text-text-gray">
                  Contributing to
                </Text>
                <Text className="text-lg font-bold text-text-dark">
                  {selectedGoal.name}
                </Text>
                <Text className="mt-2 text-sm text-text-gray">
                  Current: ${selectedGoal.currentAmount.toFixed(0)} / $
                  {selectedGoal.targetAmount.toFixed(0)}
                </Text>
              </View>
            )}

            <Input
              label="Contribution Amount"
              placeholder="100.00"
              value={contributionAmount}
              onChangeText={setContributionAmount}
              keyboardType="decimal-pad"
            />

            <View className="mt-4 flex-row gap-2">
              <Button
                title="Cancel"
                onPress={() => setContributeModalVisible(false)}
                variant="secondary"
                className="flex-1"
              />
              <Button
                title="Add Contribution"
                onPress={handleContribute}
                className="flex-1"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
