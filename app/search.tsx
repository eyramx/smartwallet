import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Bell,
    Calendar,
    ChevronDown
} from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("30 /APR/2023");
  const [reportType, setReportType] = useState<"income" | "expense">("expense");

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Search</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-6">
        {/* Search Input */}
        <View className="bg-white rounded-full px-4 py-3 flex-row items-center mb-6">
          <TextInput
            className="flex-1 text-text-dark text-base"
            placeholder="Search..."
            placeholderTextColor="#A8C5BC"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <Text className="text-text-dark font-bold text-base mb-3">
          Categories
        </Text>
        <TouchableOpacity className="bg-white/50 rounded-2xl px-4 py-4 flex-row items-center justify-between mb-6">
          <Text className="text-text-gray text-base">
            {selectedCategory || "Select the category"}
          </Text>
          <ChevronDown size={20} color="#00D9A3" />
        </TouchableOpacity>

        {/* Date */}
        <Text className="text-text-dark font-bold text-base mb-3">Date</Text>
        <View className="bg-white/50 rounded-2xl px-4 py-4 flex-row items-center justify-between mb-6">
          <Text className="text-text-dark text-base">{selectedDate}</Text>
          <TouchableOpacity className="w-10 h-10 bg-primary rounded-full items-center justify-center">
            <Calendar size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Report */}
        <Text className="text-text-dark font-bold text-base mb-3">Report</Text>
        <View className="flex-row gap-6 mb-8">
          {/* Income */}
          <TouchableOpacity
            onPress={() => setReportType("income")}
            className="flex-row items-center gap-2"
            activeOpacity={0.7}
          >
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                reportType === "income" ? "border-primary" : "border-text-gray"
              }`}
            >
              {reportType === "income" && (
                <View className="w-3 h-3 rounded-full bg-primary" />
              )}
            </View>
            <Text className="text-text-dark text-base">Income</Text>
          </TouchableOpacity>

          {/* Expense */}
          <TouchableOpacity
            onPress={() => setReportType("expense")}
            className="flex-row items-center gap-2"
            activeOpacity={0.7}
          >
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                reportType === "expense" ? "border-primary" : "border-text-gray"
              }`}
            >
              {reportType === "expense" && (
                <View className="w-3 h-3 rounded-full bg-primary" />
              )}
            </View>
            <Text className="text-text-dark text-base">Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity className="bg-primary rounded-full py-4 mb-8">
          <Text className="text-text-dark text-center font-semibold text-base">
            Search
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
