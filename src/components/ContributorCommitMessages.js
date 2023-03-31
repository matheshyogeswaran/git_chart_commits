import React, { useEffect, useState } from 'react';

function ContributorCommitMessages({ username, repo }) {
  const [contributorMessages, setContributorMessages] = useState([]);
  const [error, setError] = useState(null);
  console.log(username);
  console.log(repo);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error(`Invalid data format: expected an array, got ${typeof data}`);
        }
        const contributors = Array.from(new Set(data.map(commit => commit.author.login)));
        const messagesByContributor = contributors.map(contributor => {
          const messages = data.filter(commit => commit.author.login === contributor)
                            .map(commit => {
                              const date = new Date(commit.commit.author.date).toLocaleString();
                              return {message: commit.commit.message, date: date};
                            });
          const name = data.find(commit => commit.author.login === contributor).commit.author.name;
          return { contributor, name, messages };
        });
        setContributorMessages(messagesByContributor);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [username, repo]);

  if (error) {
    return <div className="container mt-3">Error: {error}</div>;
  }

  return (
    <div className="container mt-3">
      {contributorMessages.map(contributor => (
        <div key={contributor.contributor} className="card mb-3">
          <div className="card-header">
            <h2 className="h6 card-title">Commit messages by {contributor.name} ({contributor.contributor}):</h2>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {contributor.messages.map(message => (
                <li key={message.message} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>{message.message}</div>
                  <div><small>{message.date}</small></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContributorCommitMessages;
