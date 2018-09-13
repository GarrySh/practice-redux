import { createSelector } from 'reselect';

// BEGIN (write your solution here)
export const getTasks = state => state.tasks;
export const tasksSelector = createSelector(
  getTasks,
  tasks => Object.values(tasks),
);
// END
