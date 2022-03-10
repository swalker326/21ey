import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum GoalStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}



type GoalMetaData = {
  readOnlyFields: 'createdOn' | 'updatedOn';
}

export declare class Goal {
  readonly id: string;
  readonly name: string;
  readonly status: GoalStatus | keyof typeof GoalStatus;
  readonly type: string;
  readonly owner: string;
  readonly startDate: string;
  readonly daysCompleted?: (string | null)[];
  readonly createdOn?: string;
  readonly updatedOn?: string;
  constructor(init: ModelInit<Goal, GoalMetaData>);
  static copyOf(source: Goal, mutator: (draft: MutableModel<Goal, GoalMetaData>) => MutableModel<Goal, GoalMetaData> | void): Goal;
}