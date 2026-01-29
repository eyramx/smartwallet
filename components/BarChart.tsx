import { useRouter } from "expo-router";
import { Calendar, Search } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface BarChartProps {
  data: { day: string; value: number }[];
  maxValue?: number;
}

export function BarChart({ data, maxValue = 15000 }: BarChartProps) {
  const router = useRouter();

  return (
    <View className="bg-secondary/50 rounded-3xl p-6 mb-6">
      {/* Chart Title & Icons */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-text-dark font-bold text-lg">
          Income & Expenses
        </Text>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Search size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/calendar")}
            className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Calendar size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Y-axis labels */}
      <View className="flex-row mb-2">
        <View className="w-8 mr-2">
          <Text className="text-primary text-xs mb-8">15k</Text>
          <Text className="text-primary text-xs mb-8">10k</Text>
          <Text className="text-primary text-xs mb-8">5k</Text>
          <Text className="text-primary text-xs">1k</Text>
        </View>

        {/* Bars */}
        <View className="flex-1 flex-row items-end justify-between pb-2">
          {data.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 100;
            return (
              <View key={index} className="items-center flex-1">
                <View
                  className="w-8 bg-primary rounded-t-lg"
                  style={{ height: Math.max(heightPercentage * 0.8, 10) }}
                />
              </View>
            );
          })}
        </View>
      </View>

      {/* X-axis labels */}
      <View className="flex-row pl-10">
        {data.map((item, index) => (
          <View key={index} className="flex-1 items-center">
            <Text className="text-text-gray text-xs">{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
