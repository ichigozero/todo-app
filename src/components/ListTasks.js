import React, { Component } from 'react';

import TaskForm from './TaskForm';

class ListTasks extends Component {
  state = {
    taskId: '',
    title: '',
    description: '',
    formDisplay: false,
  };

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  editTask = (id) => {
    const isId = (item) => item.id === id;
    const task = this.props.tasks.filter(isId)[0];

    this.setState({
      taskId: task.id,
      title: task.title,
      description: task.description,
      formDisplay: true,
    });
  }

  updateTaskStatus = (id) => {
    const isId = (item) => item.id === id;
    const task = this.props.tasks.filter(isId)[0];

    const updatedTask = {
      taskId: task.id,
      title: task.title,
      description: task.description,
      done: !task.done,
    };

    this.props.updateTask(updatedTask);
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleUpdate = (event) => {
    event.preventDefault();

    const task = {
      taskId: this.state.taskId,
      title: this.state.title,
      description: this.state.description,
    };

    this.props.updateTask(task);

    this.setState({
      taskId: '',
      title: '',
      description: '',
    });
  }

  render() {
    const {
      formDisplay,
      taskId,
      title,
      description
    } = this.state;

    const undoneTasks = this.props.tasks.filter(task => task.done === false);
    const finishedTasks = this.props.tasks.filter(task => task.done === true);

    return (
      <>
        <div className="mt-4 card">
          <div className="card-header">
            未完了{' '}
            <span className="badge badge-danger">
              {undoneTasks.length}
            </span>
          </div>
            <ul className="list-group list-group-flush">
              { undoneTasks.map((task) =>
                <SingleTask
                  task={task}
                  markTaskText="完了する"
                  editTask={this.editTask}
                  deleteTask={this.props.deleteTask}
                  updateTaskStatus={this.updateTaskStatus}
                />
              )}
            </ul>
        </div>
        <div className="mt-4 card">
          <div className="card-header">
            完了{' '}
            <span className="badge badge-success">
              {finishedTasks.length}
            </span>
          </div>
            <ul className="list-group list-group-flush">
              { finishedTasks.map((task) =>
                <SingleTask
                  task={task}
                  markTaskText="戻す"
                  editTask={this.editTask}
                  deleteTask={this.props.deleteTask}
                  updateTaskStatus={this.updateTaskStatus}
                />
              )}
            </ul>
        </div>
        <TaskForm
          formDisplay={formDisplay}
          taskId={taskId}
          title={title}
          description={description}
          toggleForm={this.toggleForm}
          handleChange={this.handleChange}
          handleSubmit={this.handleUpdate}
        />
      </>
    );
  }
}

function SingleTask(props) {
  return (
    <li key={props.task.id} className="list-group-item">
      {props.task.title}
      <div className="float-right">
        <button
          type="button"
          className="mr-3 btn btn-outline-primary"
          onClick={() => props.editTask(props.task.id)}
        >編集</button>
        <button
          type="button"
          className="mr-3 btn btn-outline-danger"
          onClick={() => props.deleteTask(props.task.id)}
        >削除</button>
        <button
          type="button"
          className="mr-3 btn btn-outline-success"
          onClick={() => props.updateTaskStatus(props.task.id)}
        >{props.markTaskText}</button>
      </div>
    </li>
  );
}

export default ListTasks
