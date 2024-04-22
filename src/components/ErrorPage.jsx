import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
  position: relative;
  top: 90px;

  color: white;

  a {
    color: inherit;
    font-weight: normal;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorPage = () => {
  return (
    <Container>
      <div className="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="error-status-text"></p>
        <p>
          Go to <Link to="/">Home Page</Link>
        </p>
      </div>
    </Container>
  );
};

export default ErrorPage;
