import React, { Component } from 'react';
import ColumnList from './ColumnList';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.updateTask = this.updateTask.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const items = nextProps.data.allTasks
    if (items) {
      this.setState({
        items
      })
    }
  }

  addTask(e) {
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    this.props.createTask({
      variables: {
        title: value,
        status: 'To Do'
      }, refetchQueries: [
        { query: Query }
      ]
    })
    .then(res => console.log(res))
    .catch(err => alert(err))
  }

  updateTask(target, task) {
    this.props.updateTask({
      variables: {
        id: task.id,
        status: target.checked ? 'Done' : 'To Do'
      }, refetchQueries: [
        { query: Query }
      ]
    })
    .then(res => console.log(res))
    .catch(err => alert(err))
  }

  render() {
    const { items } = this.state;
    const columns = [
      { title: 'To Do', items },
      { title: 'Done', items }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>To Do List</h2>
        </div>
        <div className="App-container">
          <div className="app-lists">
            {columns.map(item => (
              <ColumnList
                key={item.title}
                title={item.title}
                items={item.items}
                updateTask={this.updateTask}
                addTask={this.addTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const Query = gql`
  query allTasks {
    allTasks {
      id,
      status,
      title
    }
  }
`

const Mutation = gql`
  mutation updateTask($id: ID!, $status: String) {
    updateTask(id: $id, status: $status) {
      id,
      status,
      title
    }
  }
`

const CreateTask = gql`
  mutation createTask($title: String!, $status: String) {
    createTask(title: $title, status: $status) {
      id,
      status,
      title
    }
  }
`

export default compose(
  graphql(Query),
  graphql(Mutation, { name: 'updateTask' }),
  graphql(CreateTask, { name: 'createTask' })
)(App);
