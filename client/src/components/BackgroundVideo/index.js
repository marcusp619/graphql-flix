import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const BackGroundVideo = (props) => {
  return (
    <div>
      background video
    </div>
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
