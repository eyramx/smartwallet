import { Car, Package, UtensilsCrossed } from "lucide-react-native";
import { Text, View } from "react-native";

interface GoalsCardProps {
  revenueLastWeek: string;
  foodLastWeek: string;
}

export function GoalsCard({ revenueLastWeek, foodLastWeek }: GoalsCardProps) {
  return (
    <View className="bg-primary-dark rounded-3xl p-6 flex-row items-center justify-between mb-6">
      {/* Savings Icon & Label */}
      <View className="items-center">
        <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-2">
          <Car size={32} color="#ffffff" />
        </View>
        <Text className="text-white font-semibold text-sm">Savings</Text>
        <Text className="text-white/80 text-xs">On Goals</Text>
      </View>

      {/* Divider */}
      <View className="w-px h-16 bg-white/20 mx-4" />

      {/* Stats */}
      <View className="flex-1">
        {/* Revenue */}
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 bg-white/20 rounded-lg items-center justify-center mr-3">
            <Package size={20} color="#ffffff" />
          </View>
          <View>
            <Text className="text-white/80 text-xs mb-1">
              Revenue Last Week
            </Text>
            <Text className="text-white font-bold text-lg">
              {revenueLastWeek}
            </Text>
          </View>
        </View>

        {/* Divider Line */}
        <View className="h-px bg-white/20 mb-3" />

        {/* Food */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-white/20 rounded-lg items-center justify-center mr-3">
            <UtensilsCrossed size={20} color="#ffffff" />
          </View>
          <View>
            <Text className="text-white/80 text-xs mb-1">Food Last Week</Text>
            <Text className="text-white font-bold text-lg">{foodLastWeek}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
