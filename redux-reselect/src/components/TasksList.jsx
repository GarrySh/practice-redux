import React from 'react';

export default class TasksList extends React.Component {
  removeTask = id => (e) => {
    e.preventDefault();
    this.props.removeTask({ id });
  }

  // BEGIN (write your solution here)
  toggleTaskState = id => (e) => {
    e.preventDefault();
    this.props.toggleTaskState({ id });
  }

  renderTasks() {
    return (
      <ul className="list-group">
        {this.props.tasks.map(({ id, state, text }) => (
          <li key={id} className="list-group-item d-flex justify-content-end">
            <button className="btn border-0 p-0 app-toggle-state mr-3" onClick={this.toggleTaskState(id)}>-</button>
            <div className="mr-auto">
              {(state === 'finished' ? <s>{text}</s> : text)}
            </div>
            <button className="btn border-0 p-0 app-remove-task" onClick={this.removeTask(id)}>x</button>
          </li>
        ))}
      </ul>
    );
  }
  // END

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        {this.renderTasks()}
      </div>
    );
  }
}
// END
