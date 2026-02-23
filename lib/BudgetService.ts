import { gql } from "@apollo/client";

export const GET_BUDGETS = gql`
  query GetBudgets($user_id: uuid!) {
    budgets(where: { user_id: { _eq: $user_id } }) {
      id
      category_id
      amount
      period
      alert_threshold
      category {
        name
        icon
        color
      }
    }
  }
`;

export const ADD_BUDGET = gql`
  mutation AddBudget(
    $category_id: uuid!
    $amount: numeric!
    $period: String!
    $alert_threshold: numeric!
    $user_id: uuid!
  ) {
    insert_budgets_one(
      object: {
        category_id: $category_id
        amount: $amount
        period: $period
        alert_threshold: $alert_threshold
        user_id: $user_id
      }
    ) {
      id
    }
  }
`;

export const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: uuid!) {
    delete_budgets_by_pk(id: $id) {
      id
    }
  }
`;
