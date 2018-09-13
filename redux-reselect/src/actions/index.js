import _ from 'lodash';
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD', task =>
  ({ task: { ...task, state: 'active', id: _.uniqueId() } }));
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const removeTask = createAction('TASK_REMOVE');
// BEGIN (write your solution here)
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');
// END
