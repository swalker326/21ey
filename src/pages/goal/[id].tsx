import { useEffect, useState } from "react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  DeleteGoalMutationVariables,
  GetGoalQuery,
  Goal,
  GoalStatus,
  ListGoalsQuery,
  OnUpdateGoalSubscription,
  UpdateGoalInput,
} from "../../API";
import awsExports from "../../aws-exports";
import { getGoal, listGoals } from "../../graphql/queries";
import { GetStaticProps, GetStaticPaths } from "next";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  handleUpdateGoalAction,
  handleDeleteGoalAction,
} from "../../actions/goals";
import { Layout } from "../../components/shared/Layout";
import { onUpdateGoal } from "../../graphql/subscriptions";

Amplify.configure({ ...awsExports, ssr: true });

type SubscriptionValue = {
  value: {
    data: OnUpdateGoalSubscription;
  };
};

export default function GoalPage({ goal }: { goal: Goal }) {
  const router = useRouter();
  const [currentGoal, setCurrentGoal] = useState<Goal>(goal);

  useEffect(() => {
    let subscription;
    const initSubscription = async () => {
      const user = await Auth.currentAuthenticatedUser();
      subscription = API.graphql({
        query: onUpdateGoal,
        variables: { owner: user.username },
      }).subscribe({
        next: ({ value }: SubscriptionValue) =>
          setCurrentGoal(value.data.onUpdateGoal),
        error: ({ error }) => console.warn(error.errors[0]),
      });
    };
    initSubscription();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }

  const handleDelete = () => {
    const deleteGoalVariables: DeleteGoalMutationVariables = {
      input: {
        id: currentGoal.id,
        _version: currentGoal._version,
      },
    };
    handleDeleteGoalAction(deleteGoalVariables);
    router.push("/");
  };
  const handleAbandonGoal = () => {
    const goalInput: UpdateGoalInput = {
      id: currentGoal.id,
      _version: currentGoal._version,
      status: GoalStatus.FAILED,
    };
    handleUpdateGoalAction(goalInput);
  };

  return (
    <Layout>
      <Head>
        <title>21ey - {currentGoal.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{currentGoal.name}</h1>
        <h3>{currentGoal.status}</h3>
        <button onClick={handleAbandonGoal}>Abandon</button>
      </main>

      <footer>
        <button onClick={handleDelete}>💥 Delete goal</button>
      </footer>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const goalsQuery = (await SSR.API.graphql({
    query: listGoals,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as { data: ListGoalsQuery; errors: any[] };
  console.log("GQ: ", goalsQuery.data.listGoals.items);

  const paths = goalsQuery.data.listGoals.items.map((goal: Goal) => ({
    params: { id: goal.id },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({
    query: getGoal,
    variables: {
      id: params.id,
    },
  })) as { data: GetGoalQuery };

  return {
    props: {
      goal: response.data.getGoal,
    },
  };
};
