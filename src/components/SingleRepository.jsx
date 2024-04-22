import { Link, useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { singleRepository, updateRepository } from "../services";

import { CircularProgress } from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import { FaArrowLeft } from "react-icons/fa6";
import React from "react";
import styled from "styled-components";

const SingleContainer = styled.div`
  padding: 30px;
  position: relative;
  top: 90px;
  color: #e7e7e7;
  font-size: 13px;
  max-width: 1300px;
  margin: auto;
  .xsm-gap {
    &:hover {
      text-decoration: underline;
    }
  }

  a {
    cursor: pointer;
    color: #e7e7e7;
    text-decoration: none;
  }

  h2 {
    text-transform: capitalize;
    font-weight: normal;
  }

  .inner {
    margin-top: 20px;
  }

  .btn {
    background-color: transparent;
    &:hover {
      transform: scale(0.9);
    }
  }

  h3 {
    margin-top: 50px;
    margin-bottom: 20px;
    font-weight: normal;
  }

  .form {
    width: 400px;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 7px;
`;

const Label = styled.div``;

const Button = styled.button`
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

const SingleRepository = () => {
  const { id } = useParams();
  const [singleRepo, setSingleRepo] = React.useState({});

  const [showEdit, setShowEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  //Get all repos
  React.useEffect(() => {
    //
    const getSingleRepository = async () => {
      const response = await singleRepository(id);
      setSingleRepo(response.data);
      setLoading(false);
    };
    getSingleRepository();
  }, [id]);

  // function to update the repository
  const updateRepo = async () => {
    //
    setIsLoading(true);

    // data to submit
    const data = {
      name,
      description,
    };

    await updateRepository(singleRepo.name, data);
    // setOpen(false);
    setIsLoading(false);
    setShowEdit(false);
  };

  const finalName = name || singleRepo?.name;
  const finalDescription = description || singleRepo?.description;

  if (loading) {
    return (
      <SingleContainer className="flex ai-center jc-center margin">
        <CircularProgress value={80} isIndeterminate />;
      </SingleContainer>
    );
  }

  return (
    <SingleContainer>
      {/* Delete Modal */}
      <DeleteModal
        name={singleRepo?.name}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/*  */}
      <Link to="/" className="flex ai-center xsm-gap">
        <FaArrowLeft size="12" />
        <p>Go back</p>
      </Link>

      <div className="inner">
        <div className="flex ai-center md-gap">
          <div>
            <h2>{finalName}</h2>
          </div>
          <div className="flex md-gap ai-center">
            <button
              className="btn"
              onClick={() => {
                setShowEdit(true);
                setName(singleRepo.name);
                setDescription(singleRepo.description);
              }}
            >
              <MdEdit color="green" size="24" />
            </button>
            <button
              className="btn"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <MdDelete color="#d04343" size="23" />
            </button>
          </div>
        </div>
        <p>{finalDescription}</p>
      </div>

      {/*  */}
      {showEdit ? (
        <div>
          <h3>Edit Document</h3>
          <div className="flex flex-col sm-gap form">
            <div className="flex flex-col sm-gap">
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
            <div className="flex flex-col sm-gap">
              <Label>Description</Label>
              <ModalInput
                placeholder="Enter repository description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <Button onClick={updateRepo}>
              {isLoading ? (
                <CircularProgress size={23} isIndeterminate color="#47478e" />
              ) : (
                "Update Repository"
              )}
            </Button>
          </div>
        </div>
      ) : null}

      {/*  */}
    </SingleContainer>
  );
};

export default SingleRepository;
