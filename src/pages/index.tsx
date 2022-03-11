import { Amplify, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../aws-exports";
import { listGoals } from "../graphql/queries";
import { ListGoalsQuery, GoalStatus, Goal } from "../API";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUserAmplify } from "@aws-amplify/ui";
import dayjs from "dayjs";
import { handleCreateGoalAction } from "../actions/goals";
import { Layout } from "../components/shared/Layout";
import { RegisterFlow } from "../components/register/RegisterFlow";

Amplify.configure({
  ...awsExports,
  ssr: true,
});

export default function Home({ goals = [] }: { goals: Goal[] }) {
  const router = useRouter();

  const handleCreateGoal = async (event) => {
    event.preventDefault();
    const user: CognitoUserAmplify = await Auth.currentAuthenticatedUser();
    const form = new FormData(event.target);

    const createInput = {
      name: form.get("name").toString(),
      type: "goal",
      owner: user?.username,
      status: GoalStatus.ACTIVE,
      startDate: dayjs().format("YYYY-MM-DD"),
    };
    const request = await handleCreateGoalAction(createInput);
    if (request.id) {
      router.push(`/goal/${request.id}`);
    }
  };

  return (
    <Layout>
      <Head>
        <title>21ey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <code>{goals.length} Goals</code>
        </p>
        <RegisterFlow>
          <div>
            <h3>New Goal</h3>
            <form onSubmit={handleCreateGoal}>
              <fieldset>
                <legend>Title</legend>
                <input name="name" />
              </fieldset>
              <button>Create Goal</button>
            </form>
          </div>
        </RegisterFlow>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({ query: listGoals })) as {
    data: ListGoalsQuery;
  };

  return {
    props: {
      goals: response.data.listGoals.items.filter((goal) => !goal._deleted),
    },
  };
};
