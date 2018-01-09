import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts() {
    ContactAPI.getAll()
      .then((contacts) => this.setState({ contacts }))
      .catch((error) => alert(error))
  }

  removeContact = (contact) => {
      ContactAPI.remove(contact)
        .then((contact) => {
          this.setState({
            contacts: this.state.contacts.filter((c) => c.id !== contact.id)
          })
        })
        .catch((error) => alert(error))
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
           <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts} />
        )}/>
        <Route path='/create' component={CreateContact} />
      </div>
      
    );
  }
}

export default App;
