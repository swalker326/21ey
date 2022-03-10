import { Amplify, API, withSSRContext } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  DeleteGoalInput,
  GetGoalQuery,
  Goal,
  GoalStatus,
  ListGoalsQuery,
  UpdateGoalInput,
} from "../../API";
import awsExports from "../../aws-exports";

import { getGoal, listGoals } from "../../graphql/queries";
import { GetStaticProps, GetStaticPaths } from "next";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  handleAbandonGoalAction,
  handleDeleteGoalAction,
} from "../../actions/goals";

Amplify.configure({ ...awsExports, ssr: true });

export default function GoalPage({ goal }: { goal: Goal }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }

  const handleDelete = () => {
    handleDeleteGoalAction(goal);
  };
  const handleAbandonGoal = () => {
    const goalInput: UpdateGoalInput = {
      id: goal.id,
      _version: goal._version,
      status: GoalStatus.FAILED,
    };
    handleAbandonGoalAction(goalInput);
  };

  return (
    <div>
      <Head>
        <title>21ey - {goal.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{goal.name}</h1>
        <h3>{goal.status}</h3>
        <button onClick={handleAbandonGoal}>Abandon</button>
      </main>

      <footer>
        <button onClick={handleDelete}>💥 Delete goal</button>
      </footer>
    </div>
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
