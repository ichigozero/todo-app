import React, { Component, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class ListTasks extends Component {
  constructor() {
    super();

    this.state = {
      taskId: '',
      title: '',
      description: '',
      formDisplay: false,
    };

    this.editTask = this.editTask.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  editTask(id) {
    const isId = (item) => item.id === id;
    const task = this.props.tasks.filter(isId)[0];

    this.setState({
      taskId: task.id,
      title: task.title,
      description: task.description,
      formDisplay: true,
    });
  }

  updateTaskStatus(id) {
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

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleUpdate(event) {
    event.preventDefault();

    const task = {
      taskId: this.state.taskId,
      title: this.state.title,
      description: this.state.description,
    };

    this.props.updateTask(task);
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
        <EditTaskForm
          formDisplay={formDisplay}
          taskId={taskId}
          title={title}
          description={description}
          toggleForm={this.toggleForm}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
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

function EditTaskForm(props) {
  const [show, setShow] = useState(props.formDisplay);

  useEffect(() => {
    setShow(props.formDisplay)
  }, [props.formDisplay])

  return (
    <>
      <Modal show={show} onHide={props.toggleForm}>
        <Modal.Header>
          <Modal.Title>タスクを作成</Modal.Title>
        </Modal.Header>

        <form onSubmit={props.handleUpdate}>
          <Modal.Body>
            <div className="form-group">
              <label
                for="taskTitle"
                className="col-form-label"
              >タイトル</label>
              <input
                type="text"
                name="title"
                value={props.title}
                onChange={props.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label
                for="taskDescription"
                className="col-form-label"
              >詳細</label>
              <textarea
                type="text"
                name="description"
                value={props.description}
                onChange={props.handleChange}
                className="form-control"
              />
            </div>
          </Modal.Body>
          {props.taskId !== '' ? (
            <input
              type="hidden"
              name="taskId"
              value={props.taskId}
            />
          ) : (
            null
          )}
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={props.toggleForm}
            >適用</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={props.toggleForm}
            >キャンセル</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ListTasks
