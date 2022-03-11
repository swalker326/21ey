import { CreateGoalInput, CreateGoalMutation, DeleteGoalMutationVariables, GetGoalQuery, GetGoalQueryVariables, Goal, GoalsByOwnerQuery, GoalsByOwnerQueryVariables, OnUpdateGoalSubscription, UpdateGoalInput, UpdateGoalMutation } from "../API";
import { createGoal, deleteGoal, updateGoal } from "../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, Auth } from "aws-amplify";
import { getGoal, goalsByOwner } from "../graphql/queries";
import { onCreateGoal, onDeleteGoal, onUpdateGoal } from "../graphql/subscriptions";

export async function handleFetchOwnerGoalsAction(variables: GoalsByOwnerQueryVariables): Promise<Array<Goal | undefined>> {
  const request = (await API.graphql({ query: goalsByOwner, authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS, variables })) as { data: GoalsByOwnerQuery; errors: any[] };
  return request.data.goalsByOwner.items;
}
export async function handleFetchGoalAction(variables: GetGoalQueryVariables): Promise<Goal> {
  const request = (await API.graphql(
    {
      query: getGoal,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      variables
    })) as { data: GetGoalQuery }
  return request.data.getGoal
}
export async function handleCreateGoalAction(createGoalInput: CreateGoalInput): Promise<Goal> {
  try {
    const request = (await API.graphql({
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      query: createGoal,
      variables: {
        input: createGoalInput,
      },
    })) as { data: CreateGoalMutation; errors: any[] };
    return request.data.createGoal;
  } catch ({ errors }) {
    const errorMessage = "Error Creating Goal:" + errors[0].messages;
    console.error(...errors);
    throw new Error(errorMessage);
  }
}

export async function handleUpdateGoalAction(goalUpdateInput: UpdateGoalInput): Promise<Goal> {
  try {
    const newGoal = await API.graphql({
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      query: updateGoal,
      variables: {
        input: goalUpdateInput
      }
    }) as { data: UpdateGoalMutation }
    return newGoal.data.updateGoal;
  } catch ({ errors }) {
    const errorMessage = "Error Creating Goal:" + errors[0].messages;
    console.error(...errors);
    throw new Error(errorMessage);
  }
}

export async function handleDeleteGoalAction(deleteGoalVariables: DeleteGoalMutationVariables): Promise<void> {
  try {
    const deletedGoal = await API.graphql({
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      query: deleteGoal,
      variables: deleteGoalVariables,
    });
  } catch ({ errors }) {
    const errorMessage = "Error Creating Goal:" + errors[0].messages;
    console.error(...errors);
    throw new Error(errorMessage);
  }
}
type SubscriptionType = "onCreate" | "onUpdate" | "onDelete";
type InitSubscriptionProps = {
  subscriptionType: SubscriptionType;
  action?: (value: any) => void;
}
type SubscriptionValue = {
  value: {
    data: Goal;
  };
};
export async function initSubscription({ subscriptionType, action }: InitSubscriptionProps) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const options = {
      onCreate: onCreateGoal,
      onUpdate: onUpdateGoal,
      onDelete: onDeleteGoal
    }
    let result: Goal;
    const subscription = API.graphql({ query: options[subscriptionType], variables: { owner: user.username } }).subscribe({
      next: ({ value }: SubscriptionValue) => {
        result = value.data;
        action ?? action(value);
      },
      error: ({ error }) => console.warn(error)
    })
    return { subscription: subscription, result }
  } catch (error) {
    console.error(error)
  }
}