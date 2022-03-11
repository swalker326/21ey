/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGoalInput = {
  id?: string | null,
  name: string,
  status: GoalStatus,
  type: string,
  owner: string,
  startDate: string,
  daysCompleted?: Array< string | null > | null,
  _version?: number | null,
};

export enum GoalStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}


export type ModelGoalConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelGoalStatusInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  daysCompleted?: ModelStringInput | null,
  and?: Array< ModelGoalConditionInput | null > | null,
  or?: Array< ModelGoalConditionInput | null > | null,
  not?: ModelGoalConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelGoalStatusInput = {
  eq?: GoalStatus | null,
  ne?: GoalStatus | null,
};

export type Goal = {
  __typename: "Goal",
  id: string,
  name: string,
  status: GoalStatus,
  type: string,
  owner: string,
  startDate: string,
  daysCompleted?: Array< string | null > | null,
  createdOn: string,
  updatedOn: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateGoalInput = {
  id: string,
  name?: string | null,
  status?: GoalStatus | null,
  type?: string | null,
  owner?: string | null,
  startDate?: string | null,
  daysCompleted?: Array< string | null > | null,
  _version?: number | null,
};

export type DeleteGoalInput = {
  id: string,
  _version?: number | null,
};

export type ModelGoalFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelGoalStatusInput | null,
  type?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  daysCompleted?: ModelStringInput | null,
  and?: Array< ModelGoalFilterInput | null > | null,
  or?: Array< ModelGoalFilterInput | null > | null,
  not?: ModelGoalFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelGoalConnection = {
  __typename: "ModelGoalConnection",
  items:  Array<Goal | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateGoalMutationVariables = {
  input: CreateGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type CreateGoalMutation = {
  createGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateGoalMutationVariables = {
  input: UpdateGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type UpdateGoalMutation = {
  updateGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteGoalMutationVariables = {
  input: DeleteGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type DeleteGoalMutation = {
  deleteGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetGoalQueryVariables = {
  id: string,
};

export type GetGoalQuery = {
  getGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListGoalsQueryVariables = {
  filter?: ModelGoalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGoalsQuery = {
  listGoals?:  {
    __typename: "ModelGoalConnection",
    items:  Array< {
      __typename: "Goal",
      id: string,
      name: string,
      status: GoalStatus,
      type: string,
      owner: string,
      startDate: string,
      daysCompleted?: Array< string | null > | null,
      createdOn: string,
      updatedOn: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncGoalsQueryVariables = {
  filter?: ModelGoalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGoalsQuery = {
  syncGoals?:  {
    __typename: "ModelGoalConnection",
    items:  Array< {
      __typename: "Goal",
      id: string,
      name: string,
      status: GoalStatus,
      type: string,
      owner: string,
      startDate: string,
      daysCompleted?: Array< string | null > | null,
      createdOn: string,
      updatedOn: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GoalsByOwnerQueryVariables = {
  owner: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGoalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GoalsByOwnerQuery = {
  goalsByOwner?:  {
    __typename: "ModelGoalConnection",
    items:  Array< {
      __typename: "Goal",
      id: string,
      name: string,
      status: GoalStatus,
      type: string,
      owner: string,
      startDate: string,
      daysCompleted?: Array< string | null > | null,
      createdOn: string,
      updatedOn: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateGoalSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateGoalSubscription = {
  onCreateGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateGoalSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateGoalSubscription = {
  onUpdateGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteGoalSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteGoalSubscription = {
  onDeleteGoal?:  {
    __typename: "Goal",
    id: string,
    name: string,
    status: GoalStatus,
    type: string,
    owner: string,
    startDate: string,
    daysCompleted?: Array< string | null > | null,
    createdOn: string,
    updatedOn: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
