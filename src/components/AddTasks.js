import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import TaskForm from './TaskForm';

class AddTasks extends Component {
  state = {
    title: '',
    description: '',
    formDisplay: false,
  };

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleAdd = (event) => {
    event.preventDefault();

    const task = {
      title: this.state.title,
      description: this.state.description,
    };

    this.props.addTask(task);

    this.setState({
      title: '',
      description: '',
    });
  }

  render() {
    const {
      formDisplay,
      title,
      description
    } = this.state;

    return (
      <>
        <div className="mt-5">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={this.toggleForm}
            block
          >タスクを作成</Button>
        </div>
          <TaskForm
            formDisplay={formDisplay}
            title={title}
            description={description}
            toggleForm={this.toggleForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleAdd}
          />
      </>
    );
  }
}

export default AddTasks;
