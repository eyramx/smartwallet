import React from "react";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  className,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  return (
    <View className={cn("items-center", className)}>
      <View style={{ width: size, height: size, position: "relative" }}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (item.value / total) * 360;
          const endAngle = currentAngle + angle;

          // Create arc using View (simplified representation)
          const segment = (
            <View
              key={index}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: item.color,
                opacity: 0.8,
                transform: [{ rotateZ: `${currentAngle}deg` }],
              }}
            />
          );

          currentAngle = endAngle;
          return segment;
        })}

        {/* Center white circle for donut effect */}
        <View
          style={{
            position: "absolute",
            width: size * 0.6,
            height: size * 0.6,
            borderRadius: (size * 0.6) / 2,
            backgroundColor: "white",
            top: size * 0.2,
            left: size * 0.2,
          }}
        />
      </View>

      {/* Legend */}
      <View className="mt-4 w-full">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <View
              key={index}
              className="mb-2 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View
                  className="mr-2 h-4 w-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-sm text-text-dark">{item.label}</Text>
              </View>
              <Text className="text-sm font-semibold text-text-dark">
                {percentage}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
