import React, { Component } from 'react';
import ColumnLit from './ColumnList'
import logo from './logo.svg';
import * as TasksStatus from './TaskStatus'
import './App.css';

class App extends Component {
  state = {
    tasks: []
  }

  addTask(description) {
    this.setState(state => ({
      tasks: state.tasks.concat(
        {
          id: Date.now(),
          description,
          status: TasksStatus.TO_DO
        }
      )
    }))
  }

  updateTask(task) {
    this.setState(state => ({
      tasks: state.tasks.filter(t => t.id !== task.id).concat(task)
    }))
  }
  
  render() {
    const columns = [
      { title: "To Do", tasks: this.state.tasks.filter(task => task.status === TasksStatus.TO_DO), editable: true },
      { title: "Done", tasks: this.state.tasks.filter(task => task.status === TasksStatus.DONE), editable: false  }
    ]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Do List</h1>
        </header>
        <div className="App-container">
          <div className="app-lists">
            {columns.map((column, index) => (
              <ColumnLit
                key={index}
                columnTitle={column.title} 
                insert={column.editable}
                tasks={column.tasks}
                addTask={(description) => this.addTask(description)}
                updateTask={(task) => this.updateTask(task)}
                 />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
