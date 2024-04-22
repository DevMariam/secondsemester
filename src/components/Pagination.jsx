import { MdArrowLeft, MdArrowRight } from "react-icons/md";

/* eslint-disable react/prop-types */
import React from "react";
import { allRepositories } from "../services";
import styled from "styled-components";

const Container = styled.div`
  .faint {
    opacity: 0.5;
    cursor: default;
  }

  button {
    background: transparent;
    color: #8a8aef;
  }
`;

const Pagination = ({ setAllRepos, setLoading, allRepos }) => {
  const [page, setPage] = React.useState(1);
  const [totalRepositories, setTotalRepositories] = React.useState(0);

  React.useEffect(() => {
    //
    const getAllRepositories = async () => {
      const response = await allRepositories(page);
      setLoading(true);
      setAllRepos(response.data);
      setLoading(false);
      const calculatedTotalPages = Math.ceil(response.data.length / 10); // Calculate total number of pages
      setTotalRepositories(calculatedTotalPages);
    };
    getAllRepositories();
  }, [page, setAllRepos, setLoading]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <Container className="md-gap flex ai-center jc-center">
      <div className={page === 1 ? "faint flex ai-center" : "flex ai-center"}>
        <MdArrowLeft color="#8a8aef" size={23} />
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={page === 1 ? "faint" : ""}
        >
          Previous Page
        </button>
      </div>
      <div className="flex ai-center">
        <button onClick={handleNextPage}>Next Page</button>
        <MdArrowRight color="#8a8aef" size={23} />
      </div>
    </Container>
  );
};

export default Pagination;
