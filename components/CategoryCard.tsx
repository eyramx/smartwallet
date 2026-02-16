import { Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export function CategoryCard({ icon, label, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity onPress={onPress} className="items-center flex-1 mb-6">
      <View className="w-24 h-24 bg-blue-400 dark:bg-dark-primary rounded-3xl items-center justify-center mb-2">
        {icon}
      </View>
      <Text className="text-text-dark dark:text-dark-text font-semibold text-sm">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
