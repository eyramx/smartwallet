import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCategory } from "@/contexts/CategoryContext";
import {
    RecurringTransaction,
    useRecurringTransaction,
} from "@/contexts/RecurringTransactionContext";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Edit,
    Pause,
    Play,
    Plus,
    Trash2,
} from "lucide-react-native";
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

const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const;

export default function RecurringTransactionsScreen() {
  const router = useRouter();
  const { categories } = useCategory();
  const {
    recurringTransactions,
    addRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    toggleRecurringTransaction,
  } = useRecurringTransaction();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<RecurringTransaction | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    frequency: "monthly" as "daily" | "weekly" | "monthly" | "yearly",
    isActive: true,
  });

  const handleOpenModal = (transaction?: RecurringTransaction) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        description: transaction.description,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        frequency: transaction.frequency,
        isActive: transaction.isActive,
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        description: "",
        amount: "",
        category: "",
        type: "expense",
        frequency: "monthly",
        isActive: true,
      });
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.description || !formData.amount || !formData.category) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const transactionData = {
      description: formData.description,
      amount,
      category: formData.category,
      type: formData.type,
      frequency: formData.frequency,
      startDate: new Date(),
      isActive: formData.isActive,
    };

    if (editingTransaction) {
      updateRecurringTransaction(editingTransaction.id, transactionData);
    } else {
      addRecurringTransaction(transactionData);
    }

    setModalVisible(false);
  };

  const handleDelete = (id: string, description: string) => {
    Alert.alert(
      "Delete Recurring Transaction",
      `Are you sure you want to delete "${description}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteRecurringTransaction(id),
        },
      ],
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
            Recurring Transactions
          </Text>
          <TouchableOpacity
            onPress={() => handleOpenModal()}
            className="rounded-full bg-primary p-2"
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {recurringTransactions.length === 0 ? (
          <View className="mt-20 items-center">
            <Text className="mb-2 text-lg font-semibold text-text-dark">
              No recurring transactions
            </Text>
            <Text className="mb-6 text-center text-text-gray">
              Set up automatic recurring income or expenses
            </Text>
            <Button
              title="Add Recurring Transaction"
              onPress={() => handleOpenModal()}
            />
          </View>
        ) : (
          <View className="gap-3">
            {recurringTransactions.map((transaction) => (
              <View
                key={transaction.id}
                className={`rounded-2xl bg-white p-4 ${!transaction.isActive ? "opacity-50" : ""}`}
              >
                <View className="mb-3 flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="mb-1 text-base font-semibold text-text-dark">
                      {transaction.description}
                    </Text>
                    <Text className="mb-1 text-sm text-text-gray">
                      {transaction.category} • Every {transaction.frequency}
                    </Text>
                    <Text
                      className={`text-lg font-bold ${
                        transaction.type === "expense"
                          ? "text-red-500"
                          : "text-primary"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </Text>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => toggleRecurringTransaction(transaction.id)}
                      className={`rounded-full p-2 ${
                        transaction.isActive ? "bg-yellow-100" : "bg-green-100"
                      }`}
                    >
                      {transaction.isActive ? (
                        <Pause size={16} color="#F59E0B" />
                      ) : (
                        <Play size={16} color="#10B981" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleOpenModal(transaction)}
                      className="rounded-full bg-blue-100 p-2"
                    >
                      <Edit size={16} color="#3B82F6" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleDelete(transaction.id, transaction.description)
                      }
                      className="rounded-full bg-red-100 p-2"
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {!transaction.isActive && (
                  <View className="rounded-lg bg-yellow-100 px-3 py-2">
                    <Text className="text-xs text-yellow-800">Paused</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="max-h-[85%] rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <Text className="mb-6 text-xl font-bold text-text-dark">
              {editingTransaction ? "Edit" : "New"} Recurring Transaction
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Input
                label="Description"
                placeholder="e.g., Monthly Rent"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
              />

              <Input
                label="Amount"
                placeholder="500.00"
                value={formData.amount}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, amount: text }))
                }
                keyboardType="decimal-pad"
              />

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-text-dark">
                  Type
                </Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() =>
                      setFormData((prev) => ({ ...prev, type: "income" }))
                    }
                    className={`flex-1 rounded-xl py-3 ${
                      formData.type === "income" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <Text
                      className={`text-center font-medium ${
                        formData.type === "income"
                          ? "text-white"
                          : "text-text-dark"
                      }`}
                    >
                      Income
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setFormData((prev) => ({ ...prev, type: "expense" }))
                    }
                    className={`flex-1 rounded-xl py-3 ${
                      formData.type === "expense"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    <Text
                      className={`text-center font-medium ${
                        formData.type === "expense"
                          ? "text-white"
                          : "text-text-dark"
                      }`}
                    >
                      Expense
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-text-dark">
                  Category
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-2"
                >
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() =>
                        setFormData((prev) => ({ ...prev, category: cat.name }))
                      }
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

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-text-dark">
                  Frequency
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {FREQUENCIES.map((freq) => (
                    <TouchableOpacity
                      key={freq.value}
                      onPress={() =>
                        setFormData((prev) => ({
                          ...prev,
                          frequency: freq.value,
                        }))
                      }
                      className={`rounded-xl px-4 py-2 ${
                        formData.frequency === freq.value
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      <Text
                        className={
                          formData.frequency === freq.value
                            ? "text-white"
                            : "text-text-dark"
                        }
                      >
                        {freq.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="mt-4 flex-row gap-2">
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  variant="secondary"
                  className="flex-1"
                />
                <Button
                  title={editingTransaction ? "Update" : "Create"}
                  onPress={handleSave}
                  className="flex-1"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
