import React, { Fragment } from "react";
import { Query } from "react-apollo";
import MovieCard from "../MovieCard";
import gql from "graphql-tag";
import styled from "styled-components";

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
            <Fragment>
              {data.movies &&
                data.movies &&
                data.movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </Fragment>
          </MovieCardsContainer>
        );
      }}
    </Query>
  );
}

const MovieCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  overflow: scroll;
  width: 100%;
  margin-top: 20px;
`;
