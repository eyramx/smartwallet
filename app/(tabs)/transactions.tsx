import { TransactionItem } from "@/components/TransactionList";
import { GET_ALL_TRANSACTIONS } from "@/lib/TransactionService";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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

interface GetAllTransactionsData {
  transactions: Transaction[];
}

export default function TransactionsScreen() {
  const router = useRouter();
  const { data, loading, error, refetch } =
    useQuery<GetAllTransactionsData>(GET_ALL_TRANSACTIONS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading && !refreshing && !data) {
    return (
      <View className="flex-1 bg-secondary items-center justify-center">
        <ActivityIndicator size="large" color="#1A3B34" />
      </View>
    );
  }

  const transactions = data?.transactions || [];

  // Group transactions by date
  // For now, we'll just render a simple list. Improvements for sections can come later.

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-bold">Transactions</Text>
        <Text className="text-white/70 text-sm">Your spending history</Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 pt-6">
        {transactions.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-text-gray text-lg">No transactions yet</Text>
            <TouchableOpacity
              onPress={() => router.push("/add-transaction" as any)}
              className="mt-4 bg-primary px-6 py-3 rounded-full"
            >
              <Text className="text-white font-bold">
                Add First Transaction
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionItem transaction={item} onDelete={refetch} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* FAB - redundancy with index screen but good for UX */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction" as any)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
      >
        {/* @ts-ignore */}
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
