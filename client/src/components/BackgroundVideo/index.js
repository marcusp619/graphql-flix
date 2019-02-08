import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const GET_A_MOVIE = gql`
  query GetAMovie {
    movie(movieId: 450465) {
      backdrop_path
      poster_path
      title
      adult
      overview
      genres {
        name
      }
      videos {
        id
        key
        name
        type
      }
    }
  }
`;

const BackGroundVideo = () => {
  return (
    <Query query={GET_A_MOVIE}>
      {({ data, loading, error }) => {
        console.log(data.movie)
        if (loading) return <div>Loading...</div>;
        if (error) return <p>ERROR</p>;
        console.log(data);
        return (
          <BackgroundVideoContainer>
            <Fragment>
              {data.movie && data.movie && (
                <BackgroundVideoImg
                  src={`https://image.tmdb.org/t/p/w500/${
                    data.movie.backdrop_path
                  }`}
                />
              )}
            </Fragment>
          </BackgroundVideoContainer>
        );
      }}
    </Query>
  );
};

const BackgroundVideoContainer = styled.div`
  position: relative;
  height: 665px;
  width: auto;
`;

const BackgroundVideoImg = styled.img`
  object-fit: cover;
  height: 665px;
  width: 100%;
  left: 0;
  right: 0;
`;

export default BackGroundVideo;
