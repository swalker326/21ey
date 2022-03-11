import { Amplify, withSSRContext, Auth } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  CreateGoalInput,
  DeleteGoalMutationVariables,
  Goal,
  GoalsByOwnerQuery,
  GoalStatus,
  UpdateGoalInput,
} from "../API";
import awsExports from "../aws-exports";

import { goalsByOwner } from "../graphql/queries";
import { GetServerSideProps } from "next";
import {
  handleUpdateGoalAction,
  handleDeleteGoalAction,
  handleCreateGoalAction,
} from "../actions/goals";
import { Layout } from "../components/shared/Layout";
import { CognitoUserAmplify } from "@aws-amplify/ui";
import Link from "next/link";
import dayjs from "dayjs";

Amplify.configure({ ...awsExports, ssr: true });

export default function OwnerPage({ goals }: { goals: Goal[] }) {
  const router = useRouter();

  // const handleAbandonGoal = (goal) => {
  //   const goalInput: UpdateGoalInput = {
  //     id: goal.id,
  //     _version: goal._version,
  //     status: GoalStatus.FAILED,
  //   };
  //   handleUpdateGoalAction(goalInput);
  // };

  const handleDelete = (goal: Goal) => {
    const deleteGoalVariables: DeleteGoalMutationVariables = {
      input: {
        id: goal.id,
        _version: goal._version,
      },
    };
    handleDeleteGoalAction(deleteGoalVariables);
    router.push("/");
  };

  const handleDuplicateGoal = async (goal: Goal) => {
    const user: CognitoUserAmplify = await Auth.currentAuthenticatedUser();
    const duplicateGoalInput: CreateGoalInput = {
      name: goal.name,
      type: "goal",
      owner: user?.username,
      status: GoalStatus.ACTIVE,
      startDate: dayjs().format("YYYY-MM-DD"),
    };
    const request = await handleCreateGoalAction(duplicateGoalInput);
    if (request.id) {
      router.push(`/goal/${request.id}`);
    }
  };

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>21ey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Profile</h2>
        <div>
          {goals.map((goal) =>
            goal.status === GoalStatus.ACTIVE ? (
              <div key={goal.id}>
                <Link href={`/goal/${goal.id}`}>
                  <h3>{goal.name}</h3>
                </Link>
              </div>
            ) : (
              <div key={goal.id}>
                <Link href={`/goal/${goal.id}`}>
                  <h3>{goal.name}</h3>
                </Link>
                <div>
                  <div>{goal.startDate}</div>
                  <div>{goal.status}</div>
                </div>
                <button onClick={() => handleDuplicateGoal(goal)}>
                  Restart
                </button>
                <button onClick={() => handleDelete(goal)}>Delete</button>
              </div>
            ),
          )}
        </div>
      </main>

      <footer></footer>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API } = withSSRContext(context);

  try {
    const user = await API.Auth.currentAuthenticatedUser()
    if (!user) return
    const response = (await API.graphql({
      query: goalsByOwner,
      variables: {
        owner: user.username,
      },
    })) as { data: GoalsByOwnerQuery };
    return {
      props: {
        goals: response.data.goalsByOwner.items || [],
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      goals: [],
    },
  };
};
