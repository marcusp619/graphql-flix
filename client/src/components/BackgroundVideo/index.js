import React from 'react';
import styled from 'styled-components';

const BackGroundVideo = (props) => {
  return (
    <BackgroundVideo>
      background video
    </BackgroundVideo>
  )
};

const BackgroundVideo = styled.div`
  position: absolute;
  top: -2px;
  left: 0;
  min-width: 100%;
  height: 90vh;
  width: auto;
  z-index: -100;
`;

export default BackGroundVideo;
