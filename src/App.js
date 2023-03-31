import "./App.css";
import { useState } from "react";
import ContributorCommitMessages from "./components/ContributorCommitMessages";
import ContributorCommitMessagesChart from "./components/ContributorCommitMessagesChart";

function App() {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // add code here to handle the form submission
    setShowResult(true);
  };
  console.log(showResult);

  return (
    <>
      <div className="App" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container mt-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="username" className="form-label">
                  GitHub Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your GitHub username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="repo" className="form-label">
                  Repository Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="repo"
                  name="repo"
                  placeholder="Enter the repository name"
                  value={repo}
                  onChange={(event) => setRepo(event.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
          <div className="row mt-5">
            <div className="col-md-6">
              {showResult && (
                <ContributorCommitMessages username={username} repo={repo} />
              )}
            </div>
            <div className="col-md-6">
              {showResult && (
                <ContributorCommitMessagesChart
                  username={username}
                  repo={repo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
