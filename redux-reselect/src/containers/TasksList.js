import { connect } from 'react-redux';
import Component from '../components/TasksList';
import * as actionCreators from '../actions';
import { tasksSelector } from '../selectors';

// BEGIN (write your solution here)
const Container = connect(
  (state) => {
    const props = {
      tasks: tasksSelector(state),
    };
    return props;
  },
  actionCreators,
)(Component);

export default Container;
// END
