import { TransactionCard } from "@/components/TransactionCard";
import { useCategory } from "@/contexts/CategoryContext";
import {
    TransactionFilters,
    useTransaction,
} from "@/contexts/TransactionContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchScreen() {
  const router = useRouter();
  const { categories } = useCategory();
  const { searchTransactions, filterTransactions } = useTransaction();

  const [searchText, setSearchText] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    sortBy: "date",
    sortOrder: "desc",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reportType, setReportType] = useState<
    "income" | "expense" | undefined
  >(undefined);

  // Get filtered/searched results
  const results = searchText
    ? searchTransactions(searchText)
    : filterTransactions({
        ...filters,
        category: selectedCategory || undefined,
        type: reportType,
      });

  const handleApplyFilters = () => {
    setFilterModalVisible(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setReportType(undefined);
    setFilters({
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-6 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark dark:text-white">
          Search
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-dark-surface"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 rounded-t-3xl bg-secondary dark:bg-dark-bg px-6 pt-6">
        {/* Search Input */}
        <View className="mb-4 flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center rounded-full bg-white px-4 py-3">
            <TextInput
              className="flex-1 text-base text-text-dark"
              placeholder="Search transactions..."
              placeholderTextColor="#A8C5BC"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(true)}
            className="h-12 w-12 items-center justify-center rounded-full bg-primary"
          >
            <SlidersHorizontal size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <TouchableOpacity
            onPress={() =>
              setReportType(reportType === "income" ? undefined : "income")
            }
            className={`mr-2 rounded-full px-4 py-2 ${
              reportType === "income" ? "bg-primary" : "bg-white"
            }`}
          >
            <Text
              className={
                reportType === "income" ? "text-white" : "text-text-dark"
              }
            >
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setReportType(reportType === "expense" ? undefined : "expense")
            }
            className={`mr-2 rounded-full px-4 py-2 ${
              reportType === "expense" ? "bg-primary" : "bg-white"
            }`}
          >
            <Text
              className={
                reportType === "expense" ? "text-white" : "text-text-dark"
              }
            >
              Expense
            </Text>
          </TouchableOpacity>
          {categories.slice(0, 5).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === cat.name ? "" : cat.name,
                )
              }
              className={`mr-2 rounded-full px-4 py-2 ${
                selectedCategory === cat.name ? "bg-primary" : "bg-white"
              }`}
            >
              <Text
                className={
                  selectedCategory === cat.name
                    ? "text-white"
                    : "text-text-dark"
                }
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-base font-bold text-text-dark">
            {results.length} Result{results.length !== 1 ? "s" : ""}
          </Text>
          {(selectedCategory || reportType) && (
            <TouchableOpacity onPress={handleClearFilters}>
              <Text className="text-sm text-primary">Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {results.length === 0 ? (
            <View className="mt-20 items-center">
              <Text className="mb-2 text-base text-text-gray">
                No transactions found
              </Text>
              <Text className="text-sm text-text-gray">
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            <View className="gap-3 pb-24">
              {results.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  title={transaction.description}
                  amount={transaction.amount}
                  date={transaction.date.toLocaleDateString()}
                  category={transaction.category}
                  type={transaction.type}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-text-dark">Filters</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text className="text-primary">Done</Text>
              </TouchableOpacity>
            </View>

            <Text className="mb-2 text-sm font-medium text-text-dark">
              Sort By
            </Text>
            <View className="mb-4 flex-row gap-2">
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "date" }))
                }
                className={`flex-1 rounded-xl py-3 ${
                  filters.sortBy === "date" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    filters.sortBy === "date" ? "text-white" : "text-text-dark"
                  }`}
                >
                  Date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "amount" }))
                }
                className={`flex-1 rounded-xl py-3 ${
                  filters.sortBy === "amount" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    filters.sortBy === "amount"
                      ? "text-white"
                      : "text-text-dark"
                  }`}
                >
                  Amount
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="mb-2 text-sm font-medium text-text-dark">
              Order
            </Text>
            <View className="mb-4 flex-row gap-2">
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortOrder: "asc" }))
                }
                className={`flex-1 rounded-xl py-3 ${
                  filters.sortOrder === "asc" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    filters.sortOrder === "asc"
                      ? "text-white"
                      : "text-text-dark"
                  }`}
                >
                  Ascending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortOrder: "desc" }))
                }
                className={`flex-1 rounded-xl py-3 ${
                  filters.sortOrder === "desc" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    filters.sortOrder === "desc"
                      ? "text-white"
                      : "text-text-dark"
                  }`}
                >
                  Descending
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
