import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ContributorCommitMessagesChart({ username, repo }) {
  const [contributorMessages, setContributorMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
      const data = await response.json();
      const contributors = Array.from(new Set(data.map(commit => commit.author.login)));
      const messagesByContributor = contributors.map(contributor => {
        const messages = data.filter(commit => commit.author.login === contributor)
                            .map(commit => commit.commit.message);
        const name = data.find(commit => commit.author.login === contributor).commit.author.name;
        return { contributor, name, messages, commitCount: messages.length };
      });
      setContributorMessages(messagesByContributor);
    }

    fetchData();
  }, [username, repo]);

  const chartOptions = {
    chart: {
      id: 'commit-messages-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: contributorMessages.map(contributor => contributor.name),
    },
    yaxis: {
      title: {
        text: 'Commit Count',
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ['#4dc9f6'],
    },
  };

  const chartSeries = [
    {
      name: 'Commit Count',
      data: contributorMessages.map(contributor => contributor.commitCount),
    },
  ];

  return (
    <div className="container mt-3">
      <div className="card mb-3">
        <div className="card-header">
          <h2 className="h6 card-title">Contributors vs Commit Count</h2>
        </div>
        
        <div className="card-body">
          <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
        
        <div className="card-footer text-muted">
          Data fetched from{' '}
          <a href={`https://github.com/${username}/${repo}/commits`} target="_blank" rel="noopener noreferrer">
            GitHub API
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContributorCommitMessagesChart;
