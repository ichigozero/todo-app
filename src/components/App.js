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
      taskId: '',
      title: '',
      description: '',
    };

    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editTask(id) {
    const isId = (item) => item.id === id;
    const task = this.state.tasks.filter(isId)[0];

    this.setState({
      taskId: task.id,
      title: task.title,
      description: task.description,
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

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const {tasks, taskId, title, description} = this.state;

    if (!taskId) {
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
              title: '',
              description: '',
            });
          }
        });
    } else {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
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
              taskId: '',
              title: '',
              description: '',
            });
          }
        });
    }

    event.preventDefault();
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
    const {
      tasks,
      taskId,
      title,
      description
    } = this.state;

    if (!tasks) {
      return null;
    }

    return (
      <main role="main" className="container">
        <AddTasks
          title={title}
          description={description}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <ListTasks
          tasks={tasks}
          taskId={taskId}
          title={title}
          description={description}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </main>
    );
  }
}

export default App;
