import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const NavBar = () => {
  return (
    <div>
    <Container >
     <StyledLink to="/">201909103</StyledLink>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/analizar">Analizar</StyledLink>
      <StyledLink to="/tblsym">Reportes</StyledLink>
    </Container>
    </div>
  );
};

export default NavBar;
