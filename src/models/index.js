// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const GoalStatus = {
  "ACTIVE": "ACTIVE",
  "COMPLETED": "COMPLETED",
  "FAILED": "FAILED"
};

const { Goal } = initSchema(schema);

export {
  Goal,
  GoalStatus
};