import React from "react";
import { Text, View } from "react-native";

import { cn } from "@/lib/utils";

interface LineChartProps {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  color?: string;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 200,
  color = "#02C38E",
  className,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((item.value - minValue) / range) * 100;
    return { x, y: 100 - y };
  });

  return (
    <View className={cn("w-full", className)}>
      {/* Chart Area */}
      <View
        style={{ height }}
        className="relative w-full rounded-xl bg-secondary p-4"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <View
            key={percent}
            className="absolute w-full border-t border-gray-300"
            style={{ top: `${percent}%` }}
          />
        ))}

        {/* Line */}
        <View className="absolute h-full w-full">
          {points.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = points[index - 1];
            return (
              <View
                key={index}
                className="absolute h-0.5"
                style={{
                  backgroundColor: color,
                  left: `${prevPoint.x}%`,
                  top: `${prevPoint.y}%`,
                  width: `${point.x - prevPoint.x}%`,
                  transform: [
                    {
                      rotate: `${Math.atan2(
                        point.y - prevPoint.y,
                        point.x - prevPoint.x,
                      )}rad`,
                    },
                  ],
                }}
              />
            );
          })}
        </View>

        {/* Data points */}
        {points.map((point, index) => (
          <View
            key={index}
            className="absolute h-3 w-3 rounded-full border-2 border-white"
            style={{
              backgroundColor: color,
              left: `${point.x}%`,
              top: `${point.y}%`,
              marginLeft: -6,
              marginTop: -6,
            }}
          />
        ))}
      </View>

      {/* Labels */}
      <View className="mt-2 flex-row justify-between">
        {data.map((item, index) => (
          <Text key={index} className="text-xs text-text-gray">
            {item.label}
          </Text>
        ))}
      </View>

      {/* Value indicators */}
      <View className="mt-4 flex-row justify-between">
        <View>
          <Text className="text-xs text-text-gray">Min</Text>
          <Text className="text-sm font-semibold text-text-dark">
            ${minValue.toFixed(0)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-text-gray">Max</Text>
          <Text className="text-sm font-semibold text-text-dark">
            ${maxValue.toFixed(0)}
          </Text>
        </View>
      </View>
    </View>
  );
};
