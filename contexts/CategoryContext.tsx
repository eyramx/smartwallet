import { GET_CATEGORIES } from "@/lib/TransactionService"; // Reuse existing query
import { useQuery } from "@apollo/client";
import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useMemo } from "react";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  getCategoryById: (id: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useUserData();

  const { data, loading } = useQuery(GET_CATEGORIES, {
    skip: !user,
  });

  const categories = useMemo(() => {
    return data?.categories || [];
  }, [data]);

  const getCategoryById = (id: string) => {
    return categories.find((c: Category) => c.id === id);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
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
