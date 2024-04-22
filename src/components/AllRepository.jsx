import { CircularProgress } from "@chakra-ui/react";
import Pagination from "./Pagination";
import React from "react";
import { allRepositories } from "../services";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AllRepoContainer = styled.div`
  padding: 30px;
  position: relative;
  top: 80px;

  h2 {
    margin-bottom: 10px;
    font-weight: normal;
    color: #e7e7e7;
  }

  .inner {
  }

  .single-repo {
    width: 550px;
    margin-bottom: 20px;
    color: #e7e7e7;
  }

  .repo-name {
    font-size: 16px;
    text-transform: capitalize;
  }

  .view-repo {
    background: #8a8aef;
    padding: 9px;

    &:hover {
      background: #6464bb;
    }
  }

  p {
    font-size: 13px;
    text-transform: capitalize;
  }

  a {
    color: inherit;
    font-size: 12px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
  }
`;

const AllRepository = () => {
  // state of the repos
  const [allRepos, setAllRepos] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  //Get all repos
  React.useEffect(() => {
    //
    const getAllRepositories = async () => {
      const response = await allRepositories();
      setAllRepos(response.data);
      setLoading(false);
    };
    getAllRepositories();
  }, []);

  const handleClick = (id) => {
    navigate(`/single/${id}`);
  };

  if (loading) {
    return (
      <AllRepoContainer className="flex ai-center jc-center margin">
        <CircularProgress value={80} isIndeterminate />;
      </AllRepoContainer>
    );
  }

  return (
    <div>
      <AllRepoContainer>
        <h2 className="text-center">All Repositories</h2>
        <div className="inner flex ai-center jc-center flex-col">
          {allRepos.map((repo) => {
            return (
              <div
                key={repo.id}
                className="flex single-repo jc-between ai-center sm-gap"
              >
                <div>
                  <p className="repo-name">{repo.name}</p>
                  <div className="flex ai-center md-gap">
                    <p className="repo-description">{repo.visibility}</p>
                    <p>Stars: {repo.stargazers_count}</p>
                    <p>Forks: {repo.forks_count}</p>
                  </div>
                  <a href={repo.html_url} target="_blank">
                    View on GitHub
                  </a>
                </div>
                <button
                  className="view-repo"
                  onClick={() => handleClick(repo.id)}
                >
                  View Repo
                </button>
              </div>
            );
          })}
        </div>
        <Pagination
          setAllRepos={setAllRepos}
          setLoading={setLoading}
          allRepos={allRepos}
        />
      </AllRepoContainer>
    </div>
  );
};

export default AllRepository;
