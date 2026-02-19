import { Text, View } from "react-native";

interface NotificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  transactionDetails?: string;
}

export function NotificationCard({
  icon,
  title,
  description,
  time,
  transactionDetails,
}: NotificationCardProps) {
  return (
    <View className="mb-6">
      <View className="flex-row">
        {/* Icon */}
        <View className="mr-4">{icon}</View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text className="text-text-dark font-bold text-base flex-1">
              {title}
            </Text>
          </View>
          <Text className="text-text-gray text-sm mb-2">{description}</Text>
          {transactionDetails && (
            <Text className="text-blue-500 font-semibold text-sm mb-2">
              {transactionDetails}
            </Text>
          )}
          <Text className="text-blue-500 text-xs">{time}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-primary/20 mt-4" />
    </View>
  );
}
