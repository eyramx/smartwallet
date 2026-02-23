import { Button } from "@/components/Button";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Input } from "@/components/Input";
import { useTransaction } from "@/contexts/TransactionContext";
import { predictCategory } from "@/lib/categorization";
import { GET_CATEGORIES } from "@/lib/TransactionService";
import { useQuery } from "@apollo/client";
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
  const { addTransaction: saveTransaction } = useTransaction();
  const [submitting, setSubmitting] = useState(false);

  const { data: categoryData, loading: loadingCategories } =
    useQuery<GetCategoriesData>(GET_CATEGORIES);

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    if (!selectedCategory && text.length > 2) {
      const predicted = predictCategory(text);
      if (predicted && categoryData?.categories) {
        const matchingCat = categoryData.categories.find(
          (c: Category) => c.name.toLowerCase() === predicted.toLowerCase(),
        );
        if (matchingCat) {
          setSelectedCategory(matchingCat.id);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!amount || !description || !selectedCategory) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    setSubmitting(true);
    try {
      await saveTransaction({
        amount: parseFloat(amount),
        description,
        date: new Date(),
        category_id: selectedCategory,
      });
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            onChangeText={handleDescriptionChange}
          />

          <Text className="text-text-dark font-medium mb-2 mt-2">Category</Text>
          {loadingCategories ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-row flex-wrap gap-3 mb-6">
              {categories.map((cat: Category) => (
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
