import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function TaskForm(
  {
    formDisplay,
    taskId,
    title,
    description,
    toggleForm,
    handleChange,
    handleSubmit,
  }
) {
  const [show, setShow] = useState(formDisplay);

  useEffect(() => {
    setShow(formDisplay)
  }, [formDisplay])

  return (
    <>
      <Modal show={show} onHide={toggleForm}>
        <Modal.Header>
          {!taskId ? (
            <Modal.Title>タスクを作成</Modal.Title>
          ) : (
            <Modal.Title>タスクを編集</Modal.Title>
          )}
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label
                for="taskTitle"
                className="col-form-label"
              >タイトル</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
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
                value={description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Modal.Body>
          {taskId ? (
            <input
              type="hidden"
              name="taskId"
              value={taskId}
            />
          ) : (
            null
          )}
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={toggleForm}
            >適用</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={toggleForm}
            >キャンセル</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default TaskForm
