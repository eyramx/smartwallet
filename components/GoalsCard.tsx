import { Target, Utensils } from "lucide-react-native";
import { Text, View } from "react-native";

interface GoalsCardProps {
  revenueLastWeek: string;
  foodLastWeek: string;
}

export function GoalsCard({ revenueLastWeek, foodLastWeek }: GoalsCardProps) {
  return (
    <View className="flex-row gap-4 mb-8">
      <View className="flex-1 bg-primary p-4 rounded-3xl">
        <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4">
          <Target size={20} color="#1A3B34" />
        </View>
        <Text className="text-text-dark/70 text-xs mb-1">
          Revenue Last Week
        </Text>
        <Text className="text-text-dark font-bold text-lg">
          {revenueLastWeek}
        </Text>
      </View>

      <View className="flex-1 bg-white p-4 rounded-3xl">
        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Utensils size={20} color="#3B82F6" />
        </View>
        <Text className="text-text-gray text-xs mb-1">Food Last Week</Text>
        <Text className="text-text-dark font-bold text-lg">{foodLastWeek}</Text>
      </View>
    </View>
  );
}
