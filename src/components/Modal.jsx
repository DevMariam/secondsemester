import { CircularProgress } from "@chakra-ui/react";
/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { MdClose } from "react-icons/md";
import React from "react";
import { createRepository } from "../services";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: filter(10px);
  z-index: 1000;
`;

const ModalInner = styled.div`
  height: 400px;
  width: 500px;
  border-radius: 5px;
  background-color: #d7d4d4;
  padding: 20px;

  .close {
    background-color: transparent;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 7px;
`;
const Label = styled.div``;

const ModalButton = styled.button`
  width: 100%;
  margin-top: 25px;
  padding: 10px;
  background-color: #6666d9;
  border-radius: 5px;
  color: #fff;
  &:hover {
    background-color: #5757c9;
  }
`;

const Modal = ({ open, setOpen }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // you can also use this
  // const handleClick = () => {
  //   setOpen(false);
  // };

  const submitRepo = async () => {
    setIsLoading(true);
    const data = {
      name,
      description,
    };
    const response = await createRepository(data);
    console.log(response);
    setOpen(false);
    setIsLoading(false);
    setName("");
    setDescription("");
  };

  if (!open) {
    return;
  }

  return (
    <ModalContainer className="flex ai-center jc-center">
      <ModalInner>
        <div className="flex ai-center jc-between">
          <h2>Create new repo</h2>
          <button
            className="close"
            onClick={() => {
              setOpen(false);
            }}
          >
            <IoMdClose size="25" />
          </button>
        </div>
        {/* Name of repo */}
        <div className="flex flex-col xsm-gap">
          <div className="flex flex-col xsm-gap">
            <Label>Name of repo</Label>
            <ModalInput
              placeholder="Enter repository name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* Description of repo */}
          <div className="flex flex-col xsm-gap">
            <Label>Description</Label>
            <ModalInput
              placeholder="Enter repository description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <ModalButton onClick={submitRepo}>
          {isLoading ? (
            <CircularProgress size={23} isIndeterminate color="#47478e" />
          ) : (
            "Create Repository"
          )}
        </ModalButton>
      </ModalInner>
    </ModalContainer>
  );
};

export default Modal;
