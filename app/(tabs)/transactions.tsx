import { TransactionItem } from "@/components/TransactionList";
import { GET_ALL_TRANSACTIONS } from "@/lib/TransactionService";
import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    SectionList,
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

  const sections = useMemo(() => {
    if (!data?.transactions) return [];

    const groups: { [key: string]: Transaction[] } = {};

    data.transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let dateString = "";
      if (date.toDateString() === today.toDateString()) {
        dateString = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateString = "Yesterday";
      } else {
        dateString = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(transaction);
    });

    return Object.keys(groups).map((date) => ({
      title: date,
      data: groups[date],
    }));
  }, [data]);

  if (loading && !refreshing && !data) {
    return (
      <View className="flex-1 bg-secondary items-center justify-center">
        <ActivityIndicator size="large" color="#1A3B34" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary pt-12 pb-6 px-6">
        <Text className="text-white text-2xl font-bold">Transactions</Text>
        <Text className="text-white/70 text-sm">Your spending history</Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-4">
        {sections.length === 0 ? (
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
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionItem transaction={item} onDelete={refetch} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View className="bg-secondary py-3">
                <Text className="text-text-gray font-semibold uppercase text-xs tracking-wider">
                  {title}
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            stickySectionHeadersEnabled={false}
          />
        )}
      </View>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/add-transaction" as any)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
