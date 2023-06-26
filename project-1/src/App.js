import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    nome: "Vini",
    counter:0,
  };
  
  handlePclick = () => {
    this.setState({nome:'Lúcia'});
  }

  handleAclick = (event) => {
    event.preventDefault();
    let {counter} = this.state;
    this.setState({counter: counter + 1});
  }

  render() {
    const {nome, counter} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePclick}>
            {nome} {counter}
          </p>
          <a
          onClick={this.handleAclick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;
