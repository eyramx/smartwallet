import { ADD_BUDGET, DELETE_BUDGET, GET_BUDGETS } from "@/lib/BudgetService";
import { useMutation, useQuery } from "@apollo/client";
import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useMemo } from "react";

export interface Budget {
  id: string;
  category_id: string;
  category?: {
    name: string;
    icon: string;
    color: string;
  };
  amount: number;
  spent: number;
  period: "monthly" | "weekly";
  alertThreshold: number;
}

interface BudgetContextType {
  budgets: Budget[];
  loading: boolean;
  addBudget: (budget: Omit<Budget, "id" | "spent">) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  getBudgetByCategory: (categoryId: string) => Budget | undefined;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useUserData();

  const { data, loading, refetch } = useQuery(GET_BUDGETS, {
    variables: { user_id: user?.id },
    skip: !user,
  });

  const [addBudgetMutation] = useMutation(ADD_BUDGET, {
    onCompleted: () => refetch(),
  });

  const [deleteBudgetMutation] = useMutation(DELETE_BUDGET, {
    onCompleted: () => refetch(),
  });

  // Calculate "spent" for each budget
  const budgets = useMemo(() => {
    if (!data?.budgets) return [];
    return data.budgets.map(
      (b: {
        id: string;
        category_id: string;
        amount: string;
        period: string;
        alert_threshold: string;
        category: any;
      }) => ({
        ...b,
        amount: parseFloat(b.amount),
        alertThreshold: parseFloat(b.alert_threshold),
        spent: 0,
      }),
    );
  }, [data]);

  const addBudget = async (budget: Omit<Budget, "id" | "spent">) => {
    if (!user) return;
    await addBudgetMutation({
      variables: {
        category_id: budget.category_id,
        amount: budget.amount,
        period: budget.period,
        alert_threshold: budget.alertThreshold,
        user_id: user.id,
      },
    });
  };

  const deleteBudget = async (id: string) => {
    await deleteBudgetMutation({
      variables: { id },
    });
  };

  const getBudgetByCategory = (categoryId: string) => {
    return budgets.find((b) => b.category_id === categoryId);
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        addBudget,
        deleteBudget,
        getBudgetByCategory,
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
