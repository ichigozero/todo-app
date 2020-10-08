import React, {Component} from 'react';
import '../css/App.css';

import AddTasks from './AddTasks';
import ListTasks from './ListTasks';

const API_URI = '/todo/api/v1.0/tasks';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: null,
      formDisplay: false,
    };

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  addTask(task) {
    const tasks = this.state.tasks;
    const {title, description} = task;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description}),
    };

    fetch(API_URI, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const {task} = data;
          const updatedTasks = [...tasks, task];
          this.setState({
            tasks: updatedTasks,
          });
        }
      });
  }

  updateTask(task) {
    const tasks = this.state.tasks;
    const {taskId, title, description, done} = task;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, done}),
    };

    fetch(`${API_URI}/${taskId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const {task} = data;
          const updatedTasks = [...tasks];
          const tgtIndex = updatedTasks.findIndex(x => x.id === task.id);
          updatedTasks[tgtIndex] = task;

          this.setState({
            tasks: updatedTasks,
          });
        }
      });
  }

  deleteTask(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${API_URI}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const isNotId = (item) => item.id !== id;
          const updatedTasks = this.state.tasks.filter(isNotId);
          this.setState({tasks: updatedTasks});
        }
      });
  }

  componentDidMount() {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => {
        const {tasks} = data;
        this.setState({tasks});
      });
  }

  render() {
    if (!this.state.tasks) {
      return null;
    }

    return (
      <main role="main" className="container">
        <AddTasks
          formDisplay={this.state.formDisplay}
          addTask={this.addTask}
        />
        <ListTasks
          tasks={this.state.tasks}
          formDisplay={this.state.formDisplay}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
        />
      </main>
    );
  }
}

export default App;
