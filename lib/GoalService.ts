import { gql } from "@apollo/client";

export const GET_GOALS = gql`
  query GetGoals($user_id: uuid!) {
    financial_goals(
      where: { user_id: { _eq: $user_id } }
      order_by: { created_at: desc }
    ) {
      id
      name
      target_amount
      current_amount
      deadline
      category
      color
      icon
    }
  }
`;

export const ADD_GOAL = gql`
  mutation AddGoal(
    $name: String!
    $target_amount: numeric!
    $deadline: timestamptz
    $category: String
    $color: String
    $icon: String
    $user_id: uuid!
  ) {
    insert_financial_goals_one(
      object: {
        name: $name
        target_amount: $target_amount
        deadline: $deadline
        category: $category
        color: $color
        icon: $icon
        user_id: $user_id
      }
    ) {
      id
    }
  }
`;

export const UPDATE_GOAL_CONTRIBUTION = gql`
  mutation UpdateGoalContribution($id: uuid!, $current_amount: numeric!) {
    update_financial_goals_by_pk(
      pk_columns: { id: $id }
      _set: { current_amount: $current_amount }
    ) {
      id
      current_amount
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: uuid!) {
    delete_financial_goals_by_pk(id: $id) {
      id
    }
  }
`;
