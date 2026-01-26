import { Text, View } from "react-native";

export function Logo({
  size = 80,
  showText = true,
}: {
  size?: number;
  showText?: boolean;
}) {
  return (
    <View className="items-center">
      {/* Chart Icon using emoji */}
      <View
        style={{ width: size, height: size }}
        className="items-center justify-center"
      >
        <Text style={{ fontSize: size * 0.8 }}>📊</Text>
      </View>

      {showText && (
        <Text className="text-4xl font-bold text-white mt-4">FINHQ</Text>
      )}
    </View>
  );
}
