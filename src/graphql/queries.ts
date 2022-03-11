/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
      id
      name
      status
      type
      owner
      startDate
      daysCompleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        type
        owner
        startDate
        daysCompleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGoals = /* GraphQL */ `
  query SyncGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGoals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        status
        type
        owner
        startDate
        daysCompleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const goalsByOwner = /* GraphQL */ `
  query GoalsByOwner(
    $owner: String!
    $sortDirection: ModelSortDirection
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goalsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        type
        owner
        startDate
        daysCompleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
