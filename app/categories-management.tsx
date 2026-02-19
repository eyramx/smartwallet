import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Category, useCategory } from "@/contexts/CategoryContext";
import { useRouter } from "expo-router";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ICON_OPTIONS = [
  "utensils",
  "car",
  "shopping-cart",
  "home",
  "gift",
  "pill",
  "film",
  "piggy-bank",
  "briefcase",
  "coffee",
  "book",
  "heart",
];

const COLOR_OPTIONS = [
  "#FF6B6B",
  "#4ECDC4",
  "#95E1D3",
  "#F38181",
  "#AA96DA",
  "#FCBAD3",
  "#FFE66D",
  "#A8E6CF",
  "#FF8B94",
  "#C7CEEA",
  "#FFDAC1",
  "#B5EAD7",
];

export default function CategoriesManagementScreen() {
  const router = useRouter();
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategory();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: ICON_OPTIONS[0],
    color: COLOR_OPTIONS[0],
    budget: "",
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        icon: category.icon,
        color: category.color,
        budget: category.budget?.toString() || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        icon: ICON_OPTIONS[0],
        color: COLOR_OPTIONS[0],
        budget: "",
      });
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Category name is required");
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      icon: formData.icon,
      color: formData.color,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      isCustom: editingCategory?.isCustom ?? true,
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }

    setModalVisible(false);
  };

  const handleDelete = (category: Category) => {
    if (!category.isCustom) {
      Alert.alert(
        "Cannot Delete",
        "Default categories cannot be deleted. You can edit them instead.",
      );
      return;
    }

    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${category.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteCategory(category.id),
        },
      ],
    );
  };

  return (
    <View className="flex-1 bg-secondary dark:bg-dark-bg">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white dark:bg-dark-surface px-6 pb-4 pt-14">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 rounded-full bg-secondary dark:bg-dark-bg p-2"
          >
            <ArrowLeft size={24} color="#1A3B34" />
          </TouchableOpacity>
          <Text className="flex-1 text-2xl font-bold text-text-dark dark:text-dark-text">
            Manage Categories
          </Text>
          <TouchableOpacity
            onPress={() => handleOpenModal()}
            className="rounded-full bg-primary p-2"
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        <View className="gap-3">
          {categories.map((category) => (
            <View
              key={category.id}
              className="flex-row items-center justify-between rounded-2xl bg-white dark:bg-dark-surface p-4"
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: category.color + "30" }}
                >
                  <Text style={{ color: category.color }}>●</Text>
                </View>
                <View>
                  <Text className="font-semibold text-text-dark dark:text-dark-text">
                    {category.name}
                  </Text>
                  {category.budget && (
                    <Text className="text-xs text-text-gray dark:text-dark-text-secondary">
                      Budget: ${category.budget}
                    </Text>
                  )}
                  {category.isCustom && (
                    <Text className="text-xs text-primary dark:text-dark-primary">
                      Custom
                    </Text>
                  )}
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleOpenModal(category)}
                  className="rounded-full bg-blue-100 p-2"
                >
                  <Edit size={16} color="#3B82F6" />
                </TouchableOpacity>
                {category.isCustom && (
                  <TouchableOpacity
                    onPress={() => handleDelete(category)}
                    className="rounded-full bg-red-100 p-2"
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="max-h-[80%] rounded-t-3xl bg-white px-6 pb-8 pt-6">
            <Text className="mb-6 text-xl font-bold text-text-dark">
              {editingCategory ? "Edit Category" : "New Category"}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Input
                label="Category Name"
                placeholder="e.g., Subscriptions"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
              />

              <Input
                label="Budget (Optional)"
                placeholder="500.00"
                value={formData.budget}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, budget: text }))
                }
                keyboardType="decimal-pad"
              />

              <Text className="mb-2 text-sm font-medium text-text-dark">
                Color
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setFormData((prev) => ({ ...prev, color }))}
                    className="mr-3"
                  >
                    <View
                      className="h-12 w-12 rounded-full border-2"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          formData.color === color ? "#1A3B34" : "transparent",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View className="mt-4 flex-row gap-2">
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  variant="secondary"
                  className="flex-1"
                />
                <Button
                  title={editingCategory ? "Update" : "Create"}
                  onPress={handleSave}
                  className="flex-1"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
