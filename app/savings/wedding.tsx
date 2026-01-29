import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Calendar, Heart } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function WeddingSavingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-dark">Wedding</Text>
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
                GH₵34,700
              </Text>
              <Text className="text-sm text-text-gray mt-2">Amount Saved</Text>
              <Text className="text-xl font-semibold text-primary">
                GH₵296.25
              </Text>
            </View>
            <View className="w-24 h-24 rounded-2xl bg-blue-400 items-center justify-center">
              <Heart size={48} color="#ffffff" />
              <Text className="text-white text-xs mt-2">Wedding</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mb-4">
            <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
              <View className="bg-text-dark h-full" style={{ width: "10%" }} />
            </View>
            <Text className="text-sm text-text-gray mt-2">
              ✓ 30% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>

        {/* November Deposits */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">
              November
            </Text>
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
                  <Heart size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    Wedding Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    18:46 - November 15
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵87.32
              </Text>
            </View>
          </View>
        </View>

        {/* September Deposits */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-dark">
              September
            </Text>
          </View>

          <View className="space-y-3">
            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-blue-400 items-center justify-center mr-3">
                  <Heart size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    Wedding Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    21:45 - September 30
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵22.99
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-blue-400 items-center justify-center mr-3">
                  <Heart size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-text-dark">
                    Wedding Deposit
                  </Text>
                  <Text className="text-sm text-text-gray">
                    12:25 - September 15
                  </Text>
                </View>
              </View>
              <Text className="text-base font-semibold text-text-dark">
                GH₵185.94
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
