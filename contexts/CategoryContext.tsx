import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
  isCustom: boolean;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Food",
    icon: "utensils",
    color: "#FF6B6B",
    isCustom: false,
  },
  {
    id: "2",
    name: "Transport",
    icon: "car",
    color: "#4ECDC4",
    isCustom: false,
  },
  {
    id: "3",
    name: "Groceries",
    icon: "shopping-cart",
    color: "#95E1D3",
    isCustom: false,
  },
  { id: "4", name: "Rent", icon: "home", color: "#F38181", isCustom: false },
  { id: "5", name: "Gifts", icon: "gift", color: "#AA96DA", isCustom: false },
  {
    id: "6",
    name: "Medicine",
    icon: "pill",
    color: "#FCBAD3",
    isCustom: false,
  },
  {
    id: "7",
    name: "Entertainment",
    icon: "film",
    color: "#FFE66D",
    isCustom: false,
  },
  {
    id: "8",
    name: "Savings",
    icon: "piggy-bank",
    color: "#A8E6CF",
    isCustom: false,
  },
];

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    saveCategories();
  }, [categories]);

  const loadCategories = async () => {
    try {
      const stored = await AsyncStorage.getItem("categories");
      if (stored) {
        setCategories(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const saveCategories = async () => {
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories:", error);
    }
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getCategoryById = (id: string) => {
    return categories.find((c) => c.id === id);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within CategoryProvider");
  }
  return context;
};
