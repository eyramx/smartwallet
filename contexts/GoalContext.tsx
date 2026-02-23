import {
    ADD_GOAL,
    DELETE_GOAL,
    GET_GOALS,
    UPDATE_GOAL_CONTRIBUTION,
} from "@/lib/GoalService";
import { useMutation, useQuery } from "@apollo/client";
import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useMemo } from "react";

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
  loading: boolean;
  addGoal: (goal: Omit<FinancialGoal, "id" | "currentAmount">) => Promise<void>;
  contributeToGoal: (id: string, amount: number) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useUserData();

  const { data, loading, refetch } = useQuery(GET_GOALS, {
    variables: { user_id: user?.id },
    skip: !user,
  });

  const [addGoalMutation] = useMutation(ADD_GOAL, {
    onCompleted: () => refetch(),
  });

  const [updateGoalMutation] = useMutation(UPDATE_GOAL_CONTRIBUTION, {
    onCompleted: () => refetch(),
  });

  const [deleteGoalMutation] = useMutation(DELETE_GOAL, {
    onCompleted: () => refetch(),
  });

  const goals = useMemo(() => {
    if (!data?.financial_goals) return [];
    return data.financial_goals.map(
      (g: {
        id: string;
        name: string;
        target_amount: string;
        current_amount: string;
        deadline: string;
        category: string;
        color: string;
        icon: string;
      }) => ({
        ...g,
        targetAmount: parseFloat(g.target_amount),
        currentAmount: parseFloat(g.current_amount),
        deadline: g.deadline ? new Date(g.deadline) : null,
      }),
    );
  }, [data]);

  const addGoal = async (goal: Omit<FinancialGoal, "id" | "currentAmount">) => {
    if (!user) return;
    await addGoalMutation({
      variables: {
        name: goal.name,
        target_amount: goal.targetAmount,
        deadline: goal.deadline?.toISOString(),
        category: goal.category,
        color: goal.color,
        icon: goal.icon,
        user_id: user.id,
      },
    });
  };

  const contributeToGoal = async (id: string, amount: number) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;

    await updateGoalMutation({
      variables: {
        id,
        current_amount: goal.currentAmount + amount,
      },
    });
  };

  const deleteGoal = async (id: string) => {
    await deleteGoalMutation({
      variables: { id },
    });
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        loading,
        addGoal,
        contributeToGoal,
        deleteGoal,
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
