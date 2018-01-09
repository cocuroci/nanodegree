import React, { Component } from 'react';
import ListContacts from './ListContacts';
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
      <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts} />
    );
  }
}

export default App;
