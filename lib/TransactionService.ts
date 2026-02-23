import { gql } from "@apollo/client";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: Category;
}

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on categories {
    id
    name
    icon
    color
    type
  }
`;

export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionFields on transactions {
    id
    amount
    description
    date
    category {
      ...CategoryFields
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction(
    $amount: numeric!
    $description: String!
    $date: timestamptz!
    $category_id: uuid!
    $user_id: uuid!
  ) {
    insert_transactions_one(
      object: {
        amount: $amount
        description: $description
        date: $date
        category_id: $category_id
        user_id: $user_id
      }
    ) {
      id
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      icon
      color
      type
    }
  }
`;

export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    transactions(order_by: { date: desc }) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FRAGMENT}
`;
// Jonah: Standardized Transaction types.

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: uuid!) {
    delete_transactions_by_pk(id: $id) {
      id
    }
  }
`;
