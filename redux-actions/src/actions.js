import { createAction } from 'redux-actions';

// BEGIN (write your solution here)
export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const updateTask = createAction('TASK_UPDATE');
// END
