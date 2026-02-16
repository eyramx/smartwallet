import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  lastProcessed?: Date;
}

interface RecurringTransactionContextType {
  recurringTransactions: RecurringTransaction[];
  addRecurringTransaction: (
    transaction: Omit<RecurringTransaction, "id" | "lastProcessed">,
  ) => void;
  updateRecurringTransaction: (
    id: string,
    updates: Partial<RecurringTransaction>,
  ) => void;
  deleteRecurringTransaction: (id: string) => void;
  toggleRecurringTransaction: (id: string) => void;
}

const RecurringTransactionContext = createContext<
  RecurringTransactionContextType | undefined
>(undefined);

const MOCK_RECURRING: RecurringTransaction[] = [
  {
    id: "1",
    description: "Monthly Salary",
    amount: 3500,
    category: "Income",
    type: "income",
    frequency: "monthly",
    startDate: new Date("2026-01-01"),
    isActive: true,
  },
  {
    id: "2",
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    type: "expense",
    frequency: "monthly",
    startDate: new Date("2026-01-05"),
    isActive: true,
  },
  {
    id: "3",
    description: "Rent Payment",
    amount: 1200,
    category: "Rent",
    type: "expense",
    frequency: "monthly",
    startDate: new Date("2026-01-01"),
    isActive: true,
  },
];

export const RecurringTransactionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [recurringTransactions, setRecurringTransactions] =
    useState<RecurringTransaction[]>(MOCK_RECURRING);

  useEffect(() => {
    loadRecurringTransactions();
  }, []);

  useEffect(() => {
    saveRecurringTransactions();
  }, [recurringTransactions]);

  const loadRecurringTransactions = async () => {
    try {
      const stored = await AsyncStorage.getItem("recurringTransactions");
      if (stored) {
        const parsed = JSON.parse(stored);
        const withDates = parsed.map((t: any) => ({
          ...t,
          startDate: new Date(t.startDate),
          endDate: t.endDate ? new Date(t.endDate) : undefined,
          lastProcessed: t.lastProcessed
            ? new Date(t.lastProcessed)
            : undefined,
        }));
        setRecurringTransactions(withDates);
      }
    } catch (error) {
      console.error("Failed to load recurring transactions:", error);
    }
  };

  const saveRecurringTransactions = async () => {
    try {
      await AsyncStorage.setItem(
        "recurringTransactions",
        JSON.stringify(recurringTransactions),
      );
    } catch (error) {
      console.error("Failed to save recurring transactions:", error);
    }
  };

  const addRecurringTransaction = (
    transaction: Omit<RecurringTransaction, "id" | "lastProcessed">,
  ) => {
    const newTransaction: RecurringTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setRecurringTransactions((prev) => [...prev, newTransaction]);
  };

  const updateRecurringTransaction = (
    id: string,
    updates: Partial<RecurringTransaction>,
  ) => {
    setRecurringTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  const deleteRecurringTransaction = (id: string) => {
    setRecurringTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleRecurringTransaction = (id: string) => {
    setRecurringTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)),
    );
  };

  return (
    <RecurringTransactionContext.Provider
      value={{
        recurringTransactions,
        addRecurringTransaction,
        updateRecurringTransaction,
        deleteRecurringTransaction,
        toggleRecurringTransaction,
      }}
    >
      {children}
    </RecurringTransactionContext.Provider>
  );
};

export const useRecurringTransaction = () => {
  const context = useContext(RecurringTransactionContext);
  if (!context) {
    throw new Error(
      "useRecurringTransaction must be used within RecurringTransactionProvider",
    );
  }
  return context;
};
