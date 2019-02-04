import React from 'react';
import styled from 'styled-components';

const MoiveCard = props => (
  < MovieCardContainer >
    <img src={`https://image.tmdb.org/t/p/w300/${props.poster_path}`} />
  </MovieCardContainer >
);

const MovieCardContainer = styled.div`
  width: 222.88px;
  height: 125.48px;
`;

export default MoiveCard;
