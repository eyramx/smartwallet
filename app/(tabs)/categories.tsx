import { BalanceCard } from "@/components/BalanceCard";
import { CategoryCard } from "@/components/CategoryCard";
import { useRouter } from "expo-router";
import {
    Bell,
    Bus,
    Coins,
    Gift,
    Key,
    Pill,
    Plus,
    ShoppingBag,
    Ticket,
    UtensilsCrossed,
} from "lucide-react-native";
import { useState } from "react";
import {
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CategoriesScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  return (
    <View className="flex-1 bg-secondary dark:bg-dark-bg">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary dark:bg-dark-primary pt-12 pb-4 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="w-10 h-10" />
          </TouchableOpacity>
          <Text className="text-text-dark dark:text-white text-xl font-bold">
            Categories
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/notifications")}
            className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
          >
            <Bell size={20} color="#1A3B34" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard
          totalBalance={7783.0}
          totalExpense={1187.4}
          expensePercentage={30}
          targetAmount={20000.0}
        />
      </View>

      {/* Categories Grid */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Row 1 */}
        <View className="flex-row justify-between">
          <CategoryCard
            icon={<UtensilsCrossed size={40} color="#ffffff" />}
            label="Food"
            onPress={() => router.push("/category/food")}
          />
          <CategoryCard
            icon={<Bus size={40} color="#ffffff" />}
            label="Transport"
            onPress={() => router.push("/category/transport")}
          />
          <CategoryCard
            icon={<Pill size={40} color="#ffffff" />}
            label="Medicine"
            onPress={() => router.push("/category/medicine")}
          />
        </View>

        {/* Row 2 */}
        <View className="flex-row justify-between">
          <CategoryCard
            icon={<ShoppingBag size={40} color="#ffffff" />}
            label="Groceries"
            onPress={() => router.push("/category/groceries")}
          />
          <CategoryCard
            icon={<Key size={40} color="#ffffff" />}
            label="Rent"
            onPress={() => router.push("/category/rent")}
          />
          <CategoryCard
            icon={<Gift size={40} color="#ffffff" />}
            label="Gifts"
            onPress={() => router.push("/category/gifts")}
          />
        </View>

        {/* Row 3 */}
        <View className="flex-row justify-between">
          <CategoryCard
            icon={<Coins size={40} color="#ffffff" />}
            label="Savings"
            onPress={() => router.push("/category/savings")}
          />
          <CategoryCard
            icon={<Ticket size={40} color="#ffffff" />}
            label="Entertainment"
            onPress={() => router.push("/category/entertainment")}
          />
          <CategoryCard
            icon={<Plus size={40} color="#ffffff" />}
            label="More"
            onPress={() => setShowModal(true)}
          />
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* New Category Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-8">
          <View className="bg-white dark:bg-dark-surface rounded-3xl p-8 w-full max-w-sm">
            <Text className="text-text-dark dark:text-dark-text text-xl font-bold text-center mb-6">
              New Category
            </Text>

            {/* Input Field */}
            <TextInput
              className="bg-secondary dark:bg-dark-bg rounded-2xl px-4 py-4 text-base text-text-dark dark:text-dark-text mb-6"
              placeholder="Write..."
              placeholderTextColor="#A8C5BC"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />

            {/* Save Button */}
            <TouchableOpacity
              className="bg-primary dark:bg-dark-primary rounded-full py-4 mb-3"
              onPress={() => {
                // TODO: Handle category creation
                setShowModal(false);
                setNewCategoryName("");
              }}
            >
              <Text className="text-white text-center font-semibold text-base">
                Save
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-secondary dark:bg-dark-bg rounded-full py-4"
              onPress={() => {
                setShowModal(false);
                setNewCategoryName("");
              }}
            >
              <Text className="text-text-dark dark:text-dark-text text-center font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
