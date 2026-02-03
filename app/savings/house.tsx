import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Calendar, Home } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HouseSavingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark">New House</Text>
        <TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Calendar size={20} color="#00D9A3" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Goal Card */}
      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <View className="bg-white rounded-3xl p-6 mb-6">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-sm text-text-gray mb-2">Goal</Text>
              <Text className="text-2xl font-bold text-text-dark">
                GH₵569,200
              </Text>
              <Text className="text-sm text-text-gray mt-2">Amount Saved</Text>
              <Text className="text-xl font-semibold text-primary">
                GH₵625.48
              </Text>
            </View>
            <View className="w-24 h-24 rounded-2xl bg-blue-400 items-center justify-center">
              <Home size={48} color="#ffffff" />
              <Text className="text-white text-xs mt-2">House</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mb-4">
            <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
              <View className="bg-primary h-full" style={{ width: "30%" }} />
            </View>
            <Text className="text-sm text-text-gray mt-2">
              ✓ 30% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>

        {/* April Deposits */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">April</Text>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                <Calendar size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-blue-400 items-center justify-center mr-3">
                  <Home size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    House Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    19:56 - April 5
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵477.77
              </Text>
            </View>
          </View>
        </View>

        {/* January Deposits */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">
              January
            </Text>
          </View>

          <View className="space-y-3">
            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-blue-400 items-center justify-center mr-3">
                  <Home size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    House Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    20:25 - January 16
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵102.67
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-blue-400 items-center justify-center mr-3">
                  <Home size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    House Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    15:56 - January 02
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵45.04
              </Text>
            </View>
          </View>
        </View>

        {/* Add Savings Button */}
        <View className="items-center py-8">
          <TouchableOpacity className="bg-primary rounded-full px-12 py-4">
            <Text className="text-white font-semibold text-base">
              Add Savings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
