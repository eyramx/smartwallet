import { gql } from "@apollo/client";

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
      id
      amount
      description
      date
      category {
        name
        icon
        color
        type
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: uuid!) {
    delete_transactions_by_pk(id: $id) {
      id
    }
  }
`;
