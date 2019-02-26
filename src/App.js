import React, { Component } from 'react';
import './App.css';
import EmailForm from './EmailForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Email Demo</p>
          <EmailForm />
        </header>
      </div>
    );
  }
}

export default App;
