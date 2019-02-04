import React, { Component } from 'react';
import Header from '../Header';
import BackgroundVideo from '../BackgroundVideo';
import MovieList from '../MovieList';
import { createGlobalStyle } from 'styled-components';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <GlobalStyles />
        <Header />
        <BackgroundVideo />
        <MovieList />
      </div>
    );
  }
}

const GlobalStyles = createGlobalStyle`
    body {
        @import url('https://fonts.googleapis.com/css?family=Kanit|Roboto');
        font-family: 'Kanit', sans-serif;
    }
`;

export default App;