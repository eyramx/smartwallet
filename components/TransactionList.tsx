import { CategoryIcon } from "@/components/CategoryIcon";
import { DELETE_TRANSACTION } from "@/lib/TransactionService";
import { useMutation } from "@apollo/client";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: {
    name: string;
    icon: string;
    color: string;
    type: string;
  };
}

interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: () => void;
}

export const TransactionItem = ({
  transaction,
  onDelete,
}: TransactionItemProps) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      if (onDelete) onDelete();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction({ variables: { id } });
          },
        },
      ],
    );
  };

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteButton}
      >
        {/* @ts-ignore */}
        <Trash2 size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={() => renderRightActions(transaction.id)}>
      <View className="flex-row items-center justify-between p-4 bg-white mb-2 rounded-2xl mx-4 shadow-sm">
        <View className="flex-row items-center flex-1">
          <View
            className="w-12 h-12 rounded-xl items-center justify-center mr-4"
            style={{
              backgroundColor: transaction.category?.color || "#3b82f6",
            }}
          >
            <CategoryIcon iconName={transaction.category?.icon} />
          </View>
          <View className="flex-1">
            <Text className="text-text-dark font-bold text-base">
              {transaction.description}
            </Text>
            <Text className="text-text-gray text-xs">
              {transaction.category?.name || "Uncategorized"} •{" "}
              {new Date(transaction.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
        <Text
          className={`font-bold text-base ${
            transaction.category?.type === "expense"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {transaction.category?.type === "expense" ? "-" : "+"}
          GH₵{Number(transaction.amount).toFixed(2)}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    marginBottom: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
