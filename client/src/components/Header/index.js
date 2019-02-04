import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import SearchIcon from './SearchIcon.svg';
import BellIcon from './BellIcon.svg';
import FaceIcon from './FaceIcon.svg';
import CaretDownIcon from './CaretDownIcon.svg';

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderLogo>FLIX</HeaderLogo>
      <Nav marginContent="250px">
        <Ul>
          <Li>
            <StyledLink to="/">Home</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">TV Shows</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">Movies</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">Recently Added</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">My List</StyledLink>
          </Li>
        </Ul>
      </Nav>
      <Nav>
        <Ul>
          <Li>
            <StyledLink to="/">
              <Icon src={SearchIcon} />
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">KIDS</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">DVD</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/">
              <Icon src={BellIcon} />
            </StyledLink>
          </Li>
          <Li>
            <StyledLink
              flex={'flex'}
              align={'center'}
              onMouseEnter={() => setOpen(true)}
              to="/">
              <Icon src={FaceIcon} />
              <Icon size={'10px'} src={CaretDownIcon} />
            </StyledLink>
            {isOpen && (
              <UlDropDown>
                <LiDropDown>
                  <StyledLink onMouseLeave={() => setOpen(false)} to="/">
                    Sign Out Of Flix
                  </StyledLink>
                </LiDropDown>
              </UlDropDown>
            )}
          </Li>
        </Ul>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0));
`;
const Icon = styled.img`
  width: ${props => props.size || '20px'};
`;
const Nav = styled.nav`
  margin-right: ${props => props.marginContent};
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
`;
const UlDropDown = styled.ul`
  transition: all 0.5s ease;
  margin-top: 0.5rem;
  position: absolute;
  right: 75px;
  display: block;
`;
const HeaderLogo = styled.h2`
  display: inline;
  border-top: 2px solid #b9090b;
  border-bottom: 2px solid #b9090b;
`;
const Li = styled.li`
  padding-right: 15px;
`;
const LiDropDown = styled.li`
  display: block;
  transition-duration: 0.5;
  &:hover {
    cursor: pointer;
  }
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    list-style: none;
    color: whtie;
    cursor: pointer;
    display: ${props => props.flex};
    align-items: ${props => props.align}
    &:hover {
        color: yellow;
        border-bottom: 2px solid  #B9090B;
        transition: all 0.2s;
    }

    &:visited {
        color: white;
    }
`;

export default Header;
