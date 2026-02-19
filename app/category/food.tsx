import { BalanceCard } from "@/components/BalanceCard";
import { TransactionCard } from "@/components/TransactionCard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Calendar, UtensilsCrossed } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FoodScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark">Food</Text>
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
        {/* April */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">April</Text>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                <Calendar size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            <TransactionCard
              icon={<UtensilsCrossed size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Dinner"
              time="18:27"
              date="April 30"
              category="Food"
              amount={26.0}
              isExpense
            />
            <TransactionCard
              icon={<UtensilsCrossed size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Delivery Pizza"
              time="15:00"
              date="April 24"
              category="Food"
              amount={18.35}
              isExpense
            />
            <TransactionCard
              icon={<UtensilsCrossed size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Lunch"
              time="12:30"
              date="April 15"
              category="Food"
              amount={15.4}
              isExpense
            />
            <TransactionCard
              icon={<UtensilsCrossed size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Brunch"
              time="9:30"
              date="April 08"
              category="Food"
              amount={12.13}
              isExpense
            />
          </View>
        </View>

        {/* March */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">March</Text>
          </View>

          <View className="space-y-3">
            <TransactionCard
              icon={<UtensilsCrossed size={24} color="#ffffff" />}
              iconBg="#60A5FA"
              title="Dinner"
              time="20:50"
              date="March 31"
              category="Food"
              amount={27.2}
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
