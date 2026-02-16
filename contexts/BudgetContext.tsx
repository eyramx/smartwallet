import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "monthly" | "weekly";
  alertThreshold: number; // percentage (e.g., 80 for 80%)
}

interface BudgetContextType {
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getBudgetByCategory: (category: string) => Budget | undefined;
  updateSpent: (category: string, amount: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Load budgets from storage on mount
  useEffect(() => {
    loadBudgets();
  }, []);

  // Save budgets to storage whenever they change
  useEffect(() => {
    saveBudgets();
  }, [budgets]);

  const loadBudgets = async () => {
    try {
      const stored = await AsyncStorage.getItem("budgets");
      if (stored) {
        setBudgets(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load budgets:", error);
    }
  };

  const saveBudgets = async () => {
    try {
      await AsyncStorage.setItem("budgets", JSON.stringify(budgets));
    } catch (error) {
      console.error("Failed to save budgets:", error);
    }
  };

  const addBudget = (budget: Omit<Budget, "id" | "spent">) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets((prev) => [...prev, newBudget]);
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  const getBudgetByCategory = (category: string) => {
    return budgets.find((b) => b.category === category);
  };

  const updateSpent = (category: string, amount: number) => {
    setBudgets((prev) =>
      prev.map((b) =>
        b.category === category ? { ...b, spent: b.spent + amount } : b,
      ),
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        getBudgetByCategory,
        updateSpent,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within BudgetProvider");
  }
  return context;
};
