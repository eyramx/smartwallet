import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Bell,
    ChevronDown,
    Package,
    ShoppingBag,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 10 }, (_, i) => (2020 + i).toString());

export default function CalendarScreen() {
  const router = useRouter();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear().toString(),
  );
  const [selectedDate, setSelectedDate] = useState<number | null>(
    today.getDate(),
  );
  const [selectedTab, setSelectedTab] = useState<"spends" | "categories">(
    "spends",
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Generate calendar days based on selected month and year
  const calendarData = useMemo(() => {
    const monthIndex = months.indexOf(selectedMonth);
    const year = parseInt(selectedYear);

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, monthIndex, 1).getDay();
    // Adjust to Monday as first day (0 = Monday, 6 = Sunday)
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

    // Get number of days in month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // Create array with empty slots for offset
    const days: (number | null)[] = Array(firstDayAdjusted).fill(null);

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [selectedMonth, selectedYear]);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Calendar</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-6">
        {/* Month and Year Selectors */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => setShowMonthPicker(true)}
            activeOpacity={0.7}
          >
            <Text className="text-primary text-lg font-semibold">
              {selectedMonth}
            </Text>
            <ChevronDown size={20} color="#00D9A3" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => setShowYearPicker(true)}
            activeOpacity={0.7}
          >
            <Text className="text-primary text-lg font-semibold">
              {selectedYear}
            </Text>
            <ChevronDown size={20} color="#00D9A3" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View className="bg-white/30 rounded-3xl p-4 mb-6">
          {/* Day Headers */}
          <View className="flex-row justify-between mb-4">
            {daysOfWeek.map((day) => (
              <View key={day} className="w-10 items-center">
                <Text className="text-primary text-xs font-semibold">
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar Days */}
          <View className="flex-row flex-wrap">
            {calendarData.map((day, index) => {
              const isToday =
                day === today.getDate() &&
                selectedMonth === months[today.getMonth()] &&
                selectedYear === today.getFullYear().toString();
              const isSelected = day === selectedDate;

              return (
                <TouchableOpacity
                  key={index}
                  className={`h-10 items-center justify-center mb-2 ${
                    isSelected ? "bg-primary rounded-full" : ""
                  }`}
                  style={{ width: `${100 / 7}%` }}
                  onPress={() => day && setSelectedDate(day)}
                  activeOpacity={day ? 0.7 : 1}
                  disabled={!day}
                >
                  {day && (
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected
                          ? "text-white"
                          : isToday
                            ? "text-primary"
                            : "text-text-dark"
                      }`}
                    >
                      {day}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tab Selector */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={() => setSelectedTab("spends")}
            className={`flex-1 py-3 rounded-full items-center ${
              selectedTab === "spends" ? "bg-primary" : "bg-white/30"
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`font-semibold text-base ${
                selectedTab === "spends" ? "text-text-dark" : "text-text-gray"
              }`}
            >
              Spends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab("categories")}
            className={`flex-1 py-3 rounded-full items-center ${
              selectedTab === "categories" ? "bg-primary" : "bg-white/30"
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`font-semibold text-base ${
                selectedTab === "categories"
                  ? "text-text-dark"
                  : "text-text-gray"
              }`}
            >
              Categories
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <View className="gap-4 mb-6">
          {/* Groceries */}
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 bg-blue-400 rounded-2xl items-center justify-center">
              <ShoppingBag size={28} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-text-dark text-base font-semibold mb-1">
                Groceries
              </Text>
              <Text className="text-primary text-sm">17:00 - April 24</Text>
            </View>
            <View className="items-end">
              <Text className="text-text-gray text-sm mb-1">Pantry</Text>
              <Text className="text-primary text-lg font-bold">-$100,00</Text>

              {/* Month Picker Modal */}
              <Modal
                visible={showMonthPicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowMonthPicker(false)}
              >
                <TouchableOpacity
                  className="flex-1 bg-black/50 items-center justify-center px-8"
                  activeOpacity={1}
                  onPress={() => setShowMonthPicker(false)}
                >
                  <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
                    <Text className="text-text-dark text-xl font-bold text-center mb-4">
                      Select Month
                    </Text>
                    <ScrollView className="max-h-80">
                      {months.map((month) => (
                        <TouchableOpacity
                          key={month}
                          className={`py-4 px-6 rounded-2xl mb-2 ${
                            month === selectedMonth
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                          onPress={() => {
                            setSelectedMonth(month);
                            setShowMonthPicker(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text
                            className={`text-center font-semibold ${
                              month === selectedMonth
                                ? "text-white"
                                : "text-text-dark"
                            }`}
                          >
                            {month}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Year Picker Modal */}
              <Modal
                visible={showYearPicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowYearPicker(false)}
              >
                <TouchableOpacity
                  className="flex-1 bg-black/50 items-center justify-center px-8"
                  activeOpacity={1}
                  onPress={() => setShowYearPicker(false)}
                >
                  <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
                    <Text className="text-text-dark text-xl font-bold text-center mb-4">
                      Select Year
                    </Text>
                    <ScrollView className="max-h-80">
                      {years.map((year) => (
                        <TouchableOpacity
                          key={year}
                          className={`py-4 px-6 rounded-2xl mb-2 ${
                            year === selectedYear
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                          onPress={() => {
                            setSelectedYear(year);
                            setShowYearPicker(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text
                            className={`text-center font-semibold ${
                              year === selectedYear
                                ? "text-white"
                                : "text-text-dark"
                            }`}
                          >
                            {year}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          {/* Others */}
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 bg-blue-300 rounded-2xl items-center justify-center">
              <Package size={28} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-text-dark text-base font-semibold mb-1">
                Others
              </Text>
              <Text className="text-primary text-sm">17:00 - April 24</Text>
            </View>
            <View className="items-end">
              <Text className="text-text-gray text-sm mb-1">Payments</Text>
              <Text className="text-text-dark text-lg font-bold">$120,00</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
