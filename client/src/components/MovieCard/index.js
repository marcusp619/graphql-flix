import React from "react";
import styled from "styled-components";

const MoiveCard = props => (
  <MovieCardContainer>
    <MovieImg
      src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`}
    />
    <MovieTitle>{props.movie.title}</MovieTitle>
    <MovieGenres>{props.movie.genres}</MovieGenres>
  </MovieCardContainer>
);

const MovieCardContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 250px;
  tileheight: 140.45px;
  margin-right: 10px;
  cursor: pointer;
  trasition: 450ms all;
  transform-origin: center left;
  color: white;
`;

const MovieImg = styled.img`
  width: 250px;
  height: 140.45px;
  object-fit: cover;
`;

const MovieGenres = styled.h5`
  position: absolute;
  bottom: 10px;
  left: 5px;
`

const MovieTitle = styled.h4`
  position: absolute;
  bottom: 25px;
  left: 5px;
`;



export default MoiveCard;
