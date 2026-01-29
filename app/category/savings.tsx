import { BalanceCard } from "@/components/BalanceCard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Calendar,
    Car,
    Heart,
    Home,
    Plane,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SavingsGoalCardProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

function SavingsGoalCard({ icon, title, onPress }: SavingsGoalCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-3xl p-6 mb-4 flex-row items-center justify-between"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-20 h-20 rounded-2xl bg-blue-400 items-center justify-center mr-4">
          {icon}
        </View>
        <Text className="text-lg font-semibold text-text-dark">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SavingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark">Savings</Text>
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

      {/* Savings Goals */}
      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <SavingsGoalCard
          icon={<Plane size={40} color="#ffffff" />}
          title="Travel"
          onPress={() => router.push("/savings/travel")}
        />
        <SavingsGoalCard
          icon={<Home size={40} color="#ffffff" />}
          title="New House"
          onPress={() => router.push("/savings/house")}
        />
        <SavingsGoalCard
          icon={<Car size={40} color="#ffffff" />}
          title="Car"
          onPress={() => router.push("/savings/car")}
        />
        <SavingsGoalCard
          icon={<Heart size={40} color="#ffffff" />}
          title="Wedding"
          onPress={() => router.push("/savings/wedding")}
        />

        {/* Add More Button */}
        <View className="items-center py-8">
          <TouchableOpacity className="bg-primary rounded-full px-12 py-4">
            <Text className="text-white font-semibold text-base">Add More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
