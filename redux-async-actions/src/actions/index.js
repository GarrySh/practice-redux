import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const toggleTaskState = createAction('TASK_STATE_TOGGLE');

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

// BEGIN (write your solution here)
export const addTaskRequest = createAction('TASK_ADD_REQUEST');
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');
export const addTaskFailure = createAction('TASK_ADD_FAILURE');

export const addTask = task => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await axios.post(routes.tasksUrl(), { task });
    dispatch(addTaskSuccess({ task: response.data }));
  } catch (e) {
    dispatch(addTaskFailure());
  }
};
// END

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
  }
};

export const removeTask = task => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskUrl(task.id);
    await axios.delete(url);
    dispatch(removeTaskSuccess({ task }));
  } catch (e) {
    dispatch(removeTaskFailure({ task }));
  }
};
