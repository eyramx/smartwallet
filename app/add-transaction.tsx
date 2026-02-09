import { Button } from "@/components/Button";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Input } from "@/components/Input";
import { ADD_TRANSACTION, GET_CATEGORIES } from "@/lib/TransactionService";
import { useMutation, useQuery } from "@apollo/client";
import { useUserData } from "@nhost/react";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
}

interface GetCategoriesData {
  categories: Category[];
}

export default function AddTransactionScreen() {
  const router = useRouter();
  const user = useUserData();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categoryData, loading: loadingCategories } =
    useQuery<GetCategoriesData>(GET_CATEGORIES);
  const [addTransaction, { loading: submitting }] = useMutation(
    ADD_TRANSACTION,
    {
      refetchQueries: ["GetDashboardData"],
      onCompleted: () => {
        router.back();
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    },
  );

  const handleSubmit = () => {
    if (!amount || !description || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    addTransaction({
      variables: {
        amount: parseFloat(amount),
        description,
        date: new Date().toISOString(),
        category_id: selectedCategory,
        user_id: user.id,
      },
    });
  };

  const categories = categoryData?.categories || [];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-secondary"
    >
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-primary pt-12">
          <Text className="text-white text-xl font-bold">Add Transaction</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-8 h-8 items-center justify-center bg-white/20 rounded-full"
          >
            {/* @ts-ignore */}
            <X size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 pt-6">
          <Input
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <Input
            label="Description"
            placeholder="e.g. Lunch, Taxi, etc."
            value={description}
            onChangeText={setDescription}
          />

          <Text className="text-text-dark font-medium mb-2 mt-2">Category</Text>
          {loadingCategories ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-row flex-wrap gap-3 mb-6">
              {categories.map((cat: any) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`flex-row items-center px-4 py-2 rounded-full border ${
                    selectedCategory === cat.id
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <View className="mr-2">
                    <CategoryIcon
                      iconName={cat.icon}
                      size={16}
                      color={selectedCategory === cat.id ? "#fff" : cat.color}
                    />
                  </View>
                  <Text
                    className={
                      selectedCategory === cat.id
                        ? "text-white"
                        : "text-text-dark"
                    }
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Button
            title="Save Transaction"
            onPress={handleSubmit}
            loading={submitting}
            disabled={submitting}
            className="mt-4"
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
