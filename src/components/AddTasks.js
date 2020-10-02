import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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
      <AddTaskForm
        title={this.state.title}
        description={this.state.description}
        handleAdd={this.handleAdd}
        handleChange={this.handleChange}
      />
    );
  }
}

function AddTaskForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mt-5">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleShow}
          block
        >タスクを作成</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>タスクを作成</Modal.Title>
        </Modal.Header>

        <form onSubmit={props.handleAdd}>
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
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleClose}
            >追加</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
            >キャンセル</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddTasks;
