import { useMutation, useQuery } from "@apollo/client";
import { useUserId } from "@nhost/react";
import React, { createContext, useContext, useMemo } from "react";
import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  GET_ALL_TRANSACTIONS,
  Transaction,
} from "../lib/TransactionService";

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  addTransaction: (transaction: {
    amount: number;
    description: string;
    date: Date;
    category_id: string;
  }) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
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

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = useUserId();
  const { data, loading, refetch } = useQuery<{ transactions: Transaction[] }>(
    GET_ALL_TRANSACTIONS,
  );
  const [insertTransaction] = useMutation(ADD_TRANSACTION);
  const [removeTransaction] = useMutation(DELETE_TRANSACTION);

  const transactions = useMemo(() => data?.transactions || [], [data]);

  const addTransaction = async (transaction: {
    amount: number;
    description: string;
    date: Date;
    category_id: string;
  }) => {
    try {
      await insertTransaction({
        variables: {
          ...transaction,
          date: transaction.date.toISOString(),
          user_id: userId,
        },
      });
      await refetch();
    } catch (error) {
      console.error("Failed to add transaction:", error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await removeTransaction({
        variables: { id },
      });
      await refetch();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      throw error;
    }
  };

  const filterTransactions = (filters: TransactionFilters): Transaction[] => {
    let filtered = [...transactions];

    if (filters.category) {
      filtered = filtered.filter((t) => t.category.name === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter((t) => t.category.type === filters.type);
    }

    if (filters.startDate) {
      filtered = filtered.filter((t) => new Date(t.date) >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter((t) => new Date(t.date) <= filters.endDate!);
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue =
          filters.sortBy === "date" ? new Date(a.date).getTime() : a.amount;
        const bValue =
          filters.sortBy === "date" ? new Date(b.date).getTime() : b.amount;

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
        t.category.name.toLowerCase().includes(lowerQuery),
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
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
