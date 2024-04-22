/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

// .nav-container {

// }

const NavContainer = styled.div`
  padding: 30px;
  background-color: #444;
  position: fixed;
  height: 90px;
  inset: 0;

  z-index: 1000;
  h2 {
    color: #e7e7e7;
    font-size: 18px;
    font-weight: normal;
  }

  button {
    padding: 9px;
    background-color: transparent;
    border: 1px solid #aeaeae;
    color: #e7e7e7;
    border-radius: 6px;

    &:hover {
      background: #666666;
    }
  }
`;

const Navbar = ({ setOpen }) => {
  // you can also use this

  // const handleClick = () => {
  //   setOpen(true);
  // };

  return (
    <NavContainer className="flex jc-between ai-center">
      <h2>Dev Mariam</h2>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Repository
      </button>
    </NavContainer>
  );
};

export default Navbar;
