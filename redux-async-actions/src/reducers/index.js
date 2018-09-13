import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

// BEGIN (write your solution here)
const taskCreatingState = handleActions({
  [actions.addTaskRequest]() {
    return 'requested';
  },
  [actions.addTaskFailure]() {
    return 'failed';
  },
  [actions.addTaskSuccess]() {
    return 'successed';
  },
}, 'none');
// END

const taskRemovingState = handleActions({
  [actions.removeTaskRequest]() {
    console.log('remove task requested');
    return 'requested';
  },
  [actions.removeTaskFailure]() {
    console.log('remove task failed');
    return 'failed';
  },
  [actions.removeTaskSuccess]() {
    console.log('remove task success');
    return 'successed';
  },
}, 'none');

const tasksFetchingState = handleActions({
  [actions.fetchTasksRequest]() {
    return 'requested';
  },
  [actions.fetchTasksFailure]() {
    return 'failed';
  },
  [actions.fetchTasksSuccess]() {
    return 'successed';
  },
}, 'none');

const tasks = handleActions({
  [actions.fetchTasksSuccess](state, { payload }) {
    return keyBy(payload.tasks, 'id');
  },
  [actions.addTaskSuccess](state, { payload: { task } }) {
    console.log('add task success handle', task);
    return { ...state, [task.id]: task };
  },
  [actions.removeTaskSuccess](state, { payload: { task } }) {
    console.log('remove task success handle', task);
    return omit(state, task.id);
  },
  [actions.toggleTaskState](state, { payload: { id } }) {
    const task = state[id];
    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return { ...state, [task.id]: updatedTask };
  },
}, {});

export default combineReducers({
  taskCreatingState,
  taskRemovingState,
  tasksFetchingState,
  tasks,
  form: formReducer,
});
