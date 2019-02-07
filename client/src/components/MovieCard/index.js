import React from "react";
import styled from "styled-components";

const MoiveCard = props => (
  <MovieCardContainer>
    <MovieImg
      src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`}
    />
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
`;

const MovieImg = styled.img`
  width: 250px;
  height: 140.45px;
  object-fit: cover;
`;

export default MoiveCard;
