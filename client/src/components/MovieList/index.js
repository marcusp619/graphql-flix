import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import MovieCard from '../MovieCard';
import gql from 'graphql-tag';
import styled from 'styled-components';

const GET_MOVIES = gql`
  query AllMovies {
    movies {
      title
      poster_path
      genres
    }
  }
`;

export default function MovieList() {
  return (
    <Query query={GET_MOVIES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <p>ERROR</p>;

        return (
          <MovieCardsContainer>
            <MovieData>
              {data.movies &&
                data.movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieData>
          </MovieCardsContainer>
        );
      }}
    </Query>
  );
}

const MovieCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  overflow: scroll;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 60px;
  transition: 0.45s transform;

  &:hover {
    transform: translate3d((250px * (1.5 -1) / 2));
  }
`;

const MovieData = styled(Fragment)`
  padding-bottom: 20px;
  white-space: nowrap;
`;
