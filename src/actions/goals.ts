import { CreateGoalInput, CreateGoalMutation, DeleteGoalInput, Goal, GoalStatus, UpdateGoalInput, UpdateGoalMutation } from "../API";
import { createGoal, deleteGoal, updateGoal } from "../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, Auth } from "aws-amplify";
import { CognitoUserAmplify } from "@aws-amplify/ui";

export async function handleCreateGoalAction(createGoalInput: CreateGoalInput): Promise<Goal> {
  try {
    const user: CognitoUserAmplify = await Auth.currentAuthenticatedUser();

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

export async function handleDeleteGoalAction(goal: Goal): Promise<void> {
  try {
    const deletedGoal = await API.graphql({
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      query: deleteGoal,
      variables: {
        input: { id: goal.id, _version: goal._version },
      },
    });
  } catch ({ errors }) {
    const errorMessage = "Error Creating Goal:" + errors[0].messages;
    console.error(...errors);
    throw new Error(errorMessage);
  }
}