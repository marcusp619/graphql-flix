import React from 'react';
import Header from '../Header';
import BackgroundVideo from '../BackgroundVideo';
import MovieList from '../MovieList';
import styled, { createGlobalStyle } from 'styled-components';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <BackgroundVideo />
      <TrendingTitle>Trending Now</TrendingTitle>
      <MovieList />
    </div>
  );
};

const GlobalStyles = createGlobalStyle`
    body {
        @import url('https://fonts.googleapis.com/css?family=Kanit|Roboto');
        font-family: 'Kanit', sans-serif;
    }
`;

const TrendingTitle = styled.h1`
  color: white;
  padding: 0 1rem;
  text-align: left;
`;

export default App;
