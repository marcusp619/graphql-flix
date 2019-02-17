import React from 'react';
import styled from 'styled-components';

const MoiveCard = props => (
  <MovieCardContainer posterPath={props.movie.poster_path}>
    <MovieDetailsContainer>
      <MovieTitle>{props.movie.title}</MovieTitle>
      <MovieGenres>{props.movie.genres}</MovieGenres>
    </MovieDetailsContainer>
  </MovieCardContainer>
);

const MovieDetailsContainer = styled.div`
  opacity: 0;
  width: 300px;
`;

const MovieCardContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 300px;
  height: 140.45px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.45s;
  color: white;
  background: url(https://image.tmdb.org/t/p/w300/${props =>
    props.posterPath}) no-repeat center center;
  background-size: cover;

  &:hover ${MovieDetailsContainer} {
    opacity: 1
    transition: all 0.45s;
  }

  &:hover {
    opacity: 0.7;
    transition: all 0.45s;
  }
`;
const MovieGenres = styled.h6`
  position: absolute;
  bottom: 10px;
  left: 5px;
  transition: 0.45s all;
`;

const MovieTitle = styled.h4`
  position: absolute;
  bottom: 25px;
  left: 5px;
  transition: 0.45s all;
`;

export default MoiveCard;
