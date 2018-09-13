import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

// BEGIN (write your solution here)
const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: task };
  },
  [actions.removeTask](state, { payload: { id } }) {
    return _.omit(state, id);
  },
  [actions.updateTask](state, { payload: { task } }) {
    return { ...state, [task.id]: task };
  },
}, {});

export default combineReducers({
  tasks,
});
// END
