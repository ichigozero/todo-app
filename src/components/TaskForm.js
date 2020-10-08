import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function TaskForm(props) {
  const [show, setShow] = useState(props.formDisplay);

  useEffect(() => {
    setShow(props.formDisplay)
  }, [props.formDisplay])

  return (
    <>
      <Modal show={show} onHide={props.toggleForm}>
        <Modal.Header>
          {!props.taskId ? (
            <Modal.Title>タスクを作成</Modal.Title>
          ) : (
            <Modal.Title>タスクを編集</Modal.Title>
          )}
        </Modal.Header>

        <form onSubmit={props.handleSubmit}>
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
          {props.taskId ? (
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

export default TaskForm
