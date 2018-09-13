import React from 'react';

export default class NewTaskForm extends React.Component {
  addTask = (e) => {
    e.preventDefault();
    this.props.addTask({ text: this.props.newTaskText });
  }
  updateNewTaskText = e => this.props.updateNewTaskText({ text: e.target.value })

  render() {
    const { newTaskText } = this.props;

    return (
      <form className="form-inline" onSubmit={this.addTask}>
        <div className="form-group mx-sm-3">
          <input type="text" required value={newTaskText} onChange={this.updateNewTaskText} />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}
