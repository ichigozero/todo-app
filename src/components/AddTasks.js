import React, { Component } from 'react';


class AddTasks extends Component {
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
                <form onSubmit={this.props.handleSubmit}>
                  <div className="form-group">
                    <label
                      for="taskTitle"
                      className="col-form-label"
                    >タイトル</label>
                    <input
                      type="text"
                      name="title"
                      value={this.props.title}
                      onChange={this.props.handleChange}
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
                      value={this.props.description}
                      onChange={this.props.handleChange}
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
