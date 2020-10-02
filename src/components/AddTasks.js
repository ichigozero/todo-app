import React, { Component } from 'react';


class AddTasks extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleAdd(event) {
    event.preventDefault();

    const task = {
      title: this.state.title,
      description: this.state.description,
    };

    this.props.addTask(task);
  }

  render() {
    return (
      <div className="mt-5">
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          data-toggle="modal"
          data-target="#addTaskModal"
        >タスクを作成</button>
        <div
          className="modal fade"
          id="addTaskModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">タスクを作成</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleAdd}>
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
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >追加</button>
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

export default AddTasks;
