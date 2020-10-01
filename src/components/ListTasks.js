import React, { Component } from 'react';

class ListTasks extends Component {
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
                  onClick={() => this.props.editTask(item.id)}
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
                  <input
                    type="hidden"
                    name="taskId"
                    value={this.props.taskId}
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
