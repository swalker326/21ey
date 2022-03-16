import { SyntheticEvent } from "react";
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../aws-exports";
import { goalsByOwner } from "../graphql/queries";
import { GoalStatus, Goal, GoalsByOwnerQuery, CreateGoalInput } from "../API";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CognitoUserAmplify } from "@aws-amplify/ui";
import dayjs from "dayjs";
import { handleCreateGoalAction } from "../actions/goals";
import { Layout } from "../components/shared/Layout";
import { RegisterFlow } from "../components/register/RegisterFlow";
import styled, { useTheme } from "styled-components";

Amplify.configure({
  ...awsExports,
  ssr: true,
});

export default function Home({ goals = [] }: { goals: Goal[] }) {
  const router = useRouter();
  const theme = useTheme();

  const handleCreateGoal = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const user: CognitoUserAmplify = await Auth.currentAuthenticatedUser();
      const target = event.target as typeof event.target & {
        name: { value: string };
      };

      const createInput: CreateGoalInput = {
        name: target.name.value,
        type: "goal",
        owner: user.username || "local_owner",
        status: GoalStatus.ACTIVE,
        startDate: dayjs().format("YYYY-MM-DD"),
      };

      const request = await handleCreateGoalAction(createInput);

      if (request.id) {
        router.push(`/goal/${request.id}`);
      }
    } catch (error) {
      console.log("error adding todo: " + error);
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
        <div>active Goal Should live here</div>
        <NewStyledButton onClick={() => theme.handleColorModeChange()}>
          Click Me
        </NewStyledButton>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API } = withSSRContext(context);
  let goals;
  try {
    const user = await API.Auth.currentAuthenticatedUser();
    const response = (await API.graphql({
      query: goalsByOwner,
      variables: {
        owner: user.username,
      },
    })) as { data: GoalsByOwnerQuery };
    goals = response.data.goalsByOwner?.items;
  } catch (error) {
    console.log("Error getting user: ", error);
    goals = [];
  }

  return {
    props: {
      goals: goals,
    },
  };
};

const NewStyledButton = styled.button`
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.dark.text.primary : theme.light.text.primary};
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.dark.bg.primary : theme.light.bg.primary};
`;
