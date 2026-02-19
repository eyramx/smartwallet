import { BalanceCard } from "@/components/BalanceCard";
import { TransactionCard } from "@/components/TransactionCard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bus, Calendar } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TransportScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark">Transport</Text>
        <TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Calendar size={20} color="#00D9A3" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View className="px-6 mb-4">
        <BalanceCard
          totalBalance={7783.0}
          totalExpense={1187.4}
          expensePercentage={30}
          targetAmount={20000}
        />
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-6">
        {/* March */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">March</Text>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                <Calendar size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            <TransactionCard
              icon={<Bus size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Fuel"
              time="18:27"
              date="March 30"
              category="Transport"
              amount={3.53}
              isExpense
            />
            <TransactionCard
              icon={<Bus size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Car Parts"
              time="15:00"
              date="March 30"
              category="Transport"
              amount={26.75}
              isExpense
            />
          </View>
        </View>

        {/* February */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">
              February
            </Text>
          </View>

          <View className="space-y-3">
            <TransactionCard
              icon={<Bus size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="New Tires"
              time="12:47"
              date="February 10"
              category="Transport"
              amount={373.99}
              isExpense
            />
            <TransactionCard
              icon={<Bus size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Car Wash"
              time="9:30"
              date="February 09"
              category="Transport"
              amount={9.74}
              isExpense
            />
            <TransactionCard
              icon={<Bus size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Public Transport"
              time="7:50"
              date="February 01"
              category="Transport"
              amount={1.24}
              isExpense
            />
          </View>
        </View>

        {/* Add Expenses Button */}
        <View className="items-center py-8">
          <TouchableOpacity className="bg-primary rounded-full px-12 py-4">
            <Text className="text-white font-semibold text-base">
              Add Expenses
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
