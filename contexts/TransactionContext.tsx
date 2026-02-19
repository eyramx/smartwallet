import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  type: "income" | "expense";
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  filterTransactions: (filters: TransactionFilters) => Transaction[];
  searchTransactions: (query: string) => Transaction[];
}

export interface TransactionFilters {
  category?: string;
  type?: "income" | "expense";
  startDate?: Date;
  endDate?: Date;
  sortBy?: "date" | "amount";
  sortOrder?: "asc" | "desc";
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

// Mock data for development
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 125.5,
    category: "Groceries",
    date: new Date("2026-02-10"),
    type: "expense",
  },
  {
    id: "2",
    description: "Salary",
    amount: 3500,
    category: "Income",
    date: new Date("2026-02-01"),
    type: "income",
  },
  {
    id: "3",
    description: "Uber Ride",
    amount: 25.3,
    category: "Transport",
    date: new Date("2026-02-09"),
    type: "expense",
  },
  {
    id: "4",
    description: "Restaurant Dinner",
    amount: 85.0,
    category: "Food",
    date: new Date("2026-02-08"),
    type: "expense",
  },
  {
    id: "5",
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date("2026-02-05"),
    type: "expense",
  },
];

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    saveTransactions();
  }, [transactions]);

  const loadTransactions = async () => {
    try {
      const stored = await AsyncStorage.getItem("transactions");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const withDates = parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
        setTransactions(withDates);
      }
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  };

  const saveTransactions = async () => {
    try {
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions:", error);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filterTransactions = (filters: TransactionFilters): Transaction[] => {
    let filtered = [...transactions];

    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.startDate) {
      filtered = filtered.filter((t) => t.date >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter((t) => t.date <= filters.endDate!);
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = filters.sortBy === "date" ? a.date.getTime() : a.amount;
        const bValue = filters.sortBy === "date" ? b.date.getTime() : b.amount;

        return filters.sortOrder === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
            ? 1
            : -1;
      });
    }

    return filtered;
  };

  const searchTransactions = (query: string): Transaction[] => {
    const lowerQuery = query.toLowerCase();
    return transactions.filter(
      (t) =>
        t.description.toLowerCase().includes(lowerQuery) ||
        t.category.toLowerCase().includes(lowerQuery),
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        filterTransactions,
        searchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within TransactionProvider");
  }
  return context;
};
