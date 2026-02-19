import { Text, View } from "react-native";

interface ProgressCircleProps {
  percentage: number;
  label: string;
}

export function ProgressCircle({ percentage, label }: ProgressCircleProps) {
  return (
    <View className="items-center bg-blue-400 rounded-3xl p-6 flex-1">
      {/* Circle Progress */}
      <View className="w-24 h-24 items-center justify-center mb-3">
        <View className="absolute w-24 h-24 rounded-full border-8 border-white/30" />
        <View
          className="absolute w-24 h-24 rounded-full border-8 border-white"
          style={{
            borderRightColor: "transparent",
            borderBottomColor: percentage > 50 ? "white" : "transparent",
            transform: [{ rotate: `${(percentage / 100) * 360}deg` }],
          }}
        />
        <Text className="text-white text-2xl font-bold">{percentage}%</Text>
      </View>
      <Text className="text-white font-semibold text-base">{label}</Text>
    </View>
  );
}
