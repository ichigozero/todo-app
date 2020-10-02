import React, { Component } from 'react';

class ListTasks extends Component {
  constructor() {
    super();

    this.state = {
      taskId: '',
      title: '',
      description: '',
    };

    this.editTask = this.editTask.bind(this);
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
    return (
      <div className="mt-4 card">
        <div className="card-header">未完了</div>
          <ul className="list-group list-group-flush">
            { this.props.tasks.map((item) =>
            <li key={item.id} className="list-group-item">
              {item.title}
              <div className="float-right">
                <button
                  type="button"
                  className="mr-3 btn btn-outline-primary"
                    data-toggle="modal"
                    data-target="#editTaskModal"
                  onClick={() => this.editTask(item.id)}
                >編集</button>
                <button
                  type="button"
                  className="mr-3 btn btn-outline-danger"
                  onClick={() => this.props.deleteTask(item.id)}
                >削除</button>
                <button
                  type="button"
                  className="mr-3 btn btn-outline-success"
                >完了する</button>
              </div>
            </li>
            )}
          </ul>
        <div
          className="modal fade"
          id="editTaskModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">タスクを編集</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleUpdate}>
                  <div className="form-group">
                    <label
                      for="taskTitle"
                      className="col-form-label"
                    >タイトル</label>
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
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
                      value={this.state.description}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </div>
                  <input
                    type="hidden"
                    name="taskId"
                    value={this.state.taskId}
                  />
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >適用</button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >キャンセル</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTasks
