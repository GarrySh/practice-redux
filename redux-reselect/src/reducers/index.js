import _ from 'lodash'; 
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: task };
  },
  [actions.removeTask](state, { payload: { id } }) {
    return _.omit(state, id);
  },
  // BEGIN (write your solution here)
  [actions.toggleTaskState](state, { payload: { id } }) {
    const task = state[id];
    const newState = task.state === 'active' ? 'finished' : 'active';
    const updatedTask = { ...task, state: newState };
    return { ...state, [task.id]: updatedTask };
  },
  // END
}, {});

const newTaskText = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload: { text } }) {
    return text;
  },
}, '');

export default combineReducers({
  tasks,
  newTaskText,
});
