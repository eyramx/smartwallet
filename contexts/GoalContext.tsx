import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  color: string;
  icon: string;
}

interface GoalContextType {
  goals: FinancialGoal[];
  addGoal: (goal: Omit<FinancialGoal, "id" | "currentAmount">) => void;
  updateGoal: (id: string, updates: Partial<FinancialGoal>) => void;
  deleteGoal: (id: string) => void;
  contributeToGoal: (id: string, amount: number) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

const MOCK_GOALS: FinancialGoal[] = [
  {
    id: "1",
    name: "Vacation to Paris",
    targetAmount: 5000,
    currentAmount: 1500,
    deadline: new Date("2026-12-31"),
    category: "Travel",
    color: "#FF6B6B",
    icon: "plane",
  },
  {
    id: "2",
    name: "New Car",
    targetAmount: 25000,
    currentAmount: 8500,
    deadline: new Date("2027-06-30"),
    category: "Vehicle",
    color: "#4ECDC4",
    icon: "car",
  },
  {
    id: "3",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 6200,
    deadline: new Date("2026-08-31"),
    category: "Savings",
    color: "#A8E6CF",
    icon: "shield",
  },
];

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<FinancialGoal[]>(MOCK_GOALS);

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    saveGoals();
  }, [goals]);

  const loadGoals = async () => {
    try {
      const stored = await AsyncStorage.getItem("financialGoals");
      if (stored) {
        const parsed = JSON.parse(stored);
        const withDates = parsed.map((g: any) => ({
          ...g,
          deadline: new Date(g.deadline),
        }));
        setGoals(withDates);
      }
    } catch (error) {
      console.error("Failed to load goals:", error);
    }
  };

  const saveGoals = async () => {
    try {
      await AsyncStorage.setItem("financialGoals", JSON.stringify(goals));
    } catch (error) {
      console.error("Failed to save goals:", error);
    }
  };

  const addGoal = (goal: Omit<FinancialGoal, "id" | "currentAmount">) => {
    const newGoal: FinancialGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<FinancialGoal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const contributeToGoal = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              currentAmount: Math.min(g.currentAmount + amount, g.targetAmount),
            }
          : g,
      ),
    );
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        contributeToGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoal must be used within GoalProvider");
  }
  return context;
};
