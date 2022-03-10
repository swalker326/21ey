import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../aws-exports";
import { createGoal } from "../graphql/mutations";
import { listGoals } from "../graphql/queries";
import {
  CreateGoalInput,
  CreateGoalMutation,
  ListGoalsQuery,
  GoalStatus,
  Goal,
} from "../API";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUserAmplify } from "@aws-amplify/ui";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure({
  ...awsExports,
  ssr: true,
});

export default function Home({ goals = [] }: { goals: Goal[] }) {
  const router = useRouter();

  async function handleCreateGoal(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    try {
      const user: CognitoUserAmplify = await Auth.currentAuthenticatedUser();

      const createInput: CreateGoalInput = {
        name: form.get("name").toString(),
        type: "goal",
        owner: user?.username,
        status: GoalStatus.ACTIVE,
        startDate: "2022-03-10",
        // description: form.get('content').toString(),
      };

      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createGoal,
        variables: {
          input: createInput,
        },
      })) as { data: CreateGoalMutation; errors: any[] };

      router.push(`/goal/${request.data.createGoal.id}`);
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  return (
    <div>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Amplify + Next.js</h1>

        <p>
          <code>{goals.length}</code>
          Goals
        </p>

        <div>
          {goals.map((goal) => (
            <a href={`/goal/${goal.id}`} key={goal.id}>
              <h3>{goal.name}</h3>
              <p>{goal.startDate}</p>
            </a>
          ))}

          <div>
            <h3>New Goal</h3>

            <Authenticator>
              {({ signOut, user }) => {
                return (
                  <form onSubmit={handleCreateGoal}>
                    <fieldset>
                      <legend>Title</legend>
                      <input name="name" />
                    </fieldset>

                    <button>Create Goal</button>
                    <button type="button" onClick={() => signOut}>
                      Sign out
                    </button>
                  </form>
                );
              }}
            </Authenticator>
          </div>
        </div>
      </main>
    </div>
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
